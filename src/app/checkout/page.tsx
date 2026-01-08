import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import AuthRequired from '@/components/AuthRequired';

import { placeOrder } from '@/lib/actions/order';
import Button from '@/components/ui/Button';

export default async function CheckoutPage() {
  const session = await auth.api.getSession({
      headers: await headers()
  });

  if (!session) {
      return <AuthRequired title="Checkout" />;
  }

  return (
    <div className="min-h-screen bg-white p-4 lg:p-8 max-w-[1000px] mx-auto">
      <h1 className="text-3xl font-medium border-b border-gray-200 pb-4 mb-6">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#c45500]">1. Enter Delivery Address</h2>
          <form action={placeOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Full Name</label>
              <input name="fullName" required className="w-full border border-gray-400 p-2 rounded focus:ring-[var(--amazon-orange)] focus:border-[var(--amazon-orange)]" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Address</label>
              <input name="address" required className="w-full border border-gray-400 p-2 rounded focus:ring-[var(--amazon-orange)] focus:border-[var(--amazon-orange)]" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">City</label>
              <input name="city" required className="w-full border border-gray-400 p-2 rounded focus:ring-[var(--amazon-orange)] focus:border-[var(--amazon-orange)]" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">ZIP Code</label>
              <input name="zip" required className="w-full border border-gray-400 p-2 rounded focus:ring-[var(--amazon-orange)] focus:border-[var(--amazon-orange)]" />
            </div>

            <Button type="submit" variant="primary" className="w-full mt-4">
              Place Your Order
            </Button>
          </form>
        </div>
        
        <div className="bg-[#f0f2f2] p-6 rounded border border-gray-300 h-fit">
          <h2 className="text-lg font-bold mb-2">Order Summary</h2>
          <p className="text-sm text-gray-600 mb-4">Items added to your cart will appear here upon final calculation.</p>
          <div className="border-t border-gray-300 pt-4">
             <p className="text-[#b12704] font-bold">Total will be calculated on placement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
