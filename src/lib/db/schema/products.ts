import { pgTable, uuid, text, decimal, integer, boolean, json } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  rating: decimal('rating', { precision: 2, scale: 1 }).default('0.0'),
  reviewCount: integer('review_count').default(0),
  image: text('image').notNull(),
  images: json('images').$type<string[]>().notNull(),
  category: text('category').notNull(),
  stock: integer('stock').notNull().default(0),
  isPrime: boolean('is_prime').default(false),
});
