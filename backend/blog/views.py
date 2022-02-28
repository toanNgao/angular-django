from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Blog
from .serializers import BlogSerializer


# Create your views here.
class BlogViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
