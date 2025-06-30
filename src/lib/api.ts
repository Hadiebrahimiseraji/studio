import type { Product, Category } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = categorySlug 
      ? `${API_BASE_URL}/catalog/products/?category=${categorySlug}` 
      : `${API_BASE_URL}/catalog/products/`;
      
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; 
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/catalog/products/${id}/`, { cache: 'no-store' });
    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/catalog/categories/`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
}

export function getFullImageUrl(imagePath: string): string {
    if (!imagePath) return 'https://placehold.co/400x400.png';
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    return `${backendUrl}${imagePath}`;
}
