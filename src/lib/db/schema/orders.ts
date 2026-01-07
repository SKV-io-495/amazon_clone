import { pgTable, uuid, text, decimal, timestamp, integer } from 'drizzle-orm/pg-core';
import { products } from './products';

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: text('status', { enum: ['pending', 'paid', 'shipped'] }).notNull().default('pending'),
  addressSnapshot: text('address_snapshot').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});
