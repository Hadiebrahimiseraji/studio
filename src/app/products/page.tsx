import { getProducts, getCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Category, Product } from '@/lib/types';

export default async function ProductsPage({ searchParams }: { searchParams?: { category?: string } }) {
  const products: Product[] = await getProducts(); 
  const categories: Category[] = await getCategories();

  const selectedCategory = searchParams?.category;

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.slug === selectedCategory)
    : products;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold font-headline mb-4">همه محصولات</h1>
      
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b pb-4">
        <span className="font-semibold ml-2">دسته‌بندی‌ها:</span>
        <Button asChild variant={!selectedCategory ? 'default' : 'outline'} size="sm">
          <Link href="/products">همه</Link>
        </Button>
        {categories.map((category) => (
          <Button asChild key={category.id} variant={selectedCategory === category.slug ? 'default' : 'outline'} size="sm">
            <Link href={`/products?category=${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">محصولی برای نمایش در این دسته‌بندی وجود ندارد.</p>
          <Button asChild className="mt-4">
            <Link href="/products">بازگشت به همه محصولات</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
