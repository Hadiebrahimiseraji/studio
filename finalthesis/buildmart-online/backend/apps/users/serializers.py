# Placeholder serializers.py for the users app

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' # You will want to customize this for security