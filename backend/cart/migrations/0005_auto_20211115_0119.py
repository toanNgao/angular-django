# Generated by Django 3.2.9 on 2021-11-14 18:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_alter_productvariation_size'),
        ('cart', '0004_alter_cart_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartitem',
            name='color',
            field=models.PositiveSmallIntegerField(choices=[(0, 'red'), (1, 'pink'), (2, 'black'), (3, 'white'), (4, 'blue')], default=2),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='size',
            field=models.PositiveSmallIntegerField(choices=[(0, 's'), (1, 'm'), (2, 'l'), (3, 'xl'), (4, 'xxl')], default=1),
        ),
        migrations.AlterField(
            model_name='cart',
            name='voucher',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='cart.voucher'),
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='product_variation',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.product'),
        ),
    ]
