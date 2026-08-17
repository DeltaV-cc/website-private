'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { withBasePath } from '@/lib/site';

/**
 * A redirect that works on a static host.
 *
 * `output: "export"` has no server, so `next.config` redirects never run. On
 * Cloudflare Pages the `_redirects` file handles this with a real 301 and this
 * page is never reached; everywhere else (GitHub Pages, a local `serve`, an
 * archived copy) the exported HTML is all we have, so it carries a meta
 * refresh, a client-side replace, and a plain link if both are blocked.
 *
 * `router.replace` rather than `push` so the dead URL does not sit in the back
 * stack and bounce the reader on every Back press.
 */
export default function LegacyRedirect({ to, label }: { to: string; label: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${withBasePath(to)}`} />
      <main className="page-container py-32 text-center">
        <p className="text-sm text-[var(--text-tertiary)]">
          This course moved. Taking you to {label}…
        </p>
        <Link href={to} className="button-primary mt-6 inline-flex">
          Continue to {label}
        </Link>
      </main>
    </>
  );
}
