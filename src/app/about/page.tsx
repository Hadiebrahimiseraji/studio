import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary">درباره BuildMart</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            پیشرو در ارائه تجهیزات و لوازم تأسیساتی با کیفیت.
          </p>
        </div>

        <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
          <Image
            src="https://placehold.co/1200x400.png"
            alt="تیم BuildMart"
            layout="fill"
            objectFit="cover"
            data-ai-hint="factory team"
          />
        </div>

        <div className="space-y-6 rounded-lg bg-card p-8 shadow-sm">
          <h2 className="font-headline text-3xl font-semibold">داستان ما</h2>
          <p className="leading-relaxed text-muted-foreground">
            BuildMart با هدف ارائه راهکارهای جامع و مدرن در زمینه تأمین تجهیزات تأسیساتی برای پروژه های ساختمانی و صنعتی تأسیس شد. ما با تکیه بر دانش فنی تیم متخصص خود و با همکاری با برترین برندهای داخلی و خارجی، محصولاتی با کیفیت و قابل اطمینان را به مشتریان خود عرضه می کنیم.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            مأموریت ما ساده است: ارائه بهترین محصولات با بهترین قیمت و پشتیبانی بی نظیر. ما معتقدیم که موفقیت مشتریان ما، موفقیت ماست و به همین دلیل همواره در تلاشیم تا با ارائه خدمات مشاوره ای تخصصی، شما را در انتخاب بهترین تجهیزات برای پروژه هایتان یاری کنیم.
          </p>
        </div>

        <div className="text-center">
            <h2 className="font-headline text-3xl font-semibold">چشم انداز ما</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
            ما در BuildMart به دنبال آن هستیم که به عنوان معتبرترین و قابل اعتمادترین مرجع تأمین تجهیزات تأسیساتی در کشور شناخته شویم. با گسترش دامنه محصولات و خدمات خود، قصد داریم تا نیازهای تمامی پروژه های کوچک و بزرگ را در سراسر ایران پوشش دهیم و نقشی کلیدی در توسعه زیرساخت های کشور ایفا کنیم.
            </p>
        </div>
      </div>
    </div>
  );
}
