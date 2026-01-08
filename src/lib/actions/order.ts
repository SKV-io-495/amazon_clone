'use server';

import { db } from '@/lib/db';
import { carts, orders, orderItems, products } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { sendOrderConfirmation } from '../email';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function placeOrder(formData: FormData) {
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const zip = formData.get('zip') as string;
  const name = formData.get('fullName') as string;
  
  const fullAddress = `${name}\n${address}\n${city}, ${zip}`;

  try {
    // 1. Validate Session
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new Error('Please sign in to place an order.');
  }

  const userId = session.user.id;
  const userEmail = session.user.email; // Use real email

    // 2. Clear previous checkout data (mock) or ensure cart valid
    // For now, we assume cart exists.

    // Calculate Total (Re-fetch to be safe)
    const cartItems = await db.select({
       price: products.price,
       quantity: carts.quantity
    })
    .from(carts)
    .innerJoin(products, eq(carts.productId, products.id))
    .where(eq(carts.userId, userId));

    if (cartItems.length === 0) {
        throw new Error("Cart is empty");
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    // 3. Create Order
    const [newOrder] = await db.insert(orders).values({
      id: crypto.randomUUID(),
      userId: userId,
      total: totalAmount.toFixed(2),
      status: 'pending',
      createdAt: new Date(),
      addressSnapshot: fullAddress, // Keep address snapshot from form
    }).returning();

    // 4. Move Cart Items to Order Items
    const cartItemsFull = await db.select().from(carts).where(eq(carts.userId, userId));
    
    // We need unit prices.
    const itemsToInsert = await Promise.all(cartItemsFull.map(async (item) => {
        const product = await db.query.products.findFirst({
            where: eq(products.id, item.productId)
        });
        return {
            id: crypto.randomUUID(),
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product?.price || '0', // Should be valid
        };
    }));

    if (itemsToInsert.length > 0) {
      await db.insert(orderItems).values(itemsToInsert);
    }
    
    // 4.5. Send Email
    await sendOrderConfirmation(userEmail, newOrder.id);
    
    // 5. Clear Cart
    await db.delete(carts).where(eq(carts.userId, userId));

    revalidatePath('/');
  } catch (error) {
    console.error('Order placement failed:', error);
    return { error: 'Order failed' };
  }
  
  redirect('/checkout/success');
}
