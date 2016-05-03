from django.contrib import admin

from .models import Holding


@admin.register(Holding)
class HoldingsAdmin(admin.ModelAdmin):
    pass
