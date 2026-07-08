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
  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-3 py-2 border-b border-[#222] bg-[#111]">
        <span className="text-[11px] text-purple-400 uppercase tracking-[.1em] font-bold">𝕏 Crypto Leaders</span>
      </div>
      <div className="divide-y divide-white/[0.02] max-h-[500px] overflow-y-auto">
        {CRYPTO_LEADERS.map((p, i) => {
          const latest = items.find((it: any) =>
            (it.source || '').toLowerCase().includes(p.handle.toLowerCase())
          );
          return (
            <div key={i} className="px-3 py-2 hover:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-0.5">
                <a href={`https://x.com/${p.handle}`} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] font-medium text-[#ededed]/75 hover:text-white truncate">
                  {p.name}
                </a>
                <span className="text-[8px] text-[#ededed]/25">{p.org} · {p.role}</span>
              </div>
              {latest ? (
                <a href={latest.url || `https://x.com/${p.handle}`} target="_blank" rel="noopener noreferrer"
                  className="text-[9px] text-[#ededed]/40 hover:text-[#ededed]/60 line-clamp-2 leading-relaxed">
                  {(latest.title || '').replace(/https?:\/\/\S+/g, '').trim().slice(0, 140)}
                </a>
              ) : (
                <div className="text-[9px] text-[#ededed]/10 italic">no recent tweets in feed</div>
              )}
              {latest && <div className="text-[8px] text-[#ededed]/15 mt-0.5 tabular-nums">{ts(latest.published_at)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
