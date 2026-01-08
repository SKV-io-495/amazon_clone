'use server';

import { db } from '@/lib/db';
import { carts, orders, orderItems, products } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { DEFAULT_USER_ID } from '@/lib/constants';
import { sendOrderConfirmation } from '../email';

export async function placeOrder(formData: FormData) {
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const zip = formData.get('zip') as string;
  const name = formData.get('fullName') as string;
  
  const fullAddress = `${name}\n${address}\n${city}, ${zip}`;

  try {
    // 1. Get Cart Items
    const cartItems = await db.select({
      productId: carts.productId,
      quantity: carts.quantity,
      price: products.price, // Get current price from products
    })
    .from(carts)
    .innerJoin(products, eq(carts.productId, products.id))
    .where(eq(carts.userId, DEFAULT_USER_ID));

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // 2. Calculate Total
    const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

    // 3. Create Order
    const [newOrder] = await db.insert(orders).values({
      userId: DEFAULT_USER_ID,
      total: total.toFixed(2),
      status: 'pending',
      addressSnapshot: fullAddress,
    }).returning({ id: orders.id });

    // 4. Create Order Items
    for (const item of cartItems) {
      await db.insert(orderItems).values({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    // 4.5. Send Email
    // Since we don't have user email in this simple schema (only userId), we'll mock it or assume a default email.
    // In a real app, we'd fetch the user's email or use the one from the form if provided (but checkout form only asked for shipping info).
    // Use a placeholder email.
    await sendOrderConfirmation('customer@example.com', newOrder.id);
    
    // 5. Clear Cart
    await db.delete(carts).where(eq(carts.userId, DEFAULT_USER_ID));

    revalidatePath('/', 'layout'); // Update Navbar count across the app

  } catch (error) {
    console.error('Order failed:', error);
    return { error: 'Order failed' };
  }

  // 6. Redirect (outside try/catch because logic redirects throw error in Next)
  redirect(`/checkout/success`); 
}
