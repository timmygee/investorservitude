from django.db import models


class Holding(models.Model):
    issuer = models.CharField(max_length=255)
    subregister = models.CharField(max_length=255)
    reference = models.CharField(max_length=255)
    security = models.CharField(max_length=255)
    holding = models.PositiveIntegerField()
    close_price = models.DecimalField(decimal_places=4, max_digits=8)
    close_price_date = models.DateField()
    value = models.DecimalField(decimal_places=2, max_digits=10)
