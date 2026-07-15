/* ================================================================
   IntelHub — Shared UI components
   ================================================================ */
'use client';

import { Item } from '../types';

/* -- Skeleton Screens -- */
export function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`rounded relative overflow-hidden bg-white/[0.03] ${className || ''}`}>
      <div className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          animation: 'shimmer 1.5s infinite',
        }} />
    </div>
  );
}

export function SkeletonPrice() {
  return (
    <div className="px-4 py-3 space-y-2">
      <SkeletonBlock className="h-3 w-12 mb-1" />
      <SkeletonBlock className="h-6 w-24" />
      <SkeletonBlock className="h-3 w-16" />
    </div>
  );
}

/* -- SVG Icons (inline Heroicons) -- */
export function ShieldIcon() {
  return (
    <svg className="w-5 h-5 text-red-400/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

export function PackageIcon() {
  return (
    <svg className="w-5 h-5 text-orange-400/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

export function BellIcon() {
  return (
    <svg className="w-5 h-5 text-yellow-400/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}

export function ExclaimIcon() {
  return (
    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

/* -- SeverityBadge -- */
export function SeverityBadge({ sev, score }: { sev: string; score: number }) {
  const color =
    sev === 'CRITICAL'
      ? 'border-red-500/40 bg-red-500/10 text-red-400'
      : sev === 'HIGH'
      ? 'border-orange-500/40 bg-orange-500/10 text-orange-400'
      : sev === 'MEDIUM'
      ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400'
      : 'border-blue-500/40 bg-blue-500/10 text-blue-400';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border ${color}`}>
      <ExclaimIcon />
      {score || sev}
    </span>
  );
}

/* -- TileBox -- */
export function TileBox({
  title, accent, color, count, children, maxH,
}: {
  title: string; accent: string; color: string; count: number; children: React.ReactNode; maxH?: string;
}) {
  return (
    <div className={`rounded-2xl border border-[#222] bg-white/[0.01] border-l-2 ${color} overflow-hidden`}>
      <div className="px-4 py-3 border-b border-[#222] bg-gradient-to-r from-[#111] via-[#111] to-white/[0.02] flex items-center justify-between">
        <span className={`text-sm font-semibold ${accent}`}>{title}</span>
        <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-[#ededed]/40 tabular-nums">{count}</span>
      </div>
      <div className={`divide-y divide-white/[0.02] ${maxH || 'max-h-[50vh]'} overflow-y-auto scrollbar-hide`}>{children}</div>
    </div>
  );
}

/* -- TileRow -- */
export function TileRow({ it, ago }: { it: Item; ago: (iso: string) => string }) {
  return (
    <a href={it.url} target="_blank" rel="noopener noreferrer" aria-label={it.title} className="block px-4 py-3 hover:bg-white/[0.03] group">
      <div className="text-sm font-medium text-[#ededed]/65 group-hover:text-[#ededed]/90 line-clamp-2 leading-snug">{it.title}</div>
      <div className="text-xs text-[#ededed]/25 mt-1 tabular-nums">{ago(it.published_at)}</div>
    </a>
  );
}

/* -- BarChart -- */
export function BarChart({
  data, max, color,
}: {
  data: { name: string; value: number }[]; max?: number; color?: string;
}) {
  const m = max || Math.max(...data.map(d => d.value), 1);
  const barColor = color || '#a855f7';
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-24 text-[#ededed]/40 truncate flex-shrink-0 leading-none">{d.name}</span>
          <div className="flex-1 h-4 rounded-full bg-white/[0.04] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((d.value / m) * 100).toFixed(0)}%`, background: barColor }}
            />
          </div>
          <span className="w-20 text-right text-[#ededed]/70 tabular-nums font-medium flex-shrink-0 leading-none">
            {fmtShort(d.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -- CategoryBox -- */
export function CategoryBox({
  cat, ago, TC, compact,
}: {
  cat: any; ago: (iso: string) => string; TC: Record<string, string>; compact?: boolean;
}) {
  const maxH = compact ? 'max-h-[320px]' : 'max-h-[260px]';
  const px = compact ? 'px-3' : 'px-4';
  const py = compact ? 'py-1.5' : 'py-2.5';
  return (
    <div className={`rounded-2xl border border-[#222] ${cat.bg} border-l-2 ${cat.color} overflow-hidden`}>
      <div className={`${px} ${py} border-b border-[#222] bg-gradient-to-r from-[#111] via-[#111] to-white/[0.02] flex items-center justify-between`}>
        <span className={`text-sm font-semibold ${cat.accent}`}>{cat.label}</span>
        <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-[#ededed]/30 tabular-nums">{cat.count}</span>
      </div>
      <div className={`divide-y divide-white/[0.02] ${maxH} overflow-y-auto scrollbar-hide`}>
        {cat.items.length === 0 ? (
          <div className="px-4 py-6 text-xs text-[#ededed]/10 italic text-center">no signals</div>
        ) : (
          cat.items.map((it: any, j: number) => (
            <a
              key={j}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={it.title}
              className={`block ${px} ${py} hover:bg-white/[0.03] group`}
            >
              <div className={`${compact ? 'text-xs' : 'text-xs'} font-medium text-[#ededed]/60 group-hover:text-[#ededed]/85 line-clamp-2`}>{it.title}</div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-[#ededed]/20">
                <span className="truncate max-w-[80px]">{it.source}</span>
                <span className="ml-auto tabular-nums">{ago(it.published_at)}</span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}

/* -- helpers -- */
export function fmtNum(n: number | null | undefined, decimals = 0): string {
  if (n == null || isNaN(n)) return '...';
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtShort(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}
