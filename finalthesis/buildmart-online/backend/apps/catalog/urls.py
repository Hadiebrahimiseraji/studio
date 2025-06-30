from django.urls import path
from .views import (
    CategoryList, CategoryDetail,
    BrandList, BrandDetail,
    ProductList, ProductDetail
)

urlpatterns = [
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('brands/', BrandList.as_view(), name='brand-list'),
    path('brands/<int:pk>/', BrandDetail.as_view(), name='brand-detail'),
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
]