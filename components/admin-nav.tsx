'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={[
        'rounded-md px-3 py-2 text-sm transition',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted',
      ].join(' ')}
    >
      {label}
    </Link>
  );
}

export function AdminNav() {
  return (
    <nav className="flex items-center gap-2">
      <NavItem
        href="/admin/config"
        label="App Config"
      />

      <NavItem
        href="/admin/products"
        label="Products"
      />
    </nav>
  );
}