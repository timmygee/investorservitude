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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('security', 'close_price_date')

    def __str__(self):
        return '{} - {}, {}, {}'.format(
            self.security, self.holding, self.close_price, self.close_price_date)
