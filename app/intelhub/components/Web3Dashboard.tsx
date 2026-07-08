/* ================================================================
   IntelHub — Web3 Dashboard tab
   ================================================================ */
'use client';

import { BarChart, CategoryBox } from './Shared';
import CryptoLeaders from './CryptoLeaders';

export default function Web3Dashboard({
  dd, catBoxes, TC, ago, fmt, fmtN, items, ts,
}: {
  dd: any; catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; fmt: (n: number) => string; fmtN: (n: number) => string;
  items: any[]; ts: (iso: string) => string;
}) {
  const web3Cats = catBoxes.filter((c: any) => ['crypto'].includes(c.id));
  const totalVol = dd?.totalVolume24h || 0;
  const cmc = dd?.crypto || {};
  const mcap = cmc.total_mcap || 0;
  const mcapChg = cmc.mcap_change_24h || 0;

  function fmtBig(n: number): string {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    return `$${n.toLocaleString()}`;
  }

  return (
    <div className="space-y-5">
      {/* ── Total Market Cap Banner ── */}
      <div className="rounded-2xl border border-[#222] bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-blue-500/5 p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-[#ededed]/30 uppercase tracking-[.15em] mb-1">Total Crypto Market Cap</div>
            <div className="text-2xl font-bold text-[#ededed]/90 tabular-nums">{mcap ? fmtBig(mcap) : '...'}</div>
            <div className={`text-xs font-semibold mt-1 ${mcapChg >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {mcapChg ? `${mcapChg >= 0 ? '+' : ''}${mcapChg.toFixed(1)}%` : ''} <span className="text-[#ededed]/20 font-normal">24h</span>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-[11px] text-[#ededed]/30">BTC Dominance <span className="text-[#ededed]/50 tabular-nums">{cmc.btc_dominance?.toFixed(1) || '...'}%</span></div>
            <div className="text-[11px] text-[#ededed]/30">ETH Dominance <span className="text-[#ededed]/50 tabular-nums">{cmc.eth_dominance?.toFixed(1) || '...'}%</span></div>
            <div className="text-[11px] text-[#ededed]/30">24h Volume <span className="text-[#ededed]/50 tabular-nums">{cmc.total_volume ? fmtBig(cmc.total_volume) : '...'}</span></div>
          </div>
        </div>
      </div>
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

      {/* ── Category boxes ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {web3Cats.map((cat: any) => (
          <CategoryBox key={cat.id} cat={cat} ago={ago} TC={TC} />
        ))}
      </div>

      <CryptoLeaders items={items} ts={ts} />
    </div>
  );
}
