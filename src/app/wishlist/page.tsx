import { db } from '@/lib/db';
import { wishlists, products } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { DEFAULT_USER_ID } from '@/lib/constants';
import ProductCard from '@/components/ProductCard';

export default async function WishlistPage() {
  const wishlistItems = await db.select({
      product: products
  })
    .from(wishlists)
    .innerJoin(products, eq(wishlists.productId, products.id))
    .where(eq(wishlists.userId, DEFAULT_USER_ID))
    .orderBy(desc(wishlists.createdAt));

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
       <div className="bg-white border-b border-gray-200 mb-6 sticky top-0 z-40">
          <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
             <h1 className="text-2xl font-bold">Your Wish List</h1>
             <span className="text-sm text-gray-600">{wishlistItems.length} items</span>
          </div>
       </div>

      <div className="max-w-screen-2xl mx-auto px-4">
         {wishlistItems.length === 0 ? (
            <div className="bg-white p-8 rounded shadow-sm text-center">
               <p className="text-lg text-gray-700">Your list is empty.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {wishlistItems.map(({ product }) => (
                  <ProductCard key={product.id} product={product} />
               ))}
            </div>
         )}
      </div>
    </div>
  );
}
