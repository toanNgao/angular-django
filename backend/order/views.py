from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from .models import Order
from .serializers import OrderSerializer


# Create your views here.
class OrderViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
