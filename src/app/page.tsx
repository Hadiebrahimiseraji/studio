import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center" style={{minHeight: 'calc(100vh - 8rem)'}}>
      <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
            جامع‌ترین فروشگاه آنلاین تجهیزات تأسیساتی
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-muted-foreground">
            هر آنچه برای پروژه‌های ساختمانی خود نیاز دارید، با بهترین کیفیت و قیمت.
          </p>
          <Button asChild size="lg">
            <Link href="/products">مشاهده همه محصولات</Link>
          </Button>
      </div>
    </main>
  );
}
