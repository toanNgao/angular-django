from rest_framework.serializers import ModelSerializer
from .models import Product, Category


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'thumbnail']


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price',
                  'sale_price', 'created_at', 'category',
                  'brand', 'thumbnail', 'back_thumbnail',
                  'sold', 'inventory_quantity']
