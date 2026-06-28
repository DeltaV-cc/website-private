/* ================================================================
   IntelHub — Patents Section (redesigned)
   Visually hierarchical table + cards, no cramped rows
   ================================================================ */
'use client';

import { PatentsData } from '../types';

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'rapid') return <span className="text-emerald-400 text-lg leading-none">▲</span>;
  if (trend === 'growing' || trend === 'moderate') return <span className="text-amber-400 text-lg leading-none">◆</span>;
  return <span className="text-[#ededed]/30 text-lg leading-none">○</span>;
}

export default function PatentsTable({ patents }: { patents: PatentsData }) {
  if (!patents) return null;

  const { header, topHolders, techAreas, hotAreas, keyLabs } = patents;
  const maxCount = Math.max(...topHolders.map(h => parseInt(h.count) || 1), 1);

  return (
    <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
      {/* ── Header Stats Bar ── */}
      <div className="px-5 py-4 border-b border-[#222] bg-gradient-to-r from-[#111] to-transparent">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-base text-pink-400 uppercase tracking-[.15em] font-bold">Patent Landscape</span>
            <span className="text-xs text-[#ededed]/30">· {header.uspto} USPTO grants</span>
          </div>
          <span className="text-xs text-[#ededed]/20">{header.yoy}</span>
        </div>
        {/* KPI chips */}
        <div className="flex flex-wrap gap-3 mt-3">
          <StatChip label="Utility" value={header.utility} color="text-blue-400" />
          <StatChip label="Design" value={header.design} color="text-purple-400" />
          <StatChip label="Filed" value={header.filed} color="text-amber-400" />
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* ── Top Filers — Proper Table ── */}
        <div>
          <div className="text-xs text-[#ededed]/25 uppercase tracking-[.1em] font-semibold mb-3">Top Filers</div>
          {/* Table header */}
          <div className="grid grid-cols-[32px_1fr_48px_auto_auto_auto] gap-2 px-3 py-2 rounded-lg bg-[#111] mb-1 text-xs text-[#ededed]/30 uppercase tracking-wider font-semibold">
            <span>#</span>
            <span>Company</span>
            <span className="text-center">Cnt</span>
            <span className="text-center">Δ</span>
            <span className="text-right">Bar</span>
            <span className="text-right">M.Cap</span>
          </div>
          {/* Table rows */}
          <div className="space-y-1">
            {topHolders.map((h, i) => {
              const countNum = parseInt(h.count);
              const pct = ((countNum / maxCount) * 100).toFixed(0);
              return (
                <div
                  key={i}
                  className="grid grid-cols-[32px_1fr_48px_auto_auto_auto] gap-2 items-center px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  {/* Rank */}
                  <span className="text-xs text-[#ededed]/30 tabular-nums font-medium">{i + 1}</span>
                  {/* Company name + country */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm">{h.country}</span>
                    <span className="text-sm text-white/90 font-medium truncate">{h.name}</span>
                  </div>
                  {/* Count */}
                  <span className="text-sm text-[#ededed]/80 tabular-nums font-semibold text-center">{h.count}</span>
                  {/* Change */}
                  <span
                    className={`text-xs font-semibold text-center ${
                      h.dir === 'up' ? 'text-emerald-400' : h.dir === 'down' ? 'text-red-400' : 'text-[#ededed]/40'
                    }`}
                  >
                    {h.change}
                  </span>
                  {/* Bar */}
                  <div className="w-full h-4 rounded bg-white/[0.04] overflow-hidden min-w-[60px]">
                    <div
                      className="h-full rounded bg-gradient-to-r from-pink-500/60 to-pink-400/20"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  {/* Market cap */}
                  <span className="text-sm text-[#ededed]/60 tabular-nums text-right">{h.mcap}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tech Areas — Horizontal bars ── */}
        <div>
          <div className="text-xs text-[#ededed]/25 uppercase tracking-[.1em] font-semibold mb-2">Tech Areas</div>
          <div className="space-y-2">
            {techAreas.map((t, i) => {
              const pctVal = parseInt(t.pct);
              const maxPct = Math.max(...techAreas.map(x => parseInt(x.pct)), 1);
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#ededed]/60">{t.name}</span>
                    <span className="text-[#ededed]/40 tabular-nums">{t.pct}</span>
                  </div>
                  <div className="h-4 rounded bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded bg-gradient-to-r from-cyan-500/60 to-cyan-400/20"
                      style={{ width: `${(pctVal / maxPct) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Hot Areas — Card Grid ── */}
        <div>
          <div className="text-xs text-[#ededed]/25 uppercase tracking-[.1em] font-semibold mb-3">Hot Areas</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {hotAreas.map((h, i) => (
              <div
                key={i}
                className={`rounded-xl border px-4 py-3 ${
                  h.trend === 'rapid'
                    ? 'border-emerald-500/30 bg-emerald-500/[0.06]'
                    : h.trend === 'moderate'
                    ? 'border-amber-500/30 bg-amber-500/[0.06]'
                    : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendIcon trend={h.trend} />
                  <span className="text-sm font-medium text-[#ededed]/80">{h.name}</span>
                </div>
                <div className={`text-xs mt-1 pl-6 ${
                  h.trend === 'rapid' ? 'text-emerald-400' : h.trend === 'moderate' ? 'text-amber-400' : 'text-[#ededed]/30'
                }`}>
                  {h.sector}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Key Labs & Institutions — Mini Cards ── */}
        <div>
          <div className="text-xs text-[#ededed]/25 uppercase tracking-[.1em] font-semibold mb-3">Key Labs &amp; Institutions</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {keyLabs.map((l, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#222] bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{l.country}</span>
                  <span className="text-sm font-medium text-[#ededed]/80 truncate">{l.name}</span>
                </div>
                <div className="text-xs text-[#ededed]/30 mt-1">{l.focus}</div>
                <div className="text-xs text-[#ededed]/20 mt-0.5 tabular-nums">{l.papers}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── StatChip helper ── */
function StatChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-[#222]">
      <span className="text-xs text-[#ededed]/40">{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${color}`}>{value}</span>
    </div>
  );
}
