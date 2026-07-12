'use client';

import React from 'react';

interface MetricTileProps {
  label: string; value: string | number; change?: string;
  changeDirection?: 'up' | 'down' | 'neutral'; icon?: React.ReactNode;
  sparkline?: React.ReactNode; size?: 'sm' | 'md' | 'lg';
  className?: string; loading?: boolean;
}

const sizeMap = {
  sm: { value: 'text-xl', label: 'text-[10px]', change: 'text-[10px]', padding: 'p-3' },
  md: { value: 'text-2xl', label: 'text-xs', change: 'text-xs', padding: 'p-4' },
  lg: { value: 'text-3xl md:text-4xl', label: 'text-xs', change: 'text-sm', padding: 'p-5' },
};

export default function MetricTile({
  label, value, change, changeDirection = 'neutral', icon, sparkline, size = 'md', className = '', loading = false,
}: MetricTileProps) {
  const s = sizeMap[size];
  if (loading) {
    return (
      <div className={`rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] ${s.padding} ${className} skeleton-shimmer`}>
        <div className="h-3 w-16 bg-white/[0.06] rounded mb-2" />
        <div className="h-8 w-28 bg-white/[0.06] rounded" />
      </div>
    );
  }
  const changeColor = changeDirection === 'up' ? 'text-[var(--accent-green)]' :
    changeDirection === 'down' ? 'text-[var(--accent-red)]' : 'text-[var(--text-tertiary)]';
  return (
    <div className={`data-tile rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] ${s.padding} transition-all duration-200 hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`${s.label} text-[var(--text-muted)] uppercase tracking-[1.5px] font-medium`}>{label}</span>
        {icon && <span className="text-[var(--text-muted)]">{icon}</span>}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className={`${s.value} font-bold text-[var(--text-primary)] tabular-nums tracking-tight`}>{value}</div>
          {change && <div className={`${s.change} font-medium mt-1 ${changeColor} tabular-nums`}>{change}</div>}
        </div>
        {sparkline && <div className="flex-shrink-0 w-16 h-8">{sparkline}</div>}
      </div>
    </div>
  );
}
