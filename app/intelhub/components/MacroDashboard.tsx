/* ================================================================
   IntelHub — Macro Dashboard tab
   ================================================================ */
'use client';

import { Item, PatentsData } from '../types';
import PatentsTable from './PatentsTable';
import { TileBox, CategoryBox } from './Shared';

export default function MacroDashboard({
  items, dd, patents, forex, catBoxes, TC, ago, fmt, fmtN,
}: {
  items: Item[]; dd: any; patents: PatentsData | null; forex: any;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; fmt: (n: number) => string; fmtN: (n: number) => string;
}) {
  const fgVal = dd?.fearGreed?.data?.[0] ? Number(dd.fearGreed.data[0].value) || 0 : 0;
  const fgLabel = dd?.fearGreed?.data?.[0]?.value_classification || '';
  const macroCats = catBoxes.filter((c: any) => ['macro', 'science'].includes(c.id));

  return (
    <div className="space-y-4">
      {/* ── Top row: F&G + Forex + Market ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* F&G — vertical gauge */}
        <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5 flex flex-col items-center">
          <span className="text-xs text-amber-400 uppercase tracking-[.15em] font-bold mb-2">Fear &amp; Greed</span>
          <span className="text-xs text-emerald-400/50 uppercase font-semibold mb-1">Greed</span>
          <div className="relative w-6 flex-1 min-h-[100px] bg-gradient-to-t from-red-500/30 via-amber-500/30 to-emerald-500/30 rounded-full overflow-hidden my-2">
            <div
              className="absolute left-0 right-0 h-[4px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)] transition-all duration-700 z-10 rounded-full"
              style={{ bottom: `${Math.max(3, Math.min(97, fgVal))}%` }}
            />
          </div>
          <span className={`text-2xl font-bold tabular-nums -mb-0.5 ${fgVal > 60 ? 'text-emerald-400' : fgVal < 35 ? 'text-red-400' : 'text-amber-400'}`}>
            {fgVal || '--'}
          </span>
          <span className="text-xs text-red-400/50 uppercase font-semibold mt-0.5">Fear</span>
          <span className="text-xs text-[#ededed]/30 mt-1">{fgLabel || '...'}</span>
        </div>

        {/* Forex */}
        <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5">
          <div className="text-xs text-sky-400 uppercase tracking-[.1em] font-bold mb-3">Forex (vs USD)</div>
          <div className="space-y-2">
            {(() => {
              const pairs = [
                { l: 'EUR/USD', v: forex?.rates?.EUR ? ((1 / forex.rates.EUR) - 1) * 100 : 0, c: 'text-sky-400' },
                { l: 'USD/JPY', v: forex?.rates?.JPY ? ((forex.rates.JPY - 100) / 4) : 0, c: 'text-orange-400' },
                { l: 'GBP/USD', v: forex?.rates?.GBP ? ((1 / forex.rates.GBP) - 1) * 100 : 0, c: 'text-cyan-400' },
                { l: 'USD/CHF', v: forex?.rates?.CHF ? ((forex.rates.CHF - 0.9) / 0.02) : 0, c: 'text-emerald-400' },
              ];
              const maxDev = Math.max(...pairs.map(p => Math.abs(p.v)), 0.5);
              return pairs.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-14 text-[#ededed]/30 truncate shrink-0">{p.l}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] relative overflow-hidden">
                    <div
                      className={`absolute h-full rounded-full transition-all duration-500 ${Number(p.v) >= 0 ? 'bg-emerald-500/60 right-1/2' : 'bg-red-500/60 left-1/2'}`}
                      style={{ width: `${(Math.abs(p.v) / maxDev * 45).toFixed(0)}%` }}
                    />
                  </div>
                  <span className={`w-12 text-right font-bold tabular-nums shrink-0 ${p.v > 0.5 ? 'text-emerald-400' : p.v < -0.5 ? 'text-red-400' : 'text-[#ededed]/40'}`}>
                    {forex?.rates ? `${p.v > 0 ? '+' : ''}${p.v.toFixed(1)}%` : '...'}
                  </span>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Market Movers */}
        <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#222] bg-[#111] flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
            <span className="text-xs text-cyan-400 uppercase tracking-[.15em] font-bold">Market</span>
          </div>
          <div className="divide-y divide-white/[0.02]">
            {patents?.marketMovers?.length ? (
              patents.marketMovers.map((m: any, i: number) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between text-sm">
                  <span className="text-[#ededed]/60 truncate mr-2 font-medium">{m.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[#ededed]/70 tabular-nums font-semibold">{m.value}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${m.dir === 'up' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                      {m.change}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-sm text-[#ededed]/20 italic text-center">Awaiting data...</div>
            )}
          </div>
        </div>
      </div>

      {/* ── Patent Landscape (Redesigned) ── */}
      {patents && <PatentsTable patents={patents} />}

      {/* ── Key Labs signal feed ── */}
      {patents && <KeyLabsFeed items={items} patents={patents} ago={ago} />}

      {/* ── Category boxes ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {macroCats.map((cat: any) => (
          <CategoryBox key={cat.id} cat={cat} ago={ago} TC={TC} />
        ))}
      </div>
    </div>
  );
}

/* ── Key Labs RSS feed ── */
function KeyLabsFeed({
  items, patents, ago,
}: {
  items: Item[]; patents: PatentsData; ago: (iso: string) => string;
}) {
  const kw = patents.keyLabs
    .flatMap((l: any) => [l.name, ...l.name.split(/[\s-]+/).filter((s: string) => s.length > 2)])
    .map((s: string) => s.toLowerCase());
  const labItems = items
    .filter((it: any) => {
      const t = (it.title + ' ' + it.source).toLowerCase();
      return kw.some((k: string) => t.includes(k));
    })
    .slice(0, 12);

  return (
    <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-5 py-3 border-b border-[#222] bg-[#111] flex items-center justify-between">
        <span className="text-sm text-violet-400 uppercase tracking-[.15em] font-bold">Key Labs &amp; Institutions</span>
        <span className="text-xs text-[#ededed]/25">{labItems.length} posts</span>
      </div>
      <div className="divide-y divide-white/[0.02] max-h-[50vh] overflow-y-auto scrollbar-hide">
        {labItems.length === 0 ? (
          <div className="px-5 py-8 text-sm text-[#ededed]/20 italic text-center">Awaiting signal matching...</div>
        ) : (
          labItems.map((it: any, j: number) => (
            <a
              key={j}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-3 hover:bg-white/[0.03] group"
            >
              <div className="text-sm font-medium text-[#ededed]/65 group-hover:text-[#ededed]/90 line-clamp-2 leading-snug">
                {it.title}
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#ededed]/25">
                <span className="truncate max-w-[120px]">{it.source}</span>
                <span className="ml-auto tabular-nums">{ago(it.published_at)}</span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
