'use client';

import React from 'react';

interface DataBarProps {
  label: string; value: number; max: number; change?: string;
  changeDirection?: 'up' | 'down' | 'neutral'; unit?: string;
  color?: 'cyan' | 'orange' | 'purple' | 'amber'; className?: string;
}

const colorMap = {
  cyan: 'from-[var(--accent-cyan)]/70 to-[var(--accent-cyan)]/40',
  orange: 'from-[var(--accent-orange)]/70 to-[var(--accent-orange)]/40',
  purple: 'from-[var(--accent-purple)]/70 to-[var(--accent-purple)]/40',
  amber: 'from-[var(--accent-amber)]/70 to-[var(--accent-amber)]/40',
};

export default function DataBar({
  label, value, max, change, changeDirection = 'neutral', unit = '', color = 'cyan', className = '',
}: DataBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  const changeColor = changeDirection === 'up' ? 'text-[var(--accent-green)]' :
    changeDirection === 'down' ? 'text-[var(--accent-red)]' : 'text-[var(--text-tertiary)]';
  return (
    <div className={`flex items-center gap-3 text-xs ${className}`}>
      <span className="w-20 sm:w-24 text-[var(--text-tertiary)] truncate font-medium">{label}</span>
      <div className="flex-1 h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r ${colorMap[color]} transition-all duration-700`}
          style={{ width: `${pct}%` }} />
      </div>
      <div className="w-20 text-right tabular-nums">
        <span className="text-[var(--text-secondary)]">{value}{unit}</span>
        {change && <span className={`ml-1.5 ${changeColor} font-medium`}>{change}</span>}
      </div>
    </div>
  );
}
