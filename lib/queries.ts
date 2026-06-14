import { db } from '@/db';
import {eq} from 'drizzle-orm';
import { products } from '@/db/schema';

export async function getWebappContents() {
  return await db.query.webappContents.findFirst();
}

export async function getFeaturedProducts() {
  return db
    .select()
    .from(products)
    .where(eq(products.isFeatured, true));
}