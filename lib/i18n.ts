/**
 * Locales for the static export.
 *
 * English stays at the root (`/contact/`) and French lives under a prefix
 * (`/fr/contact/`). Next's built-in i18n routing does not work with
 * `output: "export"`, and a `[lang]` segment would have moved every English
 * URL to `/en/…` — which a static host cannot redirect away from. Root-plus-
 * prefix keeps existing links working and costs one thin route file per
 * translated page.
 *
 * Only pages listed in TRANSLATED have a French counterpart; the language
 * toggle hides itself elsewhere rather than linking to a 404.
 */
export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Root-relative paths (no locale prefix) that exist in French. */
export const TRANSLATED = ['/contact/'] as const;

export function isTranslated(path: string): boolean {
  const clean = path.replace(/^\/fr/, '') || '/';
  return (TRANSLATED as readonly string[]).includes(clean);
}

/** Strip the locale prefix to get the canonical (English) path. */
export function toBasePath(path: string): string {
  return path.replace(/^\/fr(?=\/|$)/, '') || '/';
}

/** Build the URL for the same page in another locale. */
export function localePath(path: string, locale: Locale): string {
  const base = toBasePath(path);
  if (locale === DEFAULT_LOCALE) return base;
  return `/fr${base === '/' ? '/' : base}`;
}

export function localeFromPath(path: string): Locale {
  return path === '/fr' || path.startsWith('/fr/') ? 'fr' : 'en';
}
