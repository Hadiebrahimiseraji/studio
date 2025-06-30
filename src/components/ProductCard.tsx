import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { getFullImageUrl } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image ? getFullImageUrl(product.image) : 'https://placehold.co/400x400.png';

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg h-full">
      <CardHeader className="p-0 border-b">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square w-full">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="product image"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold leading-tight mb-1 h-14 overflow-hidden">
            <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{product.category?.name}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">{Number(product.price).toLocaleString('fa-IR')} تومان</p>
        <Button size="sm" disabled={!product.available}>افزودن به سبد</Button>
      </CardFooter>
    </Card>
  );
}
