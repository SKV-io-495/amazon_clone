import { getCart } from '@/lib/actions/cart';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import CartItem from './CartItem'; // We will create this client component for interactivity

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const cartItems = await getCart();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#eaeded] p-4 lg:p-8">
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Cart Items */}
        <div className="bg-white p-6 flex-1 shadow-sm">
          <h1 className="text-2xl font-medium border-b border-gray-200 pb-4 mb-4">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="py-8">
              <p className="mb-4">Your Amazon Cart is empty.</p>
              <Link href="/" className="text-[var(--amazon-link)] hover:underline hover:text-[#c45500]">
                Shop today&apos;s deals
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
          
          <div className="text-right text-lg pt-4 border-t border-gray-200 mt-4">
            Subtotal ({totalItems} items): <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Right Column: Subtotal Card */}
        {cartItems.length > 0 && (
          <div className="lg:w-[300px] h-fit bg-white p-6 shadow-sm">
             <div className="text-lg mb-4">
               Subtotal ({totalItems} items): <span className="font-bold">${subtotal.toFixed(2)}</span>
             </div>
             
             <div className="flex items-center gap-2 mb-4">
               <input type="checkbox" id="gift" className="rounded" />
               <label htmlFor="gift" className="text-sm">This order contains a gift</label>
             </div>

             <Link href="/checkout">
               <Button variant="primary" className="w-full shadow-sm">
                 Proceed to checkout
               </Button>
             </Link>
          </div>
        )}

      </div>
    </div>
  );
}
