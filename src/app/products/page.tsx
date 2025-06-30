import { getProducts, getCategories } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const selectedCategory = typeof searchParams?.category === 'string' ? searchParams.category : 'all'
  const products = getProducts(selectedCategory === 'all' ? undefined : selectedCategory)
  const categories = [{ id: 'all', name: 'همه محصولات' }, ...getCategories()]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold">کاتالوگ محصولات</h1>
        <p className="mt-2 text-muted-foreground">مجموعه کامل تجهیزات ما را کاوش کنید.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-4 font-headline text-lg font-semibold">دسته بندی ها</h2>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <Link
                      href={`/products?category=${category.id}`}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary",
                        selectedCategory === category.id && "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-3">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
              <p>محصولی در این دسته بندی یافت نشد.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
