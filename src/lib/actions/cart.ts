'use server';

import { db } from '@/lib/db';
import { carts, products } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DEFAULT_USER_ID } from '@/lib/constants';

// Add to Cart
export async function addToCart(productId: string) {
  try {
    // Check if item exists
    const existingItem = await db.select()
      .from(carts)
      .where(and(
        eq(carts.userId, DEFAULT_USER_ID),
        eq(carts.productId, productId)
      ))
      .limit(1);

    if (existingItem.length > 0) {
      // Update quantity
      await db.update(carts)
        .set({ quantity: existingItem[0].quantity + 1 })
        .where(eq(carts.id, existingItem[0].id));
    } else {
      // Insert new item
      await db.insert(carts).values({
        userId: DEFAULT_USER_ID,
        productId: productId,
        quantity: 1,
      });
    }

    revalidatePath('/');
    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add to cart' };
  }
}

// Update Quantity
export async function updateQuantity(itemId: string, quantity: number) {
  try {
    if (quantity < 1) return;
    
    await db.update(carts)
      .set({ quantity })
      .where(and(
        eq(carts.id, itemId),
        eq(carts.userId, DEFAULT_USER_ID)
      ));

    revalidatePath('/cart');
    revalidatePath('/'); // For navbar count
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
}

// Delete Item
export async function deleteItem(itemId: string) {
  try {
    await db.delete(carts)
      .where(and(
        eq(carts.id, itemId),
        eq(carts.userId, DEFAULT_USER_ID)
      ));

    revalidatePath('/cart');
    revalidatePath('/'); // For navbar count
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

// Get Cart Items
export async function getCart() {
  try {
    const items = await db.select({
      id: carts.id,
      productId: carts.productId,
      quantity: carts.quantity,
      title: products.title,
      price: products.price,
      image: products.image,
      stock: products.stock,
      isPrime: products.isPrime,
    })
    .from(carts)
    .innerJoin(products, eq(carts.productId, products.id))
    .where(eq(carts.userId, DEFAULT_USER_ID));

    return items;
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
}

// Get Cart Count
export async function getCartCount() {
    try {
        const result = await db.select({ count: sql<number>`sum(${carts.quantity})` })
            .from(carts)
            .where(eq(carts.userId, DEFAULT_USER_ID));
        
        return Number(result[0]?.count) || 0;
    } catch (error) {
        console.error('Error getting cart count:', error);
        return 0;
    }
}
