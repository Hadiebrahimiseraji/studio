export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string | null;
  category: Category;
  available: boolean;
  created: string;
  updated: string;
}
