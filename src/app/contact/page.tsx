import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">تماس با ما</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          ما برای کمک اینجا هستیم. چگونه می توانیم شما را یاری کنیم؟
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-8 rounded-lg bg-card p-8 shadow-sm">
            <h2 className="font-headline text-2xl font-semibold">ارسال پیام</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">نام</Label>
                <Input id="name" placeholder="نام شما" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input id="email" type="email" placeholder="آدرس ایمیل شما" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">موضوع</Label>
              <Input id="subject" placeholder="موضوع پیام" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">پیام شما</Label>
              <Textarea id="message" placeholder="پیام خود را اینجا بنویسید..." rows={5} />
            </div>
            <Button type="submit" className="w-full">ارسال پیام</Button>
          </form>
        </div>

        <div className="space-y-8">
            <div className="rounded-lg bg-card p-8 shadow-sm">
            <h2 className="font-headline text-2xl font-semibold">اطلاعات تماس</h2>
            <div className="mt-6 space-y-6">
                <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">آدرس</h3>
                    <p className="text-muted-foreground">تهران، خیابان صنعت، پلاک ۱۲۳، واحد ۴</p>
                </div>
                </div>
                <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">تلفن</h3>
                    <p className="text-muted-foreground" dir="ltr">۰۲۱ - ۱۲۳۴ ۵۶۷۸</p>
                </div>
                </div>
                <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">ایمیل</h3>
                    <p className="text-muted-foreground">info@buildmart.com</p>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}
