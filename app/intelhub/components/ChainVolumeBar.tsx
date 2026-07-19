/* IntelHub — Chain Volume Bar Chart (Dune query 8024914) */
'use client';

interface ChainVol { chain: string; volume_24h: number; delta_pct: number }

export default function ChainVolumeBar({ data, loading }: { data: ChainVol[]; loading: boolean }) {
  if (loading || !data.length) {
    return <div className="flex items-center justify-center h-48 text-[var(--text-disabled)] text-xs">Loading chain volume...</div>;
  }

  const maxVol = Math.max(...data.map(d => d.volume_24h), 1);
  const top8 = data.slice(0, 8);
  const fmt = (v: number) => v >= 1e9 ? `$${(v / 1e9).toFixed(1)}B` : v >= 1e6 ? `$${(v / 1e6).toFixed(0)}M` : `$${(v / 1e3).toFixed(0)}K`;

  return (
    <div className="space-y-1.5">
      {top8.map((d, i) => {
        const pct = Math.max(3, (d.volume_24h / maxVol) * 100);
        const deltaColor = d.delta_pct >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]';
        return (
          <div key={i} className="flex items-center gap-2.5 text-xs group">
            <span className="w-3 text-[10px] text-[var(--text-disabled)] tabular-nums text-right">{i + 1}</span>
            <span className="w-14 text-[var(--text-secondary)] truncate font-medium text-[11px]">{d.chain}</span>
            <div className="flex-1 h-3.5 rounded-full bg-white/[0.04] overflow-hidden relative">
              <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-cyan)]/80 to-[var(--accent-cyan)]/40 transition-all duration-500"
                style={{ width: `${pct}%` }} />
            </div>
            <span className="w-16 text-right tabular-nums text-[var(--text-primary)] font-semibold text-[11px]">{fmt(d.volume_24h)}</span>
            <span className={`w-14 text-right tabular-nums text-[10px] font-medium ${deltaColor}`}>
              {d.delta_pct >= 0 ? '+' : ''}{d.delta_pct.toFixed(1)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
