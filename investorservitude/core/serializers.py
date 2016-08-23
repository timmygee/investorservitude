from rest_framework import serializers
from .models import Holding


class HoldingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Holding
        fields = (
            'security', 'holding', 'close_price', 'close_price', 'created',
            'updated', 'value',
        )
