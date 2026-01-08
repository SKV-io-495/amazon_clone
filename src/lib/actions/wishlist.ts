'use server';

import { db } from '@/lib/db';
import { wishlists } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { DEFAULT_USER_ID } from '@/lib/constants';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function toggleWishlist(productId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id || DEFAULT_USER_ID;

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
      return { action: 'removed' };
    } else {
      // Add
      await db.insert(wishlists).values({
        userId: userId,
        productId: productId,
      });
      revalidatePath('/');
      revalidatePath('/wishlist');
      return { action: 'added' };
    }
  } catch (error) {
    console.error('Wishlist toggle error:', error);
    return { error: 'Failed to toggle wishlist' };
  }
}

export async function getWishlistItems() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        const userId = session?.user?.id || DEFAULT_USER_ID;

        const items = await db.select()
            .from(wishlists)
            .where(eq(wishlists.userId, userId));
        return items.map(item => item.productId);
    } catch (error) {
        return [];
    }
}
