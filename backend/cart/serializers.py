from rest_framework.serializers import ModelSerializer
from .models import CartItem, Cart, Voucher


class CartItemSerializer(ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'color', 'size', 'quantity', 'cart', 'product', 'get_price']


class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'transport_fee', 'user', 'get_items_price',
                  'get_total_price', 'voucher']


class VoucherSerializer(ModelSerializer):
    class Meta:
        model = Voucher
        fields = ['id', 'code', 'rate']
