'use client';

import { useRef, useState, type CSSProperties } from 'react';

export type EcosystemItem = {
  name: string;
  /** X / Twitter handle without @ - used for unavatar profile image */
  x?: string;
  href?: string;
};

/**
 * Avatar from X profile via unavatar (static-friendly CDN).
 * Falls back to monogram if the image fails to load.
 */
function BrandMark({ name, x }: { name: string; x?: string }) {
  const [failed, setFailed] = useState(false);
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  const src = x && !failed
    ? `https://unavatar.io/twitter/${encodeURIComponent(x)}?fallback=false`
    : null;

  if (!src) {
    return (
      <span
        className="w-5 h-5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center text-[9px] font-semibold text-[var(--text-tertiary)]"
        aria-hidden="true"
      >
        {initial}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-5 h-5 rounded-full object-cover border border-[var(--border-default)] bg-[var(--bg-elevated)]"
    />
  );
}

function Chip({
  item,
  accentHover,
}: {
  item: EcosystemItem;
  accentHover: string;
}) {
  const className = `flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[10px] font-mono tracking-[0.8px] text-[var(--text-tertiary)] ${accentHover} hover:bg-[var(--bg-hover)] transition-all whitespace-nowrap select-none`;

  const body = (
    <>
      <BrandMark name={item.name} x={item.x} />
      <span>{item.name}</span>
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        title={item.x ? `@${item.x}` : item.name}
        role="listitem"
      >
        {body}
      </a>
    );
  }

  return (
    <div className={className} title={item.x ? `@${item.x}` : item.name} role="listitem">
      {body}
    </div>
  );
}

/**
 * Seamless infinite logo+name marquee for pillar ecosystem rows.
 * Pure CSS animation - no jank, respects prefers-reduced-motion.
 */
export default function EcosystemStack({
  items,
  accent = 'cyan',
  label = 'Ecosystem & Stack',
}: {
  items: EcosystemItem[];
  accent?: 'cyan' | 'orange' | 'purple';
  label?: string;
}) {
  const [duration, setDuration] = useState(40);
  const boostTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accentText =
    accent === 'orange'
      ? 'text-[var(--accent-orange)]'
      : accent === 'purple'
        ? 'text-[var(--accent-purple)]'
        : 'text-[var(--accent-cyan)]';

  const accentHover =
    accent === 'orange'
      ? 'hover:text-[var(--accent-orange)] hover:border-[var(--accent-orange)]/30'
      : accent === 'purple'
        ? 'hover:text-[var(--accent-purple)] hover:border-[var(--accent-purple)]/30'
        : 'hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/30';

  // Triple for wide screens so the loop never shows a gap
  const loop = [...items, ...items, ...items];
  const boostMarquee = () => {
    setDuration(12);
    if (boostTimer.current) clearTimeout(boostTimer.current);
    boostTimer.current = setTimeout(() => setDuration(40), 900);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-16 border-t border-[var(--border-default)] pt-10">
      <div className="text-center mb-5">
        <div className={`${accentText} text-[10px] font-semibold tracking-[3px] uppercase mb-1.5`}>
          {label}
        </div>
      </div>

      <div className="ecosystem-track relative overflow-hidden" role="list" aria-label={label} onWheel={boostMarquee} onTouchStart={boostMarquee}>
        <div className="ecosystem-marquee flex w-max gap-2.5 py-1" style={{ '--ecosystem-duration': `${duration}s` } as CSSProperties}>
          {loop.map((item, i) => (
            <Chip key={`${item.name}-${i}`} item={item} accentHover={accentHover} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** AI pillar ecosystem - X handles for profile avatars */
export const AI_ECOSYSTEM: EcosystemItem[] = [
  { name: 'Hugging Face', x: 'huggingface', href: 'https://x.com/huggingface' },
  { name: 'OpenCode', x: 'opencode', href: 'https://x.com/opencode' },
  { name: 'Hermes', x: 'NousResearch', href: 'https://x.com/NousResearch' },
  { name: 'Ollama', x: 'ollama', href: 'https://x.com/ollama' },
  { name: 'OpenRouter', x: 'OpenRouterAI', href: 'https://x.com/OpenRouterAI' },
  { name: 'BF6', x: 'BlackForestLabs', href: 'https://x.com/BlackForestLabs' },
  { name: 'LM Studio', x: 'lmstudio', href: 'https://x.com/lmstudio' },
  { name: 'Cocktail Peanut', x: 'cocktailpeanut', href: 'https://x.com/cocktailpeanut' },
];

/** Web3 pillar ecosystem - X handles for profile avatars */
export const WEB3_ECOSYSTEM: EcosystemItem[] = [
  { name: 'DeFiLlama', x: 'DefiLlama', href: 'https://x.com/DefiLlama' },
  { name: 'Artemis', x: 'Artemis__xyz', href: 'https://x.com/Artemis__xyz' },
  { name: 'Tezor', x: 'Trezor', href: 'https://x.com/Trezor' },
  { name: 'rokti', x: 'roktixyz', href: 'https://x.com/roktixyz' },
  { name: 'Safe', x: 'safe', href: 'https://x.com/safe' },
  { name: 'l2beat', x: 'l2beat', href: 'https://x.com/l2beat' },
  { name: 'defiscan', x: 'defiscan_info', href: 'https://www.defiscan.info/' },
  { name: 'frankencoin', x: 'frankencoinzchf', href: 'https://x.com/frankencoinzchf' },
  { name: 'liquity', x: 'LiquityProtocol', href: 'https://x.com/LiquityProtocol' },
  { name: 'TRM', x: 'trmlabs', href: 'https://x.com/trmlabs' },
  { name: 'railgun', x: 'RAILGUN_Project', href: 'https://x.com/RAILGUN_Project' },
  { name: 'Fluidkey', x: 'fluidkey', href: 'https://x.com/fluidkey' },
  { name: 'privacypool', x: 'PrivacyPools', href: 'https://x.com/PrivacyPools' },
  { name: 'giveth', x: 'Giveth', href: 'https://x.com/Giveth' },
];
