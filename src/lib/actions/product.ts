'use server';

import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { like, eq } from 'drizzle-orm';

export async function getProducts(query?: string, category?: string) {
  try {
    let result = await db.select().from(products);
    
    // Future: Add filtering logic here
    // if (query) {
    //   result = result.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    // }
    // if (category) {
    //   result = result.filter(p => p.category === category);
    // }
    
    return result;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
