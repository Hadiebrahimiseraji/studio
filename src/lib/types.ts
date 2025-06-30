export type Specification = {
  name: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  images: string[];
  specifications: Specification[];
  featured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};
