import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { getSession } from '@/lib/auth';

import { logoutAction } from './action';
import { Button } from '@/components/ui/button';
import { AdminNav } from '@/components/admin-nav';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const settings =
    await db.query.webappContents.findFirst();

  const shopName =
    settings?.shopName || 'PCSeken';

  const logo =
    settings?.logoImage ||
    '/images/pcseke_logo.png';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt={shopName}
                width={40}
                height={40}
                unoptimized={logo.startsWith('data:')}
              />
            </div>

            <AdminNav />
          </div>

          <form action={logoutAction}>
            <Button
              type="submit"
              className="rounded-md border px-4 py-2 text-sm"
            >
              Logout
            </Button>
          </form>
        </div>
      </header>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}