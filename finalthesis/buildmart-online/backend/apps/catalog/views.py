from rest_framework import generics
from .models import Category, Brand, Product
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug' # Assuming you want to use slug for category detail

class BrandList(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDetail(generics.RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'slug' # Assuming you want to use slug for brand detail


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all().prefetch_related('images', 'specifications__specification_type')
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all().prefetch_related('images', 'specifications__specification_type')
    serializer_class = ProductSerializer
    lookup_field = 'id'
