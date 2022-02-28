from django.urls.conf import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('banner', views.BannerViewSet)

urlpatterns = [
    path('', include(router.urls))
]
