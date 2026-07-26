/**
 * Site deploy constants — re-exported from site.config.json.
 * Change paths/URLs there; do not scatter hard-coded basePath strings.
 */
import site from '../site.config.json';

/** GitHub Pages project base path (e.g. `/website-private`). Empty string for custom domain root. */
export const BASE_PATH: string = site.basePath;

/** Canonical public origin including base path (no trailing slash). */
export const SITE_URL: string = site.siteUrl.replace(/\/$/, '');

/** GitHub repository URL. */
export const REPO_URL: string = site.repoUrl;

/**
 * Prefix a root-relative public path with basePath.
 * Pass paths like `/data/foo.json` or `data/foo.json`.
 * Leaves absolute http(s) URLs and already-prefixed paths alone.
 */
export function withBasePath(path: string): string {
  if (!path) return BASE_PATH || '/';
  if (/^https?:\/\//i.test(path) || path.startsWith('//')) return path;
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!BASE_PATH) return normalized;
  return `${BASE_PATH}${normalized}`;
}

/** Absolute URL under the public site origin. */
export function siteAssetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const withBase = withBasePath(path);
  if (/^https?:\/\//i.test(withBase)) return withBase;
  // SITE_URL already includes basePath; avoid double-prefix.
  if (BASE_PATH && withBase.startsWith(BASE_PATH)) {
    return `${SITE_URL}${withBase.slice(BASE_PATH.length)}`;
  }
  return `${SITE_URL}${withBase.startsWith('/') ? withBase : `/${withBase}`}`;
}
