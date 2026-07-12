/* ================================================================
   IntelHub — Crypto Leaders (Web3 tab)
   ================================================================ */
'use client';

import { Item } from '../types';

const CRYPTO_LEADERS = [
  { name: 'Vitalik Buterin', handle: 'VitalikButerin', org: 'Ethereum', role: 'Co-founder' },
  { name: 'Polymutex', handle: 'polymutex', org: 'DeFi Research', role: 'Researcher' },
  { name: 'L2Beat', handle: 'l2beat', org: 'L2Beat', role: 'L2 Analytics' },
  { name: 'Artemis', handle: 'artemis__', org: 'Artemis', role: 'Crypto Data' },
  { name: 'Alexis Roussel', handle: 'AlexisRoussel', org: 'Bity/NYM', role: 'Crypto Privacy' },
  { name: 'Cynthia Lummis', handle: 'SenLummis', org: 'US Senate', role: 'Bitcoin Advocate' },
  { name: 'Julian Assange', handle: 'JulianAssange', org: 'WikiLeaks', role: 'Publisher' },
  { name: 'Edward Snowden', handle: 'Snowden', org: 'Freedom Press', role: 'Whistleblower' },
  { name: 'Pascal Caversaccio', handle: 'pcaversaccio', org: 'Security Research', role: 'Auditor' },
  { name: 'Dinosn', handle: 'Dinosn', org: 'Infosec Intel', role: 'Curator' },
  { name: 'Michael Burry', handle: 'michaeljburry', org: 'Scion Asset Mgmt', role: 'Macro Investor' },
  { name: 'Hypernative Labs', handle: 'HypernativeLabs', org: 'Web3 Security', role: 'Threat Intel' },
];

export default function CryptoLeaders({ items, ts }: { items: Item[]; ts: (iso: string) => string }) {
  // Only show leaders who have actual posts in the feed
  const activeLeaders = CRYPTO_LEADERS
    .map(p => {
      const posts = items.filter((it: any) =>
        (it.source || '').toLowerCase().includes(p.handle.toLowerCase())
      );
      return { ...p, posts, latest: posts[0] || null };
    })
    .filter(p => p.posts.length > 0)
    .sort((a, b) => b.posts.length - a.posts.length);

  if (activeLeaders.length === 0) return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-3 py-2 border-b border-[#222] bg-gradient-to-r from-[#111] via-[#111] to-white/[0.02]">
        <span className="text-xs text-purple-400 uppercase tracking-[.1em] font-bold">𝕏 Crypto Leaders</span>
      </div>
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <svg className="w-5 h-5 text-purple-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span className="text-[#ededed]/15 text-xs">No crypto leader signals in current feed window</span>
      </div>
    </div>
  );
  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-3 py-2 border-b border-[#222] bg-gradient-to-r from-[#111] via-[#111] to-white/[0.02]">
        <span className="text-xs text-purple-400 uppercase tracking-[.1em] font-bold">𝕏 Crypto Leaders</span>
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
