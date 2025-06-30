import type { Product, Category } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Fetches all products, optionally filtered by category slug.
 * @param categorySlug - The slug of the category to filter by.
 * @returns A promise that resolves to an array of products.
 */
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = new URL(`${API_BASE_URL}/catalog/products/`);
    if (categorySlug) {
      url.searchParams.append('category', categorySlug);
    }
      
    // Use no-store to ensure fresh data on every request
    const response = await fetch(url.toString(), { cache: 'no-store' });
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error("Error Body:", errorBody);
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // Return an empty array on failure to prevent site crash
  }
}

/**
 * Fetches a single product by its ID.
 * @param id - The ID of the product to fetch.
 * @returns A promise that resolves to the product object or null if not found.
 */
export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/catalog/products/${id}/`, { cache: 'no-store' });
    if (!response.ok) {
        if (response.status === 404) {
            return null; // Not found is a valid case
        }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
}

/**
 * Fetches all product categories.
 * @returns A promise that resolves to an array of categories.
 */
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

/**
 * Constructs the full absolute URL for a product image from its relative path.
 * @param imagePath - The relative path of the image from the Django API (e.g., /media/image/1/p-123.jpg)
 * @returns The full URL to the image.
 */
export function getFullImageUrl(imagePath: string): string {
    if (!imagePath) return 'https://placehold.co/400x400.png';
    // If imagePath is already a full URL, return it directly
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    // Otherwise, construct the full URL from the backend base
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    // Ensure we don't have double slashes
    return `${backendUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}
