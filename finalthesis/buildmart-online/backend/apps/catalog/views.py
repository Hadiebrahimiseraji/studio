from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class CategoryListView(generics.ListAPIView):
    """
    API view to retrieve a list of all categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    """
    API view to retrieve a list of products.
    Can be filtered by category slug using a query parameter.
    Example: /api/catalog/products/?category=lule-va-etesalat-tak-laye-azin
    """
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(available=True).select_related('category')
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset

class ProductDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve details of a single product by its ID.
    """
    queryset = Product.objects.filter(available=True).select_related('category')
    serializer_class = ProductSerializer
    lookup_field = 'id'
