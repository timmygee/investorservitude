import requests
import re

from decimal import Decimal
from datetime import datetime
from bs4 import BeautifulSoup

from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from django.db import models
from django.db.utils import IntegrityError

from core.models import Holding


heading_regex = re.compile(r'^\W*([\w ]+)\W*$')


def convert_heading(heading):
    """
    Convert the table heading string to the appropriate holding field name
    """
    if not heading:
        return None

    match = heading_regex.match(heading)

    if match:
        return '_'.join(match.groups()[0].lower().split())

    return None


def strip_unwanted(data_str):
    """
    Strip out any unwanted characters from the table data string
    """
    # Right now, this just requires stripping out commas
    return data_str.replace(',', '')


class PollCommandError(CommandError):
    pass


class Command(BaseCommand):
    help = 'Polls InvestorServe for your latest holding data'

    def handle(self, *args, **options):
        response = requests.get(settings.INVESTORSERVE_URL)

        if response.status_code != 200:
            raise PollCommandError(
                'Received HTTP error code {} when accessing {}'.format(
                    response.status_code, settings.INVESTORSERVE_URL))

        soup = BeautifulSoup(response.content, 'html.parser')

        post_data = {}

        for input_name in ('SessionId', 'SessionKey'):
            post_data[input_name] = soup.find('input', attrs={'name': input_name})['value']

        post_data.update({
            'Username': settings.INVESTORSERVE_USERNAME,
            'Password': settings.INVESTORSERVE_PASSWORD,
            'Command': 'login',
        })

        # print(post_data)
        response = requests.post(settings.INVESTORSERVE_URL, data=post_data)

        if response.status_code != 200:
            raise PollCommandError(
                'Received HTTP error code {} when posting to {}'.format(
                    response.status_code, settings.INVESTORSERVE_URL))

        soup = BeautifulSoup(response.content, 'html.parser')
        # soup = BeautifulSoup(
        #     open('../www.investorserve.com.au.html', 'r'), 'html.parser')

        data_table = soup.find('table', class_='datatable')

        headers = [convert_heading(th.string) for th in data_table.contents[0].children]

        for tr in data_table.contents[1:]:
            holding_data = {}

            for i, td in enumerate(tr.children):
                field_name = headers[i]

                if field_name:
                    for field in Holding._meta.fields:
                        if field.name == field_name:
                            break
                    else:
                        raise PollCommandError('Unexpected field {}'.format(field_name))

                    clean_data_str = strip_unwanted(td.string)

                    if isinstance(field, models.DecimalField):
                        holding_data[field_name] = Decimal(clean_data_str)
                    elif isinstance(field, models.DateField):
                        holding_data[field_name] = datetime.strptime(
                            clean_data_str, '%d/%m/%Y').date()
                    elif any([
                                isinstance(field, models.CharField),
                                isinstance(field, models.IntegerField)
                            ]):
                        holding_data[field_name] = clean_data_str

            # print(holding_data)
            try:
                holding, created = Holding.objects.update_or_create(
                    security=holding_data['security'],
                    close_price_date=holding_data['close_price_date'],
                    defaults=holding_data)

                if created:
                    self.stdout.write(
                        self.style.SUCCESS('Created holding entry {}'.format(holding)))
                else:
                    self.stdout.write(
                        self.style.SUCCESS('Updated holding entry {}'.format(holding)))
            except IntegrityError as e:
                self.stdout.write(self.style.ERROR(
                    'Integrity error when trying to create new holding entry. Most likely this is '
                    'because a holding entry for the security/date combination already exists. '
                    'Error recieved: {}'.format(e)))
