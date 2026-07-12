'use client';

import React from 'react';

type CardElevation = 'flat' | 'raised' | 'floating';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: React.ReactNode;
  elevation?: CardElevation;
  padding?: CardPadding;
  className?: string;
  hover?: boolean;
  accent?: 'cyan' | 'orange' | 'purple' | 'amber' | null;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

const elevationMap: Record<CardElevation, string> = {
  flat: 'elevated-flat', raised: 'elevated-raised', floating: 'elevated-floating',
};
const paddingMap: Record<CardPadding, string> = {
  none: '', sm: 'p-4', md: 'p-6', lg: 'p-8', xl: 'p-10',
};
const accentMap: Record<string, string> = {
  cyan: 'hover:border-[var(--accent-cyan)]/30',
  orange: 'hover:border-[var(--accent-orange)]/30',
  purple: 'hover:border-[var(--accent-purple)]/30',
  amber: 'hover:border-[var(--accent-amber)]/30',
};

export default function Card({
  children, elevation = 'flat', padding = 'md', className = '',
  hover = true, accent = null, onClick, as: Component = 'div',
}: CardProps) {
  return (
    <Component
      className={`rounded-2xl overflow-hidden ${elevationMap[elevation]} ${paddingMap[padding]} ${hover && accent ? accentMap[accent] : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </Component>
  );
}
