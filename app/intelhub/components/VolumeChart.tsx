/* IntelHub — DEX Weekly Volume Chart (Dune query 7950834) */
'use client';

import { useRef, useState, useEffect } from 'react';

interface WeeklyPoint { week: string; curated: number; filtered: number; raw: number }

export default function VolumeChart({ data, loading }: { data: WeeklyPoint[]; loading: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; vals: string[] } | null>(null);
  const [w, setW] = useState(400);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    if (ref.current) ro.observe(ref.current.parentElement!);
    return () => ro.disconnect();
  }, []);

  if (loading || !data.length) {
    return <div className="flex items-center justify-center h-48 text-[var(--text-disabled)] text-xs">Loading DEX volume...</div>;
  }

  // Last 26 weeks
  const series = data.slice(-26);
  const maxVal = Math.max(...series.map(d => d.curated), 1);
  const h = 180, padL = 50, padR = 12, padT = 16, padB = 24;
  const cw = w - padL - padR;
  const ch = h - padT - padB;

  const x = (i: number) => padL + (i / (series.length - 1)) * cw;
  const y = (v: number) => padT + ch - (v / maxVal) * ch;

  const pathD = series.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.curated)}`).join(' ');
  const areaD = `${pathD} L${x(series.length - 1)},${padT + ch} L${x(0)},${padT + ch} Z`;

  const fmt = (v: number) => v >= 1e9 ? `$${(v / 1e9).toFixed(1)}B` : `$${(v / 1e6).toFixed(0)}M`;

  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ overflow: 'visible' }}>
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(p => (
        <g key={p}>
          <line x1={padL} y1={y(maxVal * p)} x2={w - padR} y2={y(maxVal * p)} stroke="white" strokeOpacity={0.03} />
          <text x={padL - 6} y={y(maxVal * p) + 4} textAnchor="end" className="text-[9px] fill-[var(--text-muted)]">{fmt(maxVal * p)}</text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaD} fill="var(--accent-cyan)" opacity={0.08} />

      {/* Line */}
      <path d={pathD} fill="none" stroke="var(--accent-cyan)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots + hover */}
      {series.map((d, i) => (
        <circle
          key={i}
          cx={x(i)} cy={y(d.curated)} r={4}
          fill="var(--bg-surface)" stroke="var(--accent-cyan)" strokeWidth={1.5}
          className="cursor-pointer hover:r-6 transition-all"
          onMouseEnter={e => {
            const rect = (e.target as SVGCircleElement).getBoundingClientRect();
            const parent = ref.current?.getBoundingClientRect();
            if (parent) setTooltip({
              x: rect.left - parent.left + 12,
              y: rect.top - parent.top - 16,
              label: d.week,
              vals: [`Curated: ${fmt(d.curated)}`, `Filtered: ${fmt(d.filtered)}`],
            });
          }}
          onMouseLeave={() => setTooltip(null)}
        />
      ))}

      {/* X labels */}
      {series.filter((_, i) => i % 4 === 0).map((d, i) => (
        <text key={i} x={x(i * 4)} y={h - 4} textAnchor="middle" className="text-[8px] fill-[var(--text-muted)]">
          {d.week.slice(5)}
        </text>
      ))}

      {/* Tooltip */}
      {tooltip && (
        <g transform={`translate(${Math.min(tooltip.x, w - 140)}, ${Math.max(tooltip.y, 10)})`}>
          <rect x={0} y={0} width={130} height={40} rx={6} fill="var(--bg-elevated)" stroke="var(--border-default)" />
          <text x={8} y={14} className="text-[9px] fill-[var(--text-muted)]">{tooltip.label}</text>
          {tooltip.vals.map((v, j) => (
            <text key={j} x={8} y={28 + j * 12} className="text-[9px] fill-[var(--text-primary)] font-mono">{v}</text>
          ))}
        </g>
      )}
    </svg>
  );
}
