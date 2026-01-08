'use server';

import { db } from '@/lib/db';
import { carts, orders, orderItems, products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { sendOrderConfirmation } from '@/lib/email';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function placeOrder(formData: FormData) {
  // 1. Get the Real User Session
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Guard Clause: Redirect if not logged in
  if (!session?.user?.id) {
    redirect('/sign-in');
  }

  const userId = session.user.id;
  const userEmail = session.user.email;

  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const zip = formData.get('zip') as string;
  const name = formData.get('fullName') as string;
  
  const fullAddress = `${name}\n${address}\n${city}, ${zip}`;

  try {
    // 2. Get Cart Items (For the REAL User)
    const cartItems = await db.select({
      productId: carts.productId,
      quantity: carts.quantity,
      price: products.price,
    })
    .from(carts)
    .innerJoin(products, eq(carts.productId, products.id))
    .where(eq(carts.userId, userId)); // <--- FIXED: Using real userId

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // 3. Calculate Total
    const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

    // 4. Create Order
    const [newOrder] = await db.insert(orders).values({
      userId: userId, // <--- FIXED: Using real userId
      total: total.toFixed(2),
      status: 'pending',
      addressSnapshot: fullAddress,
    }).returning({ id: orders.id });

    // 5. Create Order Items
    for (const item of cartItems) {
      await db.insert(orderItems).values({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    // 6. Send Email (Real Resend Logic)
    // We strictly use the session email, ensuring the notification goes to the logged-in user.
    await sendOrderConfirmation(userEmail, newOrder.id);
    
    // 7. Clear Cart
    await db.delete(carts).where(eq(carts.userId, userId));

    revalidatePath('/', 'layout');

  } catch (error) {
    console.error('Order failed:', error);
    // VERCEL FIX: Throwing ensures return type compatibility with the form action.
    // Do NOT return { error: ... } here.
    throw new Error('Order processing failed'); 
  }

  // 8. Redirect on Success
  redirect(`/checkout/success`); 
}
