import type { Metadata } from 'next';
import { contentIndex, type ContentEntry } from '@/app/data/content-index';
import { SITE_URL } from '@/lib/site';

/** Pretty "N min read" from minutes or a free-form string. */
export function formatReadingTime(input?: string | number | null): string | undefined {
  if (input == null || input === '') return undefined;
  if (typeof input === 'number') {
    const n = Math.max(1, Math.round(input));
    return `${n} min read`;
  }
  const raw = input.trim();
  const m = raw.match(/(\d+)\s*min/i);
  if (m) return `${m[1]} min read`;
  return raw;
}

/** Normalize ISO `YYYY-MM-DD` or mixed dates to `Month D, YYYY` when possible. */
export function formatDisplayDate(input?: string | null): string {
  if (!input) return '';
  const raw = input.trim();
  // Already pretty: "July 1, 2026" or "June 2026"
  if (/^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/.test(raw) || /^[A-Za-z]+\s+\d{4}$/.test(raw)) {
    return raw;
  }
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const d = new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  }
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  return raw;
}

export function getContentEntry(id: string): ContentEntry | undefined {
  return contentIndex.find((e) => e.id === id);
}

/**
 * Build Next.js Metadata for a blog/tutorial page from content-index.
 * Falls back to the provided title/description when the entry is missing.
 */
export function contentMetadata(
  id: string,
  overrides?: { title?: string; description?: string }
): Metadata {
  const entry = getContentEntry(id);
  const title = overrides?.title || entry?.title || 'Delta V';
  const description = overrides?.description || entry?.excerpt || '';
  const path = entry?.href || '/';
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  return {
    title: `${title} — Delta V`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Delta V',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
