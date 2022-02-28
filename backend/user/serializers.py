from rest_framework.serializers import ModelSerializer
from .models import CustomerUser


class CustomerUserSerializer(ModelSerializer):
    def create(self, validated_data):
        user = CustomerUser.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = CustomerUser
        fields = ['id', 'first_name', 'last_name',
                  'username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }
