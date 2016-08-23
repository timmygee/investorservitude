#from django.shortcuts import render

from rest_framework import viewsets

from .serializers import HoldingSerializer
from .models import Holding


class HoldingViewSet(viewsets.ModelViewSet):
    queryset = Holding.objects.order_by('-created')
    serializer_class = HoldingSerializer
    pagination_class = None
