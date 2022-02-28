from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Banner
from .serializers import BannerSerializer


# Create your views here.
class BannerViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer
    