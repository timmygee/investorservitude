from rest_framework import serializers
from .models import Holding


class HoldingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holding
        fields = (
            'security', 'holding', 'close_price', 'close_price', 'created',
            'updated', 'value',
        )
