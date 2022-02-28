from django.db import models
from product.models import Product


# Create your models here.
from user.models import CustomerUser


class Voucher(models.Model):
    code = models.CharField(max_length=25, null=False)
    rate = models.IntegerField(default=0)


class Cart(models.Model):

    transport_fee = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    voucher = models.ForeignKey(Voucher,  blank=True, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(CustomerUser, related_name='cart', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.get_username()

    def get_items_price(self):
        total = 0
        for cart_item in self.items.all():
            total += cart_item.get_price()
        return total

    def get_total_price(self):
        if self.voucher is not None:
            return self.get_items_price() - self.get_items_price()*self.voucher.rate/100
        return self.get_items_price() + self.transport_fee


class CartItem(models.Model):
    RED, PINK, BLACK, WHITE, BLUE = range(5)
    COLOR = [
        (RED, 'red'),
        (PINK, 'pink'),
        (BLACK, 'black'),
        (WHITE, 'white'),
        (BLUE, 'blue'),
    ]
    S, M, L, XL, XXL = range(5)
    SIZE = [
        (S, 's'),
        (M, 'm'),
        (L, 'l'),
        (XL, 'xl'),
        (XXL, 'xxl')
    ]
    color = models.PositiveSmallIntegerField(choices=COLOR, default=BLACK)
    size = models.PositiveSmallIntegerField(choices=SIZE, default=M)
    quantity = models.IntegerField(default=1)
    note = models.TextField(default='', blank=True)
    active = models.BooleanField(default=True)
    product = models.ForeignKey(Product,
                                on_delete=models.SET_NULL, null=True)
    cart = models.ForeignKey(Cart, related_name='items',
                             on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.product.name

    def get_price(self):
        if self.product.sale_price is not None:
            return self.product.sale_price * self.quantity
        else:
            return self.product.price * self.quantity
