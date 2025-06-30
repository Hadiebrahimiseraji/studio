import { notFound } from 'next/navigation';
import { getProductById, getProducts } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { ProductImageGallery } from '@/components/product-image-gallery';
import AddToCartButton from '@/components/add-to-cart-button';
import AiRecommendations from '@/components/ai-recommendations';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <ProductImageGallery images={product.images} alt={product.name} />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.category}</p>
          <p className="mt-4 font-headline text-4xl font-bold text-primary">
            {product.price.toLocaleString('fa-IR')} تومان
          </p>
          <Separator className="my-6" />
          <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">مشخصات فنی</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">ویژگی</TableHead>
                  <TableHead>مقدار</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.specifications.map((spec) => (
                  <TableRow key={spec.name}>
                    <TableCell className="font-medium">{spec.name}</TableCell>
                    <TableCell>{spec.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
          <AiRecommendations currentProduct={product} />
      </div>
    </div>
  );
}
