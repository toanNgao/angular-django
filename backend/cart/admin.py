from django.contrib import admin
from .models import Cart, CartItem, Voucher

# Register your models here.
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Voucher)
