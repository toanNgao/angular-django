from django.db import models


# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100, null=False)
    content = models.TextField(default='')
    image = models.ImageField(upload_to='blog/%Y/%m')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Interact(models.Model):
    vote = models.BooleanField(blank=True)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    # user


class Comment(models.Model):
    content = models.TextField(default='')
    interact = models.ForeignKey(Interact, on_delete=models.CASCADE)
    cm = models.ForeignKey('self', on_delete=models.CASCADE)
