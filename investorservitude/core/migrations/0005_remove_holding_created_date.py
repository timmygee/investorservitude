# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-18 12:07
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_holding_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='holding',
            name='created_date',
        ),
    ]
