import type { Product, Category } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = new URL(`${API_BASE_URL}/catalog/products/`);
    if (categorySlug) {
      url.searchParams.append('category', categorySlug);
    }
      
    const response = await fetch(url.toString(), { cache: 'no-store' });
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
    // If imagePath is a full URL, return it directly
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    // Otherwise, construct the full URL from the backend base
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    return `${backendUrl}${imagePath}`;
}
