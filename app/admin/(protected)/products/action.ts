'use server';

import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { fileToDataUrl } from '@/lib/utils';

export async function createProduct(formData: FormData) {
  const name = String(formData.get('name') ?? '');
  const description = String(formData.get('description') ?? '');
  const price = String(formData.get('price') ?? '0');
  const isFeatured = formData.get('isFeatured') === 'true';

  const file = formData.get('image') as File | null;

  const image = file && file.size > 0
    ? await fileToDataUrl(file)
    : null;

  await db.insert(products).values({
    name,
    description,
    price,
    image,
    isFeatured,
  });

  revalidatePath('/admin/products');
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get('id'));

  const name = String(formData.get('name') ?? '');
  const description = String(formData.get('description') ?? '');
  const price = String(formData.get('price') ?? '0');
  const isFeatured = formData.get('isFeatured') === 'true';

  const file = formData.get('image') as File | null;

  const image =
    file && file.size > 0
      ? await fileToDataUrl(file)
      : undefined;

  await db
    .update(products)
    .set({
      name,
      description,
      price,
      isFeatured,
      ...(image ? { image } : {}),
    })
    .where(eq(products.id, id));

  revalidatePath('/admin/products');
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath('/admin/products');
}