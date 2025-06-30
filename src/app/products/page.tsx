import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">همه محصولات</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>محصولی برای نمایش وجود ندارد.</p>
      )}
    </div>
  );
}
