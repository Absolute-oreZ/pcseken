'use server';

import { db } from '@/db';
import { webappContents } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { fileToDataUrl } from '@/lib/utils';

export async function updateWebappContentsAction(formData: FormData) {
  try {
    const shopName = String(formData.get('shopName') ?? '');
    const whatsappNumber = String(formData.get('whatsappNumber') ?? '');
    const address = String(formData.get('address') ?? '');
    const googleMapUrl = String(formData.get('googleMapUrl') ?? '');

    const logoFile = formData.get('logo') as File | null;
    const removeLogo = formData.get('removeLogo') === '1';

    let logoImage: string | null | undefined;

    if (removeLogo) {
      logoImage = null;
    } else if (logoFile && logoFile.size > 0) {
      logoImage = await fileToDataUrl(logoFile);
    }

    const existing = await db.query.webappContents.findFirst();
    if (!existing) {
      return { ok: false, message: 'Config not found' };
    }

    await db
      .update(webappContents)
      .set({
        shopName,
        whatsappNumber,
        address,
        googleMapUrl,
        ...(logoImage !== undefined ? { logoImage } : {}),
      })
      .where(eq(webappContents.id, existing.id));

    revalidatePath('/');

    return { ok: true };
  } catch (e) {
    return { ok: false, message: 'Failed to update config' };
  }
}