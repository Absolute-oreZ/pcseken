import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET
);

const COOKIE_NAME = 'admin_session';

export async function createSession(userId: number) {
  const token = await new SignJWT({
    userId,
  })
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const result = await jwtVerify(
      token,
      secret
    );

    return result.payload;
  } catch {
    return null;
  }
}