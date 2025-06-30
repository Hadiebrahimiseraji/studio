'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50000 : 0; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold">سبد خرید شما</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">سبد خرید شما خالی است</h2>
          <p className="mt-2 text-muted-foreground">
            به نظر می رسد هنوز محصولی اضافه نکرده اید.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">بازگشت به فروشگاه</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>محصولات ({cartItems.length})</CardTitle>
                    <Button variant="outline" size="sm" onClick={clearCart}>
                        پاک کردن سبد
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 p-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary">
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.price.toLocaleString('fa-IR')} تومان</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="h-9 w-16 text-center"
                        />
                      </div>
                      <div className="text-right font-medium">
                        {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>جمع کل</span>
                  <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span>هزینه ارسال</span>
                  <span>{shipping.toLocaleString('fa-IR')} تومان</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>مبلغ قابل پرداخت</span>
                  <span>{total.toLocaleString('fa-IR')} تومان</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  ادامه و پرداخت
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
