from rest_framework.serializers import ModelSerializer
from .models import Order


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = ['first_name', 'last_name', 'phone_number',
                  'shipping_address', 'city', 'payments', 'customer_user', 'cart']