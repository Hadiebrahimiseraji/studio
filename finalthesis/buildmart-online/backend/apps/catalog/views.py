from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(available=True).select_related('category')
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(available=True).select_related('category')
    serializer_class = ProductSerializer
    lookup_field = 'id'
