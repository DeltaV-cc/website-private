/* ================================================================
   IntelHub — Cypherpunk / EVM voices (Web3 bottom box)
   Prioritizes X posts from core EVM + cypherpunk handles over
   generic crypto news RSS.
   ================================================================ */
'use client';

import { useMemo } from 'react';

/**
 * Core cypherpunk + EVM builder/researcher handles.
 * Keep quiet handles as hedges — when they post, they surface here.
 * Matching is case-insensitive against item.source (e.g. "X: @VitalikButerin").
 */
export const CYPHERPUNK_HANDLES: { handle: string; role: string }[] = [
  // Ethos / privacy / classic cypherpunk
  { handle: 'Snowden', role: 'privacy' },
  { handle: 'alexis_roussel', role: 'privacy' },
  { handle: 'pcaversaccio', role: 'security' },
  { handle: 'Dinosn', role: 'security' },
  // Ethereum core & research
  { handle: 'VitalikButerin', role: 'eth-core' },
  { handle: 'TimBeiko', role: 'eth-core' },
  { handle: 'nicksdjohnson', role: 'eth-core' },
  { handle: 'drakefjustin', role: 'eth-core' },
  { handle: 'Souptacular', role: 'eth-core' },
  { handle: 'peter_szilagyi', role: 'eth-core' },
  { handle: 'karalabe', role: 'eth-core' },
  { handle: 'LefterisJP', role: 'eth-core' },
  { handle: 'EthereumJoseph', role: 'eth-core' },
  // DeFi / EVM research (protocol-native)
  { handle: '0xngmi', role: 'defi-research' },
  { handle: 'polymutex', role: 'defi-research' },
  { handle: 'nero_eth', role: 'defi-research' },
  { handle: 'gakonst', role: 'defi-research' },
  { handle: 'bantg', role: 'defi-research' },
  { handle: 'hasufl', role: 'defi-research' },
  { handle: 'sassal0x', role: 'defi-research' },
  { handle: 'libevm', role: 'defi-research' },
  // OSINT / integrity (cypherpunk-adjacent)
  { handle: 'zachxbt', role: 'osint' },
  { handle: 'deficrimewatch', role: 'osint' },
  { handle: 'HypernativeLabs', role: 'security' },
  // Public goods / L2 integrity
  { handle: 'l2beat', role: 'public-goods' },
  { handle: 'BackTheBunny', role: 'public-goods' },
];

const HANDLE_SET = new Set(CYPHERPUNK_HANDLES.map((h) => h.handle.toLowerCase()));

function isXSource(source: string): boolean {
  const s = (source || '').toLowerCase();
  return s.startsWith('x:') || s.includes('nitter') || s.includes('twitter');
}

function extractHandle(source: string): string {
  const m = (source || '').match(/@([A-Za-z0-9_]+)/);
  return (m?.[1] || '').toLowerCase();
}

function isCypherpunkItem(it: { source?: string }): boolean {
  if (!isXSource(it.source || '')) return false;
  const h = extractHandle(it.source || '');
  if (h && HANDLE_SET.has(h)) return true;
  // also match bare handle substring (aliases)
  const src = (it.source || '').toLowerCase();
  return CYPHERPUNK_HANDLES.some((c) => src.includes(c.handle.toLowerCase()));
}

export default function CypherpunkFeed({
  items,
  ago,
}: {
  items: any[];
  ago: (iso: string) => string;
}) {
  const { posts, watching } = useMemo(() => {
    const matched = (items || [])
      .filter(isCypherpunkItem)
      .sort((a, b) => {
        const ta = new Date(a.published_at || a.pubDate || 0).getTime();
        const tb = new Date(b.published_at || b.pubDate || 0).getTime();
        return tb - ta;
      })
      .slice(0, 20);

    // How many roster handles have zero posts in window
    const live = new Set(matched.map((it) => extractHandle(it.source || '')).filter(Boolean));
    const watchingN = CYPHERPUNK_HANDLES.filter((h) => !live.has(h.handle.toLowerCase())).length;
    return { posts: matched, watching: watchingN };
  }, [items]);

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden border-l-2 border-l-yellow-500/40">
      <div className="px-4 py-2.5 border-b border-[var(--border-default)] bg-gradient-to-r from-yellow-500/[0.06] to-transparent flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-yellow-400">𝕏 Cypherpunk · EVM</span>
          <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">
            core builders · privacy · research
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-[var(--text-muted)] tabular-nums shrink-0">
          {posts.length} live
          {watching > 0 ? ` · ${watching} watching` : ''}
        </span>
      </div>
      <div className="divide-y divide-white/[0.02] max-h-[320px] overflow-y-auto scrollbar-hide">
        {posts.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-xs text-[var(--text-disabled)]">
              No cypherpunk posts in the current window · roster of {CYPHERPUNK_HANDLES.length} handles kept as hedge
            </p>
          </div>
        ) : (
          posts.map((it: any, j: number) => {
            const handle = extractHandle(it.source || '') || it.source;
            return (
              <a
                key={j}
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={it.title}
                className="block px-4 py-2.5 hover:bg-white/[0.03] group"
              >
                <div className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] line-clamp-2 leading-snug">
                  {it.title}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--text-muted)]">
                  <span className="text-yellow-500/80 font-medium truncate max-w-[140px]">
                    @{handle}
                  </span>
                  <span className="ml-auto tabular-nums shrink-0">{ago(it.published_at || it.pubDate)}</span>
                </div>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
}
