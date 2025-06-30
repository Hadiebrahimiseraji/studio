import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getFullImageUrl } from '@/lib/api';
import type { Product } from '@/lib/types';

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const mainImageUrl = product.images.length > 0 ? getFullImageUrl(product.images[0].image) : 'https://placehold.co/600x600.png';
  const mainImageAlt = product.images.length > 0 ? product.images[0].alt_text : product.name;

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
          <Image
            src={mainImageUrl}
            alt={mainImageAlt}
            fill
            className="object-cover"
            data-ai-hint="product image"
          />
        </div>
        {/* TODO: Add thumbnail gallery for more images */}
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
          <p className="text-muted-foreground mt-2">{product.category.name}</p>
        </div>
        {product.description && <p className="text-lg">{product.description}</p>}
        
        {product.specifications && product.specifications.length > 0 && (
           <div>
              <h3 className="text-xl font-semibold font-headline mb-4">مشخصات فنی</h3>
              <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm text-right">
                      <tbody>
                          {product.specifications.map((spec, index) => (
                              <tr key={spec.id} className={index !== product.specifications.length - 1 ? "border-b" : ""}>
                                  <th className="px-4 py-3 font-medium bg-muted text-muted-foreground whitespace-nowrap">{spec.specification_type.name}</th>
                                  <td className="px-4 py-3">{spec.value}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
        )}

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
