from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action

from .models import CartItem, Cart, Voucher
from .serializers import CartItemSerializer, CartSerializer, VoucherSerializer


# Create your views here.
class CartItemViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]


class CartViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView):
    queryset = Cart.objects.filter(active=True)
    serializer_class = CartSerializer

    def get_permissions(self):
        if self.action == 'get_queryset' or self.action == 'get_cart_item':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    def get_queryset(self):
        carts = Cart.objects.filter(active=True)
        user_id = self.request.query_params.get('user_id')

        if user_id is not None:
            carts = Cart.objects.filter(user=user_id, active=True)

        return carts

    @action(methods=['get'], detail=True, url_path='cart-item')
    def get_cart_item(self, request, pk):
        items = Cart.objects.get(pk=pk).items.filter(active=True)

        return Response(CartItemSerializer(items, many=True).data,
                        status=status.HTTP_200_OK)


class VoucherViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
