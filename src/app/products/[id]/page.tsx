import { getProductById, getFullImageUrl } from '@/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const mainImageUrl = product.images.length > 0 ? getFullImageUrl(product.images[0].image) : 'https://placehold.co/600x600.png';

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={mainImageUrl}
              alt={product.name}
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
          <p className="text-lg">{product.description}</p>
          
          {product.specifications && product.specifications.length > 0 && (
             <div>
                <h3 className="text-xl font-semibold font-headline mb-4">مشخصات فنی</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right">
                        <tbody>
                            {product.specifications.map(spec => (
                                <tr key={spec.id} className="border-b">
                                    <th className="px-4 py-2 font-medium text-muted-foreground whitespace-nowrap">{spec.specification_type.name}</th>
                                    <td className="px-4 py-2">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <p className="text-3xl font-bold text-primary">{Number(product.price).toLocaleString('fa-IR')} تومان</p>
            {product.available ? (
                <Badge variant="default" className="bg-green-600">موجود</Badge>
            ) : (
                <Badge variant="destructive">ناموجود</Badge>
            )}
          </div>

          <Button size="lg" className="w-full">افزودن به سبد خرید</Button>
        </div>
      </div>
    </div>
  );
}
