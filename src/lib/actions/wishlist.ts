'use server';

import { db } from '@/lib/db';
import { wishlists } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function toggleWishlist(productId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session) {
      return { error: 'Not authenticated', requiresAuth: true };
    }

    const userId = session.user.id;

    const existing = await db.select()
      .from(wishlists)
      .where(and(
        eq(wishlists.userId, userId),
        eq(wishlists.productId, productId)
      ));

    if (existing.length > 0) {
      // Remove
      await db.delete(wishlists)
        .where(and(
          eq(wishlists.userId, userId),
          eq(wishlists.productId, productId)
        ));
      revalidatePath('/');
      revalidatePath('/wishlist');
      return { action: 'removed', success: true };
    } else {
      // Add
      await db.insert(wishlists).values({
        userId: userId,
        productId: productId,
        // id: crypto.randomUUID() // Drizzle might auto-gen if configured, let's check schema/default
      });
      revalidatePath('/');
      revalidatePath('/wishlist');
      return { action: 'added', success: true };
    }
  } catch (error) {
    console.error('Wishlist toggle error:', error);
    return { error: 'Failed to toggle wishlist' };
  }
}

// Removing getWishlistItems if unused (checked via grep)
