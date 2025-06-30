import { searchProducts } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : ''
  const products = searchProducts(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-3xl font-bold">
        نتایج جستجو برای: <span className="text-primary">&quot;{query}&quot;</span>
      </h1>

      {products.length > 0 ? (
        <p className="mt-2 text-muted-foreground">
          {products.length} محصول یافت شد.
        </p>
      ) : null}

      <div className="mt-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
            <h2 className="text-xl font-semibold">محصولی یافت نشد</h2>
            <p className="mt-2 text-muted-foreground">
              عبارت جستجوی دیگری را امتحان کنید یا به صفحه محصولات بروید.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
