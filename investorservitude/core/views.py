from django.contrib.auth.models import User

from rest_framework import viewsets, response

from .serializers import HoldingSerializer, UserSerializer
from .models import Holding


class HoldingViewSet(viewsets.ModelViewSet):
    queryset = Holding.objects.order_by('created')
    serializer_class = HoldingSerializer
    pagination_class = None


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        if pk == 'i':
            serialized = UserSerializer(request.user, context={'request': request})
            return response.Response(serialized.data)
        return super().retrieve(request, pk)
