import { db } from '@/db';
import { products } from '@/db/schema';
import { ProductClient } from '@/components/product-client';

export default async function ProductsPage() {
  const data = await db.select().from(products);

  return <ProductClient initialProducts={data} />;
}