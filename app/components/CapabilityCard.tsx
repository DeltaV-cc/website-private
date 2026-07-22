'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

const Arrow = () => <span aria-hidden="true">↗</span>;

export type CapabilityBullet = {
  label: string;
  href: string;
};

export type CapabilityCardProps = {
  href: string;
  index: string;
  label?: string;
  title: string;
  cta: string;
  bullets?: CapabilityBullet[];
  description?: ReactNode;
  accent: string;
  titleTint?: string;
  className?: string;
};

type CapabilityCardStyle = CSSProperties & {
  '--card-accent'?: string;
  '--card-border'?: string;
};

export default function CapabilityCard({
  href,
  index,
  label,
  title,
  cta,
  bullets,
  description,
  accent,
  titleTint = accent,
  className = '',
}: CapabilityCardProps) {
  const style: CapabilityCardStyle = {
    '--card-accent': accent,
    '--card-border': `color-mix(in srgb, ${accent} 30%, transparent)`,
  };

  return (
    <Link
      href={href}
      className={`capability-card group flex min-h-[260px] sm:min-h-[300px] flex-col border-l-2 p-5 sm:p-7 md:p-9 ${className}`}
      style={style}
    >
      <div className="flex justify-between text-xs font-mono tracking-[.16em]" style={{ color: accent }}>
        <span>{index}</span>
        <span aria-hidden="true">↗</span>
      </div>

      <div className="mt-8">
        {label && <div className="text-xs uppercase tracking-[.16em]" style={{ color: accent }}>{label}</div>}
        <h3 className={`text-2xl md:text-3xl font-semibold tracking-tight ${titleTint}`}>
          {title}
        </h3>

        {bullets ? (
          <ul className="mt-5 max-w-sm space-y-2 text-sm leading-relaxed">
            {bullets.map((bullet) => (
              <li key={bullet.href}>
                <span className="flex items-start gap-2 text-[var(--text-secondary)]">
                  <span className="shrink-0" style={{ color: accent }} aria-hidden="true">•</span>
                  <span className="flex-1">{bullet.label}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : description ? (
          <div className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</div>
        ) : null}
      </div>

      <span className="mt-auto inline-flex pt-7 text-xs font-semibold uppercase tracking-[.14em] transition-opacity group-hover:opacity-100" style={{ color: accent }}>
        {cta} <Arrow />
      </span>
    </Link>
  );
}
