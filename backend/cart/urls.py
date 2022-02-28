from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('cart-item', views.CartItemViewSet)
router.register('cart', views.CartViewSet)
router.register('voucher', views.VoucherViewSet)

urlpatterns = [
    path('', include(router.urls)),
]