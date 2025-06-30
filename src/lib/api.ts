import type { Product, Category } from './types';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = categorySlug ? `/catalog/products/?category=${categorySlug}` : '/catalog/products/';
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Fallback mock data if backend is down
    console.log('Serving mock product data because backend is unavailable.');
    return [
      {
        id: 999,
        name: 'محصول نمونه ۱ (بک‌اند اجرا نشده)',
        slug: 'mock-product-1',
        description: 'این یک محصول نمونه است. برای دیدن محصولات واقعی، لطفاً سرور بک‌اند را اجرا کنید.',
        price: '150000',
        stock: 10,
        available: true,
        category: { id: 99, name: 'دسته‌بندی نمونه', slug: 'mock-category', parent: null },
        brand: { id: 99, name: 'برند نمونه', slug: 'mock-brand' },
        images: [{ id: 99, image: 'https://placehold.co/400x400.png', image_url: '', alt_text: 'تصویر نمونه', is_feature: true }],
        specifications: [],
      },
      {
        id: 998,
        name: 'محصول نمونه ۲ (بک‌اند اجرا نشده)',
        slug: 'mock-product-2',
        description: 'این یک محصول نمونه است. برای دیدن محصولات واقعی، لطفاً سرور بک‌اند را اجرا کنید.',
        price: '250000',
        stock: 5,
        available: true,
        category: { id: 99, name: 'دسته‌بندی نمونه', slug: 'mock-category', parent: null },
        brand: { id: 99, name: 'برند نمونه', slug: 'mock-brand' },
        images: [{ id: 98, image: 'https://placehold.co/400x400.png', image_url: '', alt_text: 'تصویر نمونه', is_feature: true }],
        specifications: [],
      }
    ];
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  // If we are requesting a mock product, return it.
  if (id === 999 || id === 998 || id === '999' || id === '998') {
    const mockProducts = await getProducts();
    return mockProducts.find(p => p.id.toString() === id.toString()) || null;
  }
  try {
    const response = await apiClient.get(`/catalog/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get('/catalog/categories/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // Fallback mock data if backend is down
      console.log('Serving mock category data because backend is unavailable.');
      return [
        { id: 99, name: 'دسته‌بندی نمونه ۱', slug: 'mock-category-1', parent: null },
        { id: 98, name: 'دسته‌بندی نمونه ۲', slug: 'mock-category-2', parent: null },
      ];
    }
  }

export function getFullImageUrl(imagePath: string): string {
    if (!imagePath) return 'https://placehold.co/400x400.png';
    // If the path is already a full URL, return it
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    // Otherwise, prepend the backend URL
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    // The imagePath from API is already a full path like '/media/image/1/foo.jpg'
    return `${backendUrl}${imagePath}`;
}
