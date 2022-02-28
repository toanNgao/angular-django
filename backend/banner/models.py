from django.db import models


# Create your models here.
class Banner(models.Model):
    banner = models.ImageField(upload_to='banner/%Y/%m')
    link = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

