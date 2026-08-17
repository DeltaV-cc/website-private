// Server component on purpose: pure markup, no state and no handler. Every
// hover effect here is CSS, and `--card-accent` is a plain inline style.
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
    // Not a <Link> wrapper: the bullets are links of their own now, and an
    // anchor cannot nest inside an anchor. The card-wide link is stretched
    // over the whole box instead, and the bullets sit above it.
    <div
      className={`capability-card group flex min-h-[260px] sm:min-h-[300px] flex-col border-l-2 p-5 sm:p-7 md:p-9 ${className}`}
      style={style}
    >
      <Link href={href} className="absolute inset-0 z-0" aria-label={cta} />

      <div className="pointer-events-none flex justify-between text-xs font-mono tracking-[.16em]" style={{ color: accent }}>
        <span>{index}</span>
        <span aria-hidden="true">↗</span>
      </div>

      <div className="pointer-events-none mt-8">
        {label && <div className="text-xs uppercase tracking-[.16em]" style={{ color: accent }}>{label}</div>}
        <h3 className={`text-2xl md:text-3xl font-semibold tracking-tight ${titleTint}`}>
          {title}
        </h3>

        {/* py-1 on the link, and the gap moved from the list to the padding:
            each bullet is its own tap target sitting on top of the card-wide
            link, and at 20px tall they were under the 24px floor. Same rhythm
            on screen, 28px of hit area each. */}
        {bullets ? (
          <ul className="mt-4 max-w-sm space-y-1 text-sm leading-relaxed">
            {bullets.map((bullet) => (
              <li key={bullet.href}>
                <Link
                  href={bullet.href}
                  className="pointer-events-auto relative z-10 flex items-start gap-2 py-1 text-[var(--text-secondary)] underline-offset-4 transition-colors hover:underline focus-visible:underline"
                  style={{ textDecorationColor: accent }}
                >
                  <span className="shrink-0" style={{ color: accent }} aria-hidden="true">•</span>
                  <span className="flex-1 hover:text-[var(--text-primary)]">{bullet.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : description ? (
          <div className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</div>
        ) : null}
      </div>

      <span className="pointer-events-none mt-auto inline-flex pt-7 text-xs font-semibold uppercase tracking-[.14em] transition-opacity group-hover:opacity-100" style={{ color: accent }}>
        {cta} <Arrow />
      </span>
    </div>
  );
}
