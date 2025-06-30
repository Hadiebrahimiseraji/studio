from rest_framework import serializers
from .models import Category, Brand, Product, ProductImage, SpecificationType, ProductSpecification
from mptt.fields import TreeRelatedField

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'parent')

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name', 'slug')

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'alt_text', 'is_feature')

class SpecificationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecificationType
        fields = ('id', 'name')

class ProductSpecificationSerializer(serializers.ModelSerializer):
    specification_type = SpecificationTypeSerializer(read_only=True)

    class Meta:
        model = ProductSpecification
        fields = ('id', 'specification_type', 'value')

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
