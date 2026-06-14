import {
  mysqlTable,
  serial,
  varchar,
  text,
  longtext,
  decimal,
  boolean,
  int,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
});

export const webappContents = mysqlTable('webapp_contents', {
  id: serial('id').primaryKey(),
  logoImage: longtext('logo_image'),
  shopName: varchar('shop_name', { length: 255 }).notNull(),
  whatsappNumber: varchar('whatsapp_number', {
    length: 30,
  }).notNull(),
  address: text('address').notNull(),
  googleMapUrl: text('google_map_url'),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .onUpdateNow(),
});

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  image: longtext('image'),
  price: decimal('price', {
    precision: 10,
    scale: 2,
  }),
  isFeatured: boolean('is_featured').default(false),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .onUpdateNow(),
});