/* IntelHub — DEX Weekly Volume Chart (Dune query 7950834)
   Shows raw vs curated volume — the gap is the filtered-out portion */
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

  const series = data.slice(-26);
  // Use raw volume for scale (it's always >= curated)
  const maxVal = Math.max(...series.map(d => d.raw), 1);
  const h = 200, padL = 52, padR = 12, padT = 16, padB = 28;
  const cw = w - padL - padR;
  const ch = h - padT - padB;

  const x = (i: number) => padL + (i / (series.length - 1)) * cw;
  const y = (v: number) => padT + ch - (v / maxVal) * ch;

  // Raw volume area (full, lighter) — always on bottom
  const rawArea = series.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.raw)}`).join(' ');
  const rawAreaD = `${rawArea} L${x(series.length - 1)},${padT + ch} L${x(0)},${padT + ch} Z`;

  // Curated volume area (on top of raw, darker)
  const curatedArea = series.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.curated)}`).join(' ');
  const curatedAreaD = `${curatedArea} L${x(series.length - 1)},${padT + ch} L${x(0)},${padT + ch} Z`;

  // Curated line
  const curatedLine = series.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.curated)}`).join(' ');

  const fmt = (v: number) => v >= 1e9 ? `$${(v / 1e9).toFixed(2)}B` : `$${(v / 1e6).toFixed(0)}M`;

  return (
    <div className="relative">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-2 text-[10px]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[var(--accent-cyan)]/60" />
          <span className="text-[var(--text-muted)]">Curated</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[var(--text-muted)]/30" />
          <span className="text-[var(--text-muted)]">Raw</span>
        </span>
      </div>

      <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(p => (
          <g key={p}>
            <line x1={padL} y1={y(maxVal * p)} x2={w - padR} y2={y(maxVal * p)} stroke="white" strokeOpacity={0.03} />
            <text x={padL - 6} y={y(maxVal * p) + 4} textAnchor="end" className="text-[9px] fill-[var(--text-muted)]">{fmt(maxVal * p)}</text>
          </g>
        ))}

        {/* Raw volume area — lighter, below */}
        <path d={rawAreaD} fill="var(--text-muted)" opacity={0.06} />

        {/* Curated volume area — on top, darker */}
        <path d={curatedAreaD} fill="var(--accent-cyan)" opacity={0.12} />

        {/* Curated line */}
        <path d={curatedLine} fill="none" stroke="var(--accent-cyan)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots + hover on curated line */}
        {series.map((d, i) => (
          <circle
            key={i}
            cx={x(i)} cy={y(d.curated)} r={4}
            fill="var(--bg-surface)" stroke="var(--accent-cyan)" strokeWidth={1.5}
            className="cursor-pointer"
            onMouseEnter={e => {
              const rect = (e.target as SVGCircleElement).getBoundingClientRect();
              const parent = ref.current?.getBoundingClientRect();
              if (parent) setTooltip({
                x: rect.left - parent.left + 12,
                y: rect.top - parent.top - 20,
                label: d.week,
                vals: [
                  `Curated: ${fmt(d.curated)}`,
                  `Raw: ${fmt(d.raw)}`,
                  `Filtered out: ${fmt(d.raw - d.curated)}`,
                ],
              });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}

        {/* X labels */}
        {series.filter((_, i) => i % 4 === 0).map((d, i) => (
          <text key={i} x={x(i * 4)} y={h - 6} textAnchor="middle" className="text-[8px] fill-[var(--text-muted)]">
            {d.week.slice(5)}
          </text>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <g transform={`translate(${Math.min(tooltip.x, w - 150)}, ${Math.max(tooltip.y, 10)})`}>
            <rect x={0} y={0} width={145} height={52} rx={6} fill="var(--bg-elevated)" stroke="var(--border-default)" />
            <text x={8} y={14} className="text-[9px] fill-[var(--text-muted)]">{tooltip.label}</text>
            {tooltip.vals.map((v, j) => (
              <text key={j} x={8} y={28 + j * 12} className="text-[9px] fill-[var(--text-primary)] font-mono">{v}</text>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
