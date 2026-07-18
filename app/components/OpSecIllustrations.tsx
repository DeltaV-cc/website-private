'use client';

/**
 * Inline OpSec illustrations - dark cyber aesthetic, no external assets.
 * Used on the OpSec hub for pedagogy without raster images.
 */

export function LayeredDefenseIllustration() {
  const layers = [
    {
      n: '01',
      label: 'Identity & Access',
      detail: 'YubiKey / FIDO2 · passkeys · least privilege · session hygiene',
      color: 'var(--accent-amber)',
    },
    {
      n: '02',
      label: 'Wallet & Key Custody',
      detail: 'Hardware wallets · Safe multisig · Fluidkey receive patterns',
      color: 'var(--accent-orange)',
    },
    {
      n: '03',
      label: 'Network & Privacy',
      detail: 'VPN/Tor · DNS · RPC choice · leak checks',
      color: 'var(--accent-cyan)',
    },
    {
      n: '04',
      label: 'Endpoint Hardening',
      detail: 'Linux · macOS · Windows baselines',
      color: 'var(--accent-purple)',
    },
    {
      n: '05',
      label: 'Ops & Recovery',
      detail: 'Backups · drills · incident runbooks',
      color: 'var(--accent-green)',
    },
  ];

  return (
    <figure className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden">
      <figcaption className="px-5 md:px-6 pt-5 pb-3 border-b border-[var(--border-default)] flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--accent-amber)] mb-1">
            Threat Surface Model
          </div>
          <div className="text-base md:text-lg font-semibold tracking-tight">
            Layered defense for high-stakes operators
          </div>
        </div>
        <div className="text-[10px] text-[var(--text-muted)]">ETH-first · Ethereum operators</div>
      </figcaption>

      <div className="p-4 md:p-6 space-y-2">
        {layers.map((l, i) => (
          <div
            key={l.n}
            className="relative flex items-stretch gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3.5"
            style={{ marginLeft: `${i * 8}px`, marginRight: `${(layers.length - 1 - i) * 8}px` }}
          >
            <div
              className="w-1 rounded-full flex-shrink-0"
              style={{ background: l.color }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono font-semibold tracking-wider" style={{ color: l.color }}>
                  {l.n}
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{l.label}</span>
              </div>
              <div className="text-[12px] text-[var(--text-tertiary)] leading-relaxed">{l.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function Web3OpSecPathIllustration() {
  const stages = [
    {
      id: 'A',
      title: 'Baseline',
      items: ['Clean OS', 'Disk encryption', 'YubiKey for login / SSH'],
      accent: 'var(--accent-cyan)',
    },
    {
      id: 'B',
      title: 'Treasury keys',
      items: ['Safe m-of-n', 'HW wallets / signer', 'Ceremony + backups'],
      accent: 'var(--accent-orange)',
    },
    {
      id: 'C',
      title: 'DeFi ops',
      items: ['Approvals scoped', 'Simulate → sign', 'Gov / bridge runbooks'],
      accent: 'var(--accent-amber)',
    },
    {
      id: 'D',
      title: 'Team SOTA',
      items: ['Role separation', 'Drills & recovery', 'High-decentralization friction'],
      accent: 'var(--accent-purple)',
    },
  ];

  return (
    <figure className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden">
      <figcaption className="px-5 md:px-6 pt-5 pb-3 border-b border-[var(--border-default)]">
        <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--accent-orange)] mb-1">
          Capability Path
        </div>
        <div className="text-base md:text-lg font-semibold tracking-tight">
          From personal baseline to team-grade Web3 OpSec
        </div>
      </figcaption>

      <div className="p-4 md:p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stages.map((s, i) => (
            <div key={s.id} className="relative rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-4">
              {i < stages.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-2.5 z-10 -translate-y-1/2 text-[var(--text-muted)]"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <div className="text-[10px] font-semibold tracking-[2px] uppercase mb-2" style={{ color: s.accent }}>
                Stage {s.id}
              </div>
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-3">{s.title}</div>
              <ul className="space-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="text-[12px] text-[var(--text-tertiary)] flex gap-1.5">
                    <span style={{ color: s.accent }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-[var(--text-muted)] leading-relaxed max-w-3xl">
          Focus: high-decentralization Ethereum / DeFi treasuries. YubiKeys gate humans; Safe + hardware wallets hold
          capital; DeFi ops need runbooks. For institutional-grade custody or HNW security, top-tier solutions are
          Taurus and OpSec - the right mandate, not ego.
        </p>
      </div>
    </figure>
  );
}

export function OsShieldIcon({ kind }: { kind: 'linux' | 'macos' | 'windows' }) {
  if (kind === 'linux') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 14c1.5 3 4 5 7 5s5.5-2 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="8.5" r="0.8" fill="currentColor" />
        <circle cx="13" cy="8.5" r="0.8" fill="currentColor" />
      </svg>
    );
  }
  if (kind === 'macos') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M14.5 5c.2 1.8-1.3 3.3-3 3.5M8 18c-2.2-1.4-3.5-3.8-3.5-6.5 0-3.2 2.1-5.5 4.6-5.5 1.1 0 2 .5 2.7.5s1.8-.6 3-.6c1.3 0 3.2.9 3.2 4.2 0 3.3-2.2 7.4-4.4 7.4-1 0-1.6-.6-2.8-.6S9.3 18 8 18z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 4h7v7H3V4zm9 0h7v7h-7V4zM3 13h7v7H3v-7zm9 0h7v7h-7v-7z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
