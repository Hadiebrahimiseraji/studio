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
    return [];
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
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
      return [];
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
