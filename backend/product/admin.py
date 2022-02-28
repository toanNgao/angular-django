from django.contrib import admin
from django.utils.html import mark_safe
from .models import *


class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_at', 'active', 'category', 'brand']
    search_fields = ['name', 'category__name']
    ordering = ['-id']
    readonly_fields = ['avatar']

    def avatar(self, thumbnail):
        return mark_safe('<img src="http://127.0.0.1:8000/{img_url}" alt="{alt}" style="width: 200px" /img>'.format(img_url=thumbnail.thumbnail, alt=thumbnail.name))


# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(Brand)
admin.site.register(Category)
admin.site.register(Action)
admin.site.register(Comment)
