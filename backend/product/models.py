from django.db import models
from user.models import CustomerUser


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(default='')
    thumbnail = models.ImageField(upload_to='categories/%Y/%m')

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=100, null=False)
    email = models.EmailField(max_length=100, null=False, unique=True)
    phone_number = models.CharField(max_length=10, default='')
    address = models.CharField(max_length=255, default='')
    logo = models.ImageField(upload_to='brand/%Y/%m')

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100, null=False)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(default='')
    thumbnail = models.ImageField(upload_to='products/%Y/%m')
    back_thumbnail = models.ImageField(upload_to='products/%Y/%m', blank=True)
    price = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    inventory_quantity = models.IntegerField(default=0)
    sale_price = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    category = models.ForeignKey(Category, related_name='products',
                                 on_delete=models.SET_NULL, null=True)
    brand = models.ForeignKey(Brand, related_name='products',
                              on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('name', 'category')
        # ordering = ['-id']


class Action(models.Model):
    vote = models.BooleanField(blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_user = models.ForeignKey(CustomerUser, on_delete=models.SET_NULL, null=True)


class Comment(models.Model):
    content = models.TextField(default='')
    interact = models.ForeignKey(Action, on_delete=models.CASCADE)
    cm = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True)
