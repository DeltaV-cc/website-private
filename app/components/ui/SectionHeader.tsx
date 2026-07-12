'use client';

import React from 'react';

type AccentColor = 'cyan' | 'orange' | 'purple' | 'amber' | 'gold';

interface SectionHeaderProps {
  label: string; title: string; subtitle?: string;
  accent?: AccentColor; action?: React.ReactNode; className?: string;
}

const accentMap: Record<AccentColor, string> = {
  cyan: 'text-[var(--accent-cyan)]', orange: 'text-[var(--accent-orange)]',
  purple: 'text-[var(--accent-purple)]', amber: 'text-[var(--accent-amber)]',
  gold: 'text-[var(--accent-gold)]',
};

export default function SectionHeader({
  label, title, subtitle, accent = 'cyan', action, className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-end justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className={`text-xs font-semibold tracking-[3px] uppercase mb-3 ${accentMap[accent]}`}>{label}</div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-1.5px] text-[var(--text-primary)]">{title}</h2>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {subtitle && <p className="text-[var(--text-secondary)] text-base max-w-2xl leading-relaxed">{subtitle}</p>}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
    </div>
  );
}
