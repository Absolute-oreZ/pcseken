import Image from 'next/image';

import { loginAction } from './action';
import { Button } from '@/components/ui/button';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-background shadow-sm">
          <div className="flex flex-col items-center px-8 pt-10 pb-6">
            <div className="relative mb-4 h-20 w-20">
              <Image
                src="/images/pcseken_logo.png"
                alt="PCSeken"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h1 className="text-2xl font-bold">
              PCSeken Admin
            </h1>

            <p className="mt-2 text-center text-sm text-muted-foreground">
              Sign in to manage products and
              website content.
            </p>
          </div>

          <div className="px-8 pb-8">
            {params.error && (
              <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                Invalid username or password.
              </div>
            )}

            <form
              action={loginAction}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Username
                </label>

                <input
                  name="username"
                  required
                  autoComplete="username"
                  className="w-full rounded-lg border bg-background px-3 py-2 outline-none transition focus:ring-2 focus:ring-primary"
                  placeholder="Enter username"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Password
                </label>

                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border bg-background px-3 py-2 outline-none transition focus:ring-2 focus:ring-primary"
                  placeholder="Enter password"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          PCSeken Admin Panel
        </p>
      </div>
    </div>
  );
}