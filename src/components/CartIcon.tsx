import { ShoppingCart } from 'lucide-react';
import { getCartCount } from '@/lib/actions/cart';
import Link from 'next/link';

export default async function CartIcon() {
  const count = await getCartCount();

  return (
    <Link href="/cart" className="flex items-center gap-1 border border-transparent hover:border-white p-1 rounded relative">
      <div className="relative">
         <ShoppingCart size={32} />
         <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[var(--amazon-orange)] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
           {count}
         </span>
      </div>
      <span className="hidden md:block font-bold text-sm mt-3">Cart</span>
    </Link>
  );
}
