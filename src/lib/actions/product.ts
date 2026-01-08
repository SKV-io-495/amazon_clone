import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq, ilike, and } from 'drizzle-orm';

export async function getProducts(query?: string, category?: string) {
  try {
    const filters = [];
    
    if (query) {
      filters.push(ilike(products.title, `%${query}%`));
    }
    
    if (category) {
      filters.push(eq(products.category, category));
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined;
    
    const result = await db.select()
      .from(products)
      .where(whereClause);
    
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
