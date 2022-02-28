from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Product, Category
from .serializers import (
    ProductSerializer,
    CategorySerializer,
)
from .paginator import BassPagination


# Create your views here.
class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(methods=['get'], detail=True, url_path='products')
    def get_products(self, request, pk):
        products = Category.objects.get(pk=pk).products.filter(active=True)

        q = request.query_params.get('q')
        if q is not None:
            products = products.filter(name__icontains=q)

        return Response(ProductSerializer(products, many=True).data,
                        status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer
    pagination_class = BassPagination

    def get_queryset(self):
        products = Product.objects.filter(active=True)

        q = self.request.query_params.get('q')
        if q is not None:
            products = products.filter(name__icontains=q)

        cate_id = self.request.query_params.get('cate_id')
        if cate_id is not None:
            products = products.filter(category=cate_id)

        product_id = self.request.query_params.get('id')
        if product_id is not None:
            products = products.filter(id=product_id)

        return products
