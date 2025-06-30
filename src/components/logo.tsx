import Link from 'next/link';
import { Building2 } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Building2 className="h-8 w-8 text-primary" />
      <span className="font-headline text-xl font-bold text-primary">
        BuildMart
      </span>
    </Link>
  );
}
