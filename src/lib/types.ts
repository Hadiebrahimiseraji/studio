export interface Category {
    id: number;
    name: string;
    slug: string;
    parent: number | null;
  }
  
  export interface Brand {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface ProductImage {
    id: number;
    image: string; // This will be a URL path
    image_url: string;
    alt_text: string;
    is_feature: boolean;
  }
  
  export interface SpecificationType {
      id: number;
      name: string;
  }
  
  export interface ProductSpecification {
    id: number;
    specification_type: SpecificationType;
    value: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string; // Decimal is often string in JSON
    stock: number;
    available: boolean;
    category: Category;
    brand: Brand | null;
    images: ProductImage[];
    specifications: ProductSpecification[];
  }
  