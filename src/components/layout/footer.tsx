import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="bg-secondary/70">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              راه حل جامع شما برای تجهیزات تأسیساتی با کیفیت.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">لینک های سریع</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">درباره ما</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">تماس با ما</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">محصولات</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">دسته بندی ها</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products?category=newpipe" className="text-muted-foreground hover:text-primary">نیوپایپ</Link></li>
              <li><Link href="/products?category=azin" className="text-muted-foreground hover:text-primary">آذین</Link></li>
              <li><Link href="/products?category=multipipe" className="text-muted-foreground hover:text-primary">مولتی پایپ</Link></li>
              <li><Link href="/products?category=dina-polymer" className="text-muted-foreground hover:text-primary">دینا پلیمر</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">تماس با ما</h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>تهران، خیابان صنعت، پلاک ۱۲۳</p>
              <p>info@buildmart.com</p>
              <p>۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BuildMart. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
