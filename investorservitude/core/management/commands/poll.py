import requests

from bs4 import BeautifulSoup

from django.core.management.base import BaseCommand, CommandError
from django.conf import settings

from core.models import Holding


class PollCommandError(CommandError):
    pass


class Command(BaseCommand):
    help = 'Polls InvestorServe for yoru latest holding data'

    def handle(self, *args, **options):
        response = requests.get(settings.INVESTORSERVE_URL)

        if response.status_code != 200:
            raise PollCommandError(
                'Received HTTP error code {} when accessing {}'.format(
                    response.status_code, settings.INVESTORSERVE_URL))

        soup = BeautifulSoup(response.content, 'html.parser')

        input_names = ['SessionId', 'SessionKey']

        post_data = {}

        for input_name in input_names:
            post_data[input_name] = soup.find('input', attrs={'name': input_name})['value']

        post_data.update({
            'Username': settings.INVESTORSERVE_USERNAME,
            'Password': settings.INVESTORSERVE_PASSWORD,
            'Command': 'login',
        })

        print(post_data)
        response = requests.post(settings.INVESTORSERVE_URL, data=post_data)

        import ipdb; ipdb.set_trace()
