/* ================================================================
   IntelHub — Crypto Leaders (Web3 tab)
   ================================================================ */
'use client';

import { Item } from '../types';

// Full hedge roster — keep quiet handles so posts are picked up when they fire.
// `aliases` match alternate source labels (e.g. alexis_roussel vs AlexisRoussel).
const CRYPTO_LEADERS = [
  { name: 'Vitalik Buterin', handle: 'VitalikButerin', org: 'Ethereum', role: 'Co-founder' },
  { name: 'Polymutex', handle: 'polymutex', org: 'DeFi Research', role: 'Researcher' },
  { name: 'L2Beat', handle: 'l2beat', org: 'L2Beat', role: 'L2 Analytics' },
  { name: 'Artemis', handle: 'artemis', org: 'Artemis', role: 'Crypto + Equity Data' },
  { name: 'Alexis Roussel', handle: 'alexis_roussel', org: 'Bity/NYM', role: 'Crypto Privacy', aliases: ['AlexisRoussel'] },
  { name: 'Cynthia Lummis', handle: 'SenLummis', org: 'US Senate', role: 'Bitcoin Advocate' },
  { name: 'Julian Assange', handle: 'JulianAssange', org: 'WikiLeaks', role: 'Publisher' }, // feed hedge; nitter may 404
  { name: 'Edward Snowden', handle: 'Snowden', org: 'Freedom Press', role: 'Whistleblower' },
  { name: 'Pascal Caversaccio', handle: 'pcaversaccio', org: 'Security Research', role: 'Auditor' },
  { name: 'Dinosn', handle: 'Dinosn', org: 'Infosec Intel', role: 'Curator' },
  { name: 'Michael Burry', handle: 'michaeljburry', org: 'Scion Asset Mgmt', role: 'Macro Investor' },
  { name: 'Hypernative Labs', handle: 'HypernativeLabs', org: 'Web3 Security', role: 'Threat Intel' },
  { name: '0xngmi', handle: '0xngmi', org: 'DefiLlama', role: 'Researcher' },
  { name: 'Lookonchain', handle: 'lookonchain', org: 'On-chain Intel', role: 'Analyst' },
  { name: 'ZachXBT', handle: 'zachxbt', org: 'OSINT', role: 'Investigator' },
  { name: 'Messari', handle: 'MessariCrypto', org: 'Messari', role: 'Research' },
];

export default function CryptoLeaders({ items, ts }: { items: Item[]; ts: (iso: string) => string }) {
  // Match posts by handle or aliases (keep full roster; only *display* those with posts)
  const matchKeys = (p: typeof CRYPTO_LEADERS[number]) =>
    [p.handle, ...((p as any).aliases || [])].map((h: string) => h.toLowerCase());

  const activeLeaders = CRYPTO_LEADERS
    .map(p => {
      const keys = matchKeys(p);
      const posts = items.filter((it: any) => {
        const src = (it.source || '').toLowerCase();
        return keys.some((k: string) => src.includes(k));
      });
      return { ...p, posts, latest: posts[0] || null };
    })
    .filter(p => p.posts.length > 0)
    .sort((a, b) => b.posts.length - a.posts.length);
  const watchingQuiet = CRYPTO_LEADERS.length - activeLeaders.length;

  if (activeLeaders.length === 0) return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] bg-gradient-to-r from-[var(--accent-orange)]/[0.06] to-transparent flex items-center justify-between">
        <span className="text-xs text-[var(--accent-orange)] uppercase tracking-[1.5px] font-bold">𝕏 Crypto Leaders</span>
        <span className="text-[10px] text-[var(--text-muted)]">watching {CRYPTO_LEADERS.length}</span>
      </div>
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <span className="text-[var(--text-disabled)] text-xs">No posts in the current 7d window · roster kept as hedge</span>
      </div>
    </div>
  );
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] bg-gradient-to-r from-[var(--accent-orange)]/[0.06] to-transparent flex items-center justify-between">
        <span className="text-xs text-[var(--accent-orange)] uppercase tracking-[1.5px] font-bold">𝕏 Crypto Leaders</span>
        <span className="text-[10px] text-[var(--text-muted)]">
          {activeLeaders.length} live{watchingQuiet > 0 ? ` · ${watchingQuiet} watching` : ''}
        </span>
      </div>
      <div className="divide-y divide-white/[0.02] max-h-[500px] overflow-y-auto">
        {activeLeaders.map((p, i) => (
            <div key={i} className="px-3 py-2 hover:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-0.5">
                <a href={`https://x.com/${p.handle}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-medium text-[#ededed]/75 hover:text-white truncate">
                  {p.name}
                </a>
                <span className="text-[10px] text-[#ededed]/25">{p.org} · {p.role}</span>
              </div>
              {p.latest ? (
                <a href={p.latest.url || `https://x.com/${p.handle}`} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-[#ededed]/40 hover:text-[#ededed]/60 line-clamp-2 leading-relaxed">
                  {(p.latest.title || '').replace(/https?:\/\/\S+/g, '').trim().slice(0, 140)}
                </a>
              ) : (
                <div className="text-[10px] text-[#ededed]/10 italic">no recent tweets in feed</div>
              )}
              {p.latest && <div className="text-[10px] text-[#ededed]/15 mt-0.5 tabular-nums">{ts(p.latest.published_at)}</div>}
            </div>
        ))}
      </div>
    </div>
  );
}
