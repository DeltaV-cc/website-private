/**
 * Theme preference: what the reader chose, not what they see.
 *
 * "system" is a preference, never a rendered state — it is resolved against
 * `prefers-color-scheme` and only the resolved value ("light" / "dark") is
 * written to `data-theme` on <html>. CSS therefore never needs a media query,
 * and a reader on "system" follows their OS switching mid-session.
 */
export type ThemeChoice = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'dv-theme';

export function isThemeChoice(value: unknown): value is ThemeChoice {
  return value === 'system' || value === 'light' || value === 'dark';
}

/**
 * Runs before first paint, inlined in <head>. Without it the dark tokens (the
 * `:root` defaults) would paint once and then flip, so a reader who prefers
 * light gets a full-page black flash on every navigation.
 *
 * Kept as a single expression with no dependencies on purpose: it has to be
 * cheap enough to be render-blocking, and it cannot import anything.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var c=(s==='light'||s==='dark'||s==='system')?s:'system';var r=c==='system'?(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):c;document.documentElement.setAttribute('data-theme',r);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
