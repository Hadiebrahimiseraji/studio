import type { Product } from './types';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get('/catalog/products/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // In a real app, you'd want to handle this more gracefully
    return [];
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    const response = await apiClient.get(`/catalog/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    // In a real app, you'd want to handle this more gracefully
    return null;
  }
}

export function getFullImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    return `${backendUrl}${imagePath}`;
}
