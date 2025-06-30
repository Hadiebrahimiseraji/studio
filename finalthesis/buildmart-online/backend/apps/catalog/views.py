from rest_framework import generics
from .models import Category, Brand, Product
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.filter(parent=None) # Only top-level categories
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

class BrandList(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDetail(generics.RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'pk'


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned products to a given category,
        by filtering against a `category` query parameter in the URL.
        """
        queryset = Product.objects.all().prefetch_related('images', 'specifications__specification_type').order_by('-created')
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all().prefetch_related('images', 'specifications__specification_type')
    serializer_class = ProductSerializer
    lookup_field = 'id'
