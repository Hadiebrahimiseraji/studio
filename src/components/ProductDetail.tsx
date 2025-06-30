import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getFullImageUrl } from '@/lib/api';
import type { Product } from '@/lib/types';
import Link from 'next/link';

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const mainImageUrl = product.image ? getFullImageUrl(product.image) : 'https://placehold.co/600x600.png';

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
          <Image
            src={mainImageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint="product image"
          />
        </div>
      </div>
      <div className="space-y-6">
        <div>
            {product.category && (
                 <Link href={`/products?category=${product.category.slug}`} className="text-sm text-primary hover:underline">
                    {product.category.name}
                 </Link>
            )}
          <h1 className="text-3xl lg:text-4xl font-bold font-headline mt-1">{product.name}</h1>
        </div>
        
        {product.description && <p className="text-base text-muted-foreground">{product.description}</p>}
        
        <div className="flex items-center justify-between gap-4 pt-4">
          <p className="text-3xl font-bold text-primary">{Number(product.price).toLocaleString('fa-IR')} تومان</p>
          {product.available ? (
              <Badge variant="default" className="bg-green-600 hover:bg-green-700">موجود</Badge>
          ) : (
              <Badge variant="destructive">ناموجود</Badge>
          )}
        </div>

        <Button size="lg" className="w-full" disabled={!product.available}>افزودن به سبد خرید</Button>
      </div>
    </div>
  );
}
