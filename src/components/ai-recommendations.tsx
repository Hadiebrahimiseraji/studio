'use client';

import { useEffect, useState, useTransition } from 'react';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function AiRecommendations({ currentProduct }: { currentProduct: Product }) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const result = await getProductRecommendations({
          browsingHistory: currentProduct.name,
          pastPurchases: 'لوله, زانو', // Mock data for demonstration
        });
        
        const recommendedNames = result.recommendedProducts.split(',').map(name => name.trim().toLowerCase());
        const allProducts = getProducts();
        
        const recommendedProducts = allProducts.filter(p => 
          recommendedNames.includes(p.name.toLowerCase()) && p.id !== currentProduct.id
        );

        setRecommendations(recommendedProducts.slice(0, 4));
      } catch (error) {
        console.error("Failed to get recommendations:", error);
      }
    });
  }, [currentProduct]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">شاید اینها را هم بپسندید</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">توصیه ای برای نمایش وجود ندارد.</p>
        )}
      </CardContent>
    </Card>
  );
}
