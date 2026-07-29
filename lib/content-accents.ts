/**
 * Single accent map for blog/tutorial listings and BlogPostLayout badges.
 * Domain accents are brand; format accents are secondary type chips.
 * Multi-domain posts (AI × OpSec, Web3 × OpSec, …) get dual-color gradients.
 */

import type { CSSProperties } from 'react';

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
  Crypto: 'var(--accent-orange)',
  Security: 'var(--accent-red)',
};

/** Preferred order when picking dual categories for gradients. */
export const DOMAIN_PRIORITY = [
  'AI',
  'Web3',
  'OpSec',
  'Hardware',
  'Weekly Delta Financial Brief',
  'Forge',
  'Macro',
  'Research',
] as const;

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

/** Map free-form tags → primary domain buckets. */
const TAG_TO_DOMAIN: Record<string, string> = {
  ai: 'AI',
  agents: 'AI',
  models: 'AI',
  'local ai': 'AI',
  inference: 'AI',
  llm: 'AI',
  rag: 'AI',
  vision: 'AI',
  safety: 'AI',
  architecture: 'AI',
  web3: 'Web3',
  defi: 'Web3',
  crypto: 'Web3',
  ethereum: 'Web3',
  stablecoins: 'Web3',
  governance: 'Web3',
  tradfi: 'Web3',
  institutional: 'Web3',
  markets: 'Web3',
  opsec: 'OpSec',
  security: 'OpSec',
  infosec: 'OpSec',
  'incident response': 'OpSec',
  github: 'OpSec',
  'ci/cd': 'OpSec',
  tools: 'OpSec',
  transparency: 'OpSec',
  hardware: 'Hardware',
  chips: 'Hardware',
  robotics: 'Hardware',
  biometrics: 'Hardware',
  health: 'Hardware',
  forge: 'Forge',
  'weekly delta financial brief': 'Weekly Delta Financial Brief',
  'defi weekly': 'Weekly Delta Financial Brief',
};

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
  const mapped = TAG_TO_DOMAIN[lower];
  if (mapped && DOMAIN_ACCENT[mapped]) return DOMAIN_ACCENT[mapped];
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

function normalizeDomainLabel(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  if (DOMAIN_ACCENT[t]) return t;
  const lower = t.toLowerCase();
  const exact = Object.keys(DOMAIN_ACCENT).find((k) => k.toLowerCase() === lower);
  if (exact) return exact;
  if (TAG_TO_DOMAIN[lower]) return TAG_TO_DOMAIN[lower];
  for (const [key, domain] of Object.entries(TAG_TO_DOMAIN)) {
    if (lower.includes(key)) return domain;
  }
  return null;
}

/**
 * Pick up to 2 domain categories for a content entry.
 * Primary = domain field; second = first other domain found in tags (priority order).
 * e.g. domain OpSec + tags AI → ['OpSec', 'AI'] for AI × infosec gradient.
 */
export function resolveCategoryPair(
  domain: string,
  tags: string[] = []
): { domains: string[]; accents: string[] } {
  const found: string[] = [];
  const add = (label: string | null | undefined) => {
    if (!label) return;
    const d = normalizeDomainLabel(label);
    if (!d || found.includes(d)) return;
    found.push(d);
  };

  add(domain);
  const tagDomains = new Set<string>();
  for (const tag of tags) {
    const d = normalizeDomainLabel(tag);
    if (d) tagDomains.add(d);
  }
  for (const p of DOMAIN_PRIORITY) {
    if (tagDomains.has(p)) add(p);
    if (found.length >= 2) break;
  }
  for (const d of tagDomains) {
    add(d);
    if (found.length >= 2) break;
  }

  if (found.length === 0) found.push('AI');
  const accents = found.map((d) => domainAccent(d));
  return { domains: found, accents };
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
  return domainTextClass(domain);
}

/** Inline style for a title: solid color or dual-domain gradient. */
export function categoryTitleStyle(accents: string[]): CSSProperties {
  const a = accents[0] || 'var(--accent-cyan)';
  const b = accents[1];
  if (b && b !== a) {
    return {
      backgroundImage: `linear-gradient(105deg, ${a} 0%, ${b} 100%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      WebkitTextFillColor: 'transparent',
    };
  }
  return { color: a };
}

/** Card chrome: border tint + CSS vars for gradient left bar. */
export function categoryCardStyle(accents: string[]): CSSProperties {
  const a = accents[0] || 'var(--accent-cyan)';
  const b = accents[1] || a;
  const dual = Boolean(accents[1] && accents[1] !== accents[0]);
  const bar = dual ? `linear-gradient(180deg, ${a} 0%, ${b} 100%)` : a;
  return {
    borderColor: `color-mix(in srgb, ${a} 40%, var(--border-default))`,
    // CSS custom props read by .listing-card-accent::before
    ['--card-accent-a' as string]: a,
    ['--card-accent-b' as string]: b,
    ['--card-bar' as string]: bar,
  };
}

/** Human label for dual category chips: "AI × OpSec". */
export function categoryPairLabel(domains: string[]): string {
  if (domains.length >= 2) return `${domains[0]} × ${domains[1]}`;
  return domains[0] || 'AI';
}

/** Border/bg chip classes for format badges on listings. */
export function formatChipClass(format: string): string {
  const a = formatAccent(format);
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
  if (a.includes('orange')) {
    return 'border-[var(--accent-orange)]/20 bg-[var(--accent-orange)]/8 text-[var(--accent-orange)]';
  }
  if (a.includes('green')) {
    return 'border-[var(--accent-green)]/20 bg-[var(--accent-green)]/8 text-[var(--accent-green)]';
  }
  return 'border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]';
}
