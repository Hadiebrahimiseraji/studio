from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    # The 'image' field, being an ImageField, automatically generates
    # the full URL when requested through the API (e.g., /media/1/p-123.jpg)
    
    class Meta:
        model = Product
        fields = [
            'id', 
            'name', 
            'slug',
            'description', 
            'price', 
            'image', 
            'category', 
            'stock',
            'available',
            'created_at', 
            'updated_at'
        ]
