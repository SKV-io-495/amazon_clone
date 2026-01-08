'use server';

import { db } from '@/lib/db';
import { carts, orders, orderItems, products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { sendOrderConfirmation } from '@/lib/email';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getUserId } from './cart'; // Ensure this uses the helper from Task 1

export async function placeOrder(formData: FormData) {
  // 1. Get the Real User Session or Guest ID
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = await getUserId();
  // Fallback to guest email if not logged in
  const userEmail = session?.user?.email || formData.get('email') as string || 'guest@example.com';

  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const zip = formData.get('zip') as string;
  const name = formData.get('fullName') as string;
  
  const fullAddress = `${name}\n${address}\n${city}, ${zip}`;

  let newOrderId = '';

  try {
    // 2. Get Cart Items (For the REAL User/Guest)
    const cartItems = await db.select({
      productId: carts.productId,
      quantity: carts.quantity,
      price: products.price,
    })
    .from(carts)
    .innerJoin(products, eq(carts.productId, products.id))
    .where(eq(carts.userId, userId)); 

    if (cartItems.length === 0) {
      // Logic to handle empty cart, but we might redirect or error
      // throw new Error('Cart is empty'); 
      // Instead of throwing which crashes in server action, maybe just return or redirect
      // But let's keep it close to original logic for consistency
      throw new Error('Cart is empty');
    }

    // 3. Calculate Total
    const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

    // 4. Create Order
    const [newOrder] = await db.insert(orders).values({
      userId: userId,
      total: total.toFixed(2),
      status: 'pending',
      addressSnapshot: fullAddress,
    }).returning({ id: orders.id });
    
    newOrderId = newOrder.id;

    // 5. Create Order Items
    for (const item of cartItems) {
      await db.insert(orderItems).values({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    // 6. Send Email 
    try {
        await sendOrderConfirmation(userEmail, newOrder.id);
    } catch (emailError) {
        console.error('Email failed but order placed:', emailError);
        // Continue to success page even if email fails
    }
    
    // 7. Clear Cart
    await db.delete(carts).where(eq(carts.userId, userId));

    revalidatePath('/', 'layout');

  } catch (error) {
    console.error('Order failed:', error);
    // VERCEL FIX: Throwing ensures return type compatibility with the form action.
    throw new Error('Order processing failed'); 
  }

  // 8. Redirect on Success
  redirect(`/checkout/success`); 
}
