'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Smart "back" control.
 * - Renders a real Next <Link> so the href is always basePath-correct
 *   (works on middle-click / no-JS / SEO, never 404s on `/blog` vs `/website-private/blog`).
 * - On a normal click, if the user arrived from within the site, it goes to the
 *   actual previous page (router.back()); otherwise it follows `fallback`
 *   (a contextual parent route) so "back" never lands off-site or on the wrong page.
 */
export default function BackLink({
  fallback = '/',
  label = 'Back',
  className = 'inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors group',
}: {
  fallback?: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    // Respect modifier clicks (open in new tab, etc.) — let the browser handle them.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const cameFromSite =
      typeof document !== 'undefined' &&
      document.referrer &&
      document.referrer.startsWith(window.location.origin);

    if (cameFromSite && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
    // Otherwise let <Link> navigate to the basePath-correct `fallback`.
  };

  return (
    <Link href={fallback} onClick={handleClick} className={className}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="transition-transform group-hover:-translate-x-0.5"
      >
        <path
          d="M10 7H3M6 3l-4 4 4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </Link>
  );
}
