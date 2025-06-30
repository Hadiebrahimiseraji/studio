import Link from 'next/link';
import { getCategories } from '@/lib/api';
import { Category } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building } from 'lucide-react';

export default async function HomePage() {
  const categories: Category[] = await getCategories();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center text-white bg-slate-800">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: "url('https://placehold.co/1200x600.png')" }}
          data-ai-hint="industrial equipment pipes"
        ></div>
        <div className="z-10 container">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
              جامع‌ترین فروشگاه آنلاین تجهیزات تأسیساتی
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
              هر آنچه برای پروژه‌های ساختمانی خود نیاز دارید، با بهترین کیفیت و قیمت.
            </p>
            <Link href="/products" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                مشاهده همه محصولات
            </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted py-12 md:py-20">
        <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline mb-10">دسته‌بندی‌ها</h2>
            {categories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link href={`/products?category=${category.slug}`} key={category.id}>
                        <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                            <CardHeader>
                                <Building className="h-12 w-12 mx-auto text-primary" />
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-center">
                                <CardTitle className="text-lg font-bold">{category.name}</CardTitle>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">دسته‌بندی برای نمایش وجود ندارد.</p>
                <p className="text-sm mt-2">ممکن است سرور بک‌اند اجرا نشده باشد یا محصولات هنوز وارد پایگاه داده نشده باشند.</p>
              </div>
            )}
        </div>
      </section>
    </main>
  );
}
