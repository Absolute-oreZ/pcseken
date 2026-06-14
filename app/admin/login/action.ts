'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';
import { createSession } from '@/lib/auth';

export async function loginAction(
  formData: FormData
): Promise<void> {
  const username = String(
    formData.get('username') ?? ''
  );

  const password = String(
    formData.get('password') ?? ''
  );

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) {
    redirect('/admin/login?error=1');
  }

  const valid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!valid) {
    redirect('/admin/login?error=1');
  }

  await createSession(user.id);

  redirect('/admin');
}