import { getProducts, getCategories } from '@/lib/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Category, Product } from '@/lib/types';
import ProductList from '@/components/ProductList';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams?: { category?: string } }) {
  const selectedCategorySlug = searchParams?.category;
  
  const products: Product[] = await getProducts(selectedCategorySlug); 
  const categories: Category[] = await getCategories();

  const selectedCategoryName = selectedCategorySlug 
    ? categories.find(c => c.slug === selectedCategorySlug)?.name
    : 'همه محصولات';

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold font-headline mb-4">{selectedCategoryName}</h1>
      
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b pb-4">
        <span className="font-semibold ml-2">دسته‌بندی‌ها:</span>
        <Button asChild variant={!selectedCategorySlug ? 'secondary' : 'outline'} size="sm" className="rounded-full">
          <Link href="/products">همه</Link>
        </Button>
        {categories.map((category) => (
          <Button asChild key={category.id} variant={selectedCategorySlug === category.slug ? 'secondary' : 'outline'} size="sm" className="rounded-full">
            <Link href={`/products?category=${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
      
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">محصولی برای نمایش در این دسته‌بندی وجود ندارد.</p>
          <p className="text-sm mt-2">ممکن است سرور بک‌اند اجرا نشده باشد یا محصولات هنوز وارد پایگاه داده نشده باشند.</p>
          <Button asChild className="mt-4">
            <Link href="/products">بازگشت به همه محصولات</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
