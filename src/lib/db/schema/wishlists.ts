import { pgTable, uuid, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { products } from './products';

export const wishlists = pgTable('wishlists', {
  userId: text('user_id').notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.productId] }),
  };
});
