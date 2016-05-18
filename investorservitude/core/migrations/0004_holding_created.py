# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-18 11:42
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.db.models import F
from django.utils.timezone import utc

from core.models import Holding


def forwards(apps, schema_editor):
    """Copy the value of created_date field to created field"""

    Holding.objects.update(created=F('created_date'))


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_holding_created_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='holding',
            name='created',
            field=models.DateTimeField(
                auto_now_add=True,
                default=datetime.datetime(2016, 5, 18, 11, 42, 8, 950237, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.RunPython(forwards, migrations.RunPython.noop)
    ]
