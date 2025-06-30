import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block font-headline text-primary">
              BuildMart Online
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/products"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              محصولات
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              تماس با ما
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="relative w-full max-w-sm">
             <Input type="search" placeholder="جستجو در محصولات..." className="pr-10" />
             <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">حساب کاربری</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">سبد خرید</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
