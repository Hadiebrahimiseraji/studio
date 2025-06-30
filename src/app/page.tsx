import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product-card';
import { getCategories, getFeaturedProducts } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-secondary/50">
        <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 lg:py-24">
          <div className="space-y-6 text-center md:text-right">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
              BuildMart: راه حل جامع شما برای تجهیزات تأسیساتی
            </h1>
            <p className="text-lg text-muted-foreground">
              با کیفیت ترین لوله ها، اتصالات و تجهیزات صنعتی را با قیمت های رقابتی پیدا کنید.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/products">
                مشاهده محصولات
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="relative h-64 w-full md:h-96">
            <Image
              src="https://placehold.co/600x400.png"
              alt="تجهیزات تأسیساتی"
              fill
              className="rounded-lg object-cover shadow-lg"
              data-ai-hint="industrial pipes"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold">دسته بندی محصولات</h2>
            <p className="text-muted-foreground">مجموعه گسترده ما را کاوش کنید</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      data-ai-hint={category.id}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <div className="space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold">محصولات ویژه</h2>
            <p className="text-muted-foreground">پرفروش ترین ها و جدیدترین محصولات ما</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
         <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/products">
                مشاهده همه محصولات
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="bg-secondary/50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-headline text-3xl font-bold">چرا BuildMart را انتخاب کنید؟</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-headline text-xl font-semibold">کیفیت برتر</h3>
              <p className="text-muted-foreground">محصولات تأیید شده از برندهای معتبر.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-headline text-xl font-semibold">قیمت رقابتی</h3>
              <p className="text-muted-foreground">بهترین معاملات برای پروژه های شما در هر مقیاسی.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-headline text-xl font-semibold">پشتیبانی تخصصی</h3>
              <p className="text-muted-foreground">تیم ما آماده کمک به شما در انتخاب محصولات مناسب است.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
