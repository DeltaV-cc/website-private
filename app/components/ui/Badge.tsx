'use client';

import React from 'react';

type BadgeVariant = 'default' | 'ai' | 'web3' | 'opsec' | 'intel' | 'positive' | 'negative' | 'warning' | 'count';

interface BadgeProps { children: React.ReactNode; variant?: BadgeVariant; className?: string; size?: 'sm' | 'md'; }

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-white/[0.06] text-[var(--text-secondary)] border-white/[0.08]',
  ai: 'bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/20',
  web3: 'bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] border-[var(--accent-orange)]/20',
  opsec: 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] border-[var(--accent-amber)]/20',
  intel: 'bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] border-[var(--accent-purple)]/20',
  positive: 'bg-[var(--accent-green)]/10 text-[var(--accent-green)] border-[var(--accent-green)]/20',
  negative: 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border-[var(--accent-red)]/20',
  warning: 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] border-[var(--accent-amber)]/20',
  count: 'bg-white/[0.06] text-[var(--text-tertiary)] border-transparent',
};
const sizeMap = { sm: 'px-2 py-0.5 text-[10px] rounded-full', md: 'px-2.5 py-1 text-xs rounded-full' };

export default function Badge({ children, variant = 'default', className = '', size = 'sm' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium tracking-[0.5px] uppercase border ${sizeMap[size]} ${variantMap[variant]} ${className}`}>
      {children}
    </span>
  );
}
