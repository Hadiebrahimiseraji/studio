export default function Footer() {
    return (
      <footer className="bg-muted text-muted-foreground">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold font-headline text-foreground mb-4">BuildMart Online</h3>
              <p className="text-sm">
                تأمین‌کننده آنلاین تجهیزات تأسیساتی و ساختمانی.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">لینک‌های سریع</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/products" className="hover:text-primary">محصولات</a></li>
                <li><a href="/about" className="hover:text-primary">درباره ما</a></li>
                <li><a href="/contact" className="hover:text-primary">تماس با ما</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">خدمات مشتریان</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary">پرسش‌های متداول</a></li>
                <li><a href="#" className="hover:text-primary">پیگیری سفارش</a></li>
                <li><a href="#" className="hover:text-primary">سیاست بازگشت کالا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">با ما در ارتباط باشید</h4>
              <p className="text-sm">تهران، خیابان صنعت، پلاک ۱۲۳</p>
              <p className="text-sm">info@buildmart.ir</p>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} BuildMart Online. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    );
  }
