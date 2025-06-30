import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const featuredProducts = (await getProducts()).slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-slate-800">
          <Image 
            src="https://placehold.co/1920x1080.png"
            alt="پس زمینه تجهیزات ساختمانی"
            fill
            className="object-cover z-0 opacity-30"
            priority
            data-ai-hint="industrial equipment"
          />
          <div className="z-10 container">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
              جامع‌ترین فروشگاه آنلاین تجهیزات تأسیساتی
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
              هر آنچه برای پروژه‌های ساختمانی خود نیاز دارید، با بهترین کیفیت و قیمت.
            </p>
            <Button asChild size="lg">
              <Link href="/products">مشاهده همه محصولات</Link>
            </Button>
          </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center font-headline mb-10">محصولات منتخب</h2>
          {featuredProducts.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center">محصولی برای نمایش وجود ندارد.</p>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted py-12 md:py-20">
        <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline mb-10">دسته‌بندی‌ها</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* These would be dynamic in a real app */}
                <Link href="#" className="block p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <p>لوله و اتصالات</p>
                </Link>
                <Link href="#" className="block p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <p>تجهیزات گرمایشی</p>
                </Link>
                <Link href="#" className="block p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <p>شیرآلات</p>
                </Link>
                <Link href="#" className="block p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <p>ابزارآلات</p>
                </Link>
                 <Link href="#" className="block p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <p>تجهیزات برقی</p>
                </Link>
            </div>
        </div>
      </section>
    </>
  );
}
