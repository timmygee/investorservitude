from django.contrib import admin

from .models import Holding


@admin.register(Holding)
class HoldingsAdmin(admin.ModelAdmin):
    list_display = (
        'security', 'holding', 'close_price_date', 'close_price',  'value',
        'issuer', 'subregister', 'reference', 'created', 'updated'
    )
    list_filter = ('security', 'issuer')
    exclude = ('created', 'updated')
