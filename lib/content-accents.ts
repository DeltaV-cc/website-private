/**
 * Single accent map for blog/tutorial listings and BlogPostLayout badges.
 * Domain accents are brand; format accents are secondary type chips.
 */

export const DOMAIN_ACCENT: Record<string, string> = {
  AI: 'var(--accent-cyan)',
  Web3: 'var(--accent-orange)',
  OpSec: 'var(--accent-red)',
  Hardware: 'var(--accent-green)',
  'Weekly Delta Financial Brief': 'var(--accent-gold)',
  'DeFi Weekly': 'var(--accent-gold)',
  Forge: 'var(--accent-purple)',
  Macro: 'var(--accent-orange)',
  Research: 'var(--accent-green)',
  Infosec: 'var(--accent-red)',
  Crypto: 'var(--accent-gold)',
};

export const FORMAT_ACCENT: Record<string, string> = {
  'Deep Dive': 'var(--accent-purple)',
  Thought: 'var(--accent-amber)',
  Tutorial: 'var(--accent-cyan)',
  Dashboard: 'var(--accent-gold)',
  Tool: 'var(--accent-cyan)',
  Update: 'var(--accent-amber)',
  Course: 'var(--accent-purple)',
};

const FORMAT_KEYS = new Set(Object.keys(FORMAT_ACCENT).map((k) => k.toLowerCase()));

/** Resolve a domain or free-form label to a CSS accent token. */
export function domainAccent(label: string): string {
  const raw = label.trim();
  if (!raw) return 'var(--accent-cyan)';
  if (DOMAIN_ACCENT[raw]) return DOMAIN_ACCENT[raw];
  const lower = raw.toLowerCase();
  const hit = Object.entries(DOMAIN_ACCENT).find(([k]) => k.toLowerCase() === lower);
  if (hit) return hit[1];
  if (lower.includes('weekly') || lower.includes('defi weekly') || lower === 'the signal') {
    return 'var(--accent-gold)';
  }
  return 'var(--accent-cyan)';
}

/** Resolve a content format/type label to a CSS accent token. */
export function formatAccent(label: string): string {
  const raw = label.trim();
  if (!raw) return 'var(--accent-cyan)';
  if (FORMAT_ACCENT[raw]) return FORMAT_ACCENT[raw];
  const lower = raw.toLowerCase();
  const hit = Object.entries(FORMAT_ACCENT).find(([k]) => k.toLowerCase() === lower);
  if (hit) return hit[1];
  return 'var(--accent-cyan)';
}

/** True when the label is a known format chip (vs a domain). */
export function isFormatLabel(label: string): boolean {
  return FORMAT_KEYS.has(label.trim().toLowerCase());
}

/** Tailwind-friendly text class for domain labels on listings. */
export function domainTextClass(domain: string): string {
  const a = domainAccent(domain);
  if (a.includes('cyan')) return 'text-[var(--accent-cyan)]';
  if (a.includes('orange')) return 'text-[var(--accent-orange)]';
  if (a.includes('red')) return 'text-[var(--accent-red)]';
  if (a.includes('gold')) return 'text-[var(--accent-gold)]';
  if (a.includes('green')) return 'text-[var(--accent-green)]';
  if (a.includes('purple')) return 'text-[var(--accent-purple)]';
  if (a.includes('amber')) return 'text-[var(--accent-amber)]';
  return 'text-[var(--accent-cyan)]';
}

export function domainTitleClass(domain: string): string {
  return `${domainTextClass(domain)}/90`;
}

/** Border/bg chip classes for format badges on listings. */
export function formatChipClass(format: string): string {
  const a = formatAccent(format);
  // Map CSS var to the Tailwind arbitrary pattern used across the site.
  if (a.includes('purple')) {
    return 'border-[var(--accent-purple)]/20 bg-[var(--accent-purple)]/8 text-[var(--accent-purple)]';
  }
  if (a.includes('amber')) {
    return 'border-[var(--accent-amber)]/20 bg-[var(--accent-amber)]/8 text-[var(--accent-amber)]';
  }
  if (a.includes('gold')) {
    return 'border-[var(--accent-gold)]/20 bg-[var(--accent-gold)]/8 text-[var(--accent-gold)]';
  }
  if (a.includes('red')) {
    return 'border-[var(--accent-red)]/20 bg-[var(--accent-red)]/8 text-[var(--accent-red)]';
  }
  return 'border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]';
}
