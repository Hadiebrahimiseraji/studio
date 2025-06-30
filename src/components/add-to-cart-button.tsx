'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-md border">
            <Button variant="ghost" size="icon" onClick={decrement} className="h-10 w-10 border-none">
                <Minus className="h-4 w-4" />
            </Button>
            <Input 
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-10 w-16 border-none text-center text-lg font-bold [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Button variant="ghost" size="icon" onClick={increment} className="h-10 w-10 border-none">
                <Plus className="h-4 w-4" />
            </Button>
        </div>
      <Button size="lg" onClick={handleAddToCart} className="flex-grow">
        <ShoppingCart className="ml-2 h-5 w-5" />
        افزودن به سبد خرید
      </Button>
    </div>
  );
}
