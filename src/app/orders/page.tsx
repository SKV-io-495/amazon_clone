import { db } from '@/lib/db';
import { orders, orderItems, products } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import Link from 'next/link';
import Image from 'next/image';

// Since we are not strictly using Drizzle Relations in the schema files yet (based on previous observations), 
// we will use a robust Join approach to fetch the data.
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import AuthRequired from '@/components/AuthRequired';

// ... imports

export default async function OrdersPage() {
  const session = await auth.api.getSession({
     headers: await headers()
  });

  if (!session) {
     return <AuthRequired title="Your Orders" />;
  }

  const userId = session.user.id;

  // Fetch orders
  const userOrders = await db.select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));

  // For each order, fetch items (Need to be careful with N+1, but for a simple clone this is fine and clear)
  // An alternative is to fetch all items for these orders in one go, but let's keep it simple first.
  const ordersWithItems = await Promise.all(userOrders.map(async (order) => {
    const items = await db.select({
       quantity: orderItems.quantity,
       price: orderItems.price,
       productTitle: products.title,
       productImage: products.image,
       productId: products.id,
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, order.id));
    
    console.log(`Order ${order.id} items:`, items); // Debug log

    return { ...order, items };
  }));

  return (
    <div className="bg-white min-h-screen p-4 md:p-8 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-normal mb-6">Your Orders</h1>
      
      <div className="space-y-6">
        {ordersWithItems.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          ordersWithItems.map((order) => (
            <div key={order.id} className="border border-gray-300 rounded-lg overflow-hidden">
               {/* Order Header */}
               <div className="bg-gray-100 p-4 border-b border-gray-300 flex flex-col md:flex-row justify-between text-sm text-gray-600 gap-4">
                  <div className="flex gap-8">
                     <div>
                        <span className="block text-xs uppercase font-bold">Order Placed</span>
                        <span>{order.createdAt?.toLocaleDateString()}</span>
                     </div>
                     <div>
                        <span className="block text-xs uppercase font-bold">Total</span>
                        <span>${order.total}</span>
                     </div>
                     <div className="hidden md:block">
                        <span className="block text-xs uppercase font-bold">Ship To</span>
                        <span className="text-[#007185] hover:underline cursor-pointer">Test User</span>
                     </div>
                  </div>
                  <div>
                     <span className="block text-xs uppercase font-bold">Order # {order.id}</span>
                     <div className="flex gap-2 text-[#007185] hover:underline cursor-pointer">
                        {/* <span>View order details</span> */}
                        {/* <span className="text-gray-400">|</span> */}
                        <span>View invoice</span>
                     </div>
                  </div>
               </div>

               {/* Order Body */}
               <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg mb-2">
                     {order.status === 'pending' ? 'Arriving soon' : 'Delivered'}
                  </h3>
                  <div className="space-y-4">
                     {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                           <div className="relative w-20 h-20 flex-shrink-0">
                              <Image 
                                 src={item.productImage} 
                                 alt={item.productTitle} 
                                 fill 
                                 className="object-contain" 
                                 unoptimized 
                              />
                           </div>
                           <div>
                              <Link href={`/product/${item.productId}`} className="text-[#007185] hover:underline hover:text-[#c7511f] font-medium line-clamp-2">
                                 {item.productTitle}
                              </Link>
                              <div className="text-xs text-gray-500 my-1">
                                 Return window closed on {new Date().toLocaleDateString()}
                              </div>
                              <div className="flex gap-2 mt-2">
                                 <button className="bg-[#ffd814] border border-[#fcd200] rounded-lg px-3 py-1 text-sm shadow-sm hover:bg-[#f7ca00]">
                                    Buy it again
                                 </button>
                                 <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm shadow-sm hover:bg-gray-50">
                                    View your item
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
