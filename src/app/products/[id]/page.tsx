import { getProductById } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import type { Product } from '@/lib/types';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product: Product | null = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-12">
      <ProductDetail product={product} />
    </div>
  );
}
