/* ================================================================
   IntelHub — Web3 Dashboard tab
   ================================================================ */
'use client';

import { BarChart, CategoryBox } from './Shared';

export default function Web3Dashboard({
  dd, catBoxes, TC, ago, fmt, fmtN, artemis,
}: {
  dd: any; catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; fmt: (n: number) => string; fmtN: (n: number) => string;
  artemis?: any[];
}) {
  const web3Cats = catBoxes.filter((c: any) => ['crypto'].includes(c.id));
  const totalVol = dd?.totalVolume24h || 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── TVL by Chain ── */}
        <div className="lg:col-span-1 rounded-2xl border border-[#222] bg-white/[0.01] p-5">
          <div className="text-sm text-purple-400 uppercase tracking-[.15em] font-bold mb-4">TVL by Chain</div>
          {(dd?.tvl || []).length > 0 ? (
            <BarChart
              data={(dd.tvl || []).slice(0, 12).map((c: any) => ({ name: c.name, value: c.tvl }))}
              color="linear-gradient(90deg,#a855f7,#6366f1,#3b82f6)"
            />
          ) : (
            <div className="text-[#ededed]/15 text-xs italic py-4 text-center">Loading...</div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* ── Volume + Stablecoins ── */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Volume */}
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5">
              <div className="text-sm text-cyan-400 uppercase tracking-[.15em] font-bold mb-2">Total Volume</div>
              <div className="text-2xl font-bold tabular-nums text-[#ededed]/80">{fmt(totalVol)}</div>
              <div className="text-xs text-[#ededed]/20 mt-1">24h DEX</div>
              <div className="mt-3 space-y-1">
                {(dd?.volume || []).slice(0, 5).map((v: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-[#ededed]/40 truncate">{v.name}</span>
                    <span className="text-[#ededed]/60 tabular-nums">{fmt(v.volume24h)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stablecoins */}
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5">
              <div className="text-sm text-emerald-400 uppercase tracking-[.15em] font-bold mb-3">Stablecoins</div>
              <div className="space-y-2">
                {(dd?.stablecoins || []).length > 0 ? (
                  (dd.stablecoins as any[]).map((s: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-sm text-[#ededed]/50">{s.name}</span>
                      <span className="text-sm text-[#ededed]/70 tabular-nums">{fmt(s.circulating)}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[#ededed]/15 text-xs italic">Loading...</div>
                )}
              </div>
            </div>
          </div>

          {/* ── Fees + Dominance ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5">
              <div className="text-sm text-amber-400 uppercase tracking-[.15em] font-bold mb-3">Fees (24h)</div>
              <div className="space-y-2">
                {(dd?.fees || []).length > 0 ? (
                  (dd.fees as any[]).slice(0, 6).map((f: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-sm text-[#ededed]/50 truncate">{f.name}</span>
                      <span className="text-sm text-[#ededed]/70 tabular-nums">{fmt(f.fees24h)}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[#ededed]/15 text-xs italic">Loading...</div>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5">
              <div className="text-sm text-violet-400 uppercase tracking-[.15em] font-bold mb-3">Chain Dominance</div>
              <div className="space-y-2">
                {(dd?.dominance || []).length > 0 ? (
                  (dd.dominance as any[]).map((d: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-[#ededed]/50">{d.name}</span>
                      <span className="text-[#ededed]/70 tabular-nums">{d.pct}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[#ededed]/15 text-xs italic">Loading...</div>
                )}
              </div>
            </div>
          </div>

          {/* ── Polymarket ── */}
          {dd?.polymarket?.length > 0 && (
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#222] bg-[#111]">
                <div className="text-sm text-pink-400 uppercase tracking-[.15em] font-bold">Polymarket</div>
              </div>
              <div className="grid grid-cols-[1fr_80px_80px] gap-3 px-5 py-2.5 border-b border-white/[0.03] bg-[#111] text-xs text-[#ededed]/20 uppercase tracking-wider font-semibold">
                <div>Market</div>
                <div className="text-right">Vol</div>
                <div className="text-right">Liq</div>
              </div>
              {dd.polymarket.slice(0, 5).map((m: any, i: number) => (
                <a
                  key={i}
                  href={`https://polymarket.com/event/${m.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`grid grid-cols-[1fr_80px_80px] gap-3 px-5 py-2.5 border-b border-[#222] last:border-0 hover:bg-[#111] ${i % 2 === 1 ? 'bg-[#0a0a0a]' : ''}`}
                >
                  <div className="text-sm text-[#ededed]/60 hover:text-[#ededed]/80 truncate">{m.title}</div>
                  <div className="text-xs text-right text-[#ededed]/30 tabular-nums">{fmtN(m.volume)}</div>
                  <div className="text-xs text-right text-[#ededed]/20 tabular-nums">{fmtN(m.liquidity)}</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Artemis Research ── */}
      {artemis && artemis.length > 0 && (
        <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#222] bg-[#111] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span className="text-sm text-emerald-400 uppercase tracking-[.15em] font-bold">Artemis Crypto Research</span>
            </div>
            <span className="text-xs text-[#ededed]/25">{artemis.length} articles</span>
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[40vh] overflow-y-auto scrollbar-hide">
            {artemis.slice(0, 10).map((art: any, j: number) => (
              <a key={art.artemis_id || j} href={art.url} target="_blank" rel="noopener noreferrer" className="block px-5 py-3 hover:bg-white/[0.03] group">
                <div className="text-sm font-medium text-[#ededed]/65 group-hover:text-[#ededed]/90 line-clamp-2 leading-snug">{art.title}</div>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#ededed]/25">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    art.category === 'macro' ? 'text-amber-400 bg-amber-500/10' :
                    art.category === 'ai' ? 'text-blue-400 bg-blue-500/10' :
                    art.category === 'hardware' ? 'text-green-400 bg-green-500/10' :
                    'text-yellow-400 bg-yellow-500/10'
                  }`}>
                    {art.category === 'general' ? 'RESEARCH' : art.category.toUpperCase()}
                  </span>
                  <span className="truncate max-w-[120px]">{art.source?.replace('Artemis Research (', '').replace(')', '')}</span>
                  <span className="ml-auto tabular-nums">{art.published_at ? new Date(art.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Category boxes ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {web3Cats.map((cat: any) => (
          <CategoryBox key={cat.id} cat={cat} ago={ago} TC={TC} />
        ))}
      </div>
    </div>
  );
}
