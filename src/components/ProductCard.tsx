import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { getFullImageUrl } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images.length > 0 ? getFullImageUrl(product.images[0].image) : 'https://placehold.co/400x400.png';
  const imageAlt = product.images.length > 0 ? product.images[0].alt_text : product.name;

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square w-full">
            <Image
              src={imageUrl}
              alt={imageAlt || product.name}
              fill
              className="object-cover"
              data-ai-hint="product image"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-2">
            <Link href={`/products/${product.id}`} className="hover:text-primary">{product.name}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{product.category?.name}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">{Number(product.price).toLocaleString('fa-IR')} تومان</p>
        <Button>افزودن به سبد</Button>
      </CardFooter>
    </Card>
  );
}
