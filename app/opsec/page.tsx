'use client';
import Link from 'next/link';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function OpSec() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-16 md:py-20">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors mb-8 group">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5">
          <path d="M10 7H3M6 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to home
      </Link>

      <div className="mb-12">
        <div className="text-[var(--accent-amber)] text-xs font-semibold tracking-[3px] uppercase mb-3">OpSec</div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-2px] mb-4">Web3 OpSec</h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          High-signal operational security frameworks built on complementary sources and self-sovereign principles.
        </p>
      </div>

      {/* OS Hardening */}
      <div className="mb-12">
        <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-4">OS Hardening</div>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/opsec/linux/" className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[var(--accent-cyan)]/25 hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent-cyan)]/10 flex items-center justify-center text-[var(--accent-cyan)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12h12M2 8h12M2 4h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </span>
              <span className="font-semibold text-lg">Linux</span>
            </div>
            <p className="text-sm text-[var(--text-tertiary)]">Factory reset + hardening guide</p>
          </Link>
          <Link href="/opsec/macos/" className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[var(--accent-cyan)]/25 hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent-cyan)]/10 flex items-center justify-center text-[var(--accent-cyan)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 100 12A6 6 0 008 2z" stroke="currentColor" strokeWidth="1.5"/></svg>
              </span>
              <span className="font-semibold text-lg">macOS</span>
            </div>
            <p className="text-sm text-[var(--text-tertiary)]">Privacy-first MDM + hardening</p>
          </Link>
          <Link href="/opsec/windows/" className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[var(--accent-cyan)]/25 hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent-cyan)]/10 flex items-center justify-center text-[var(--accent-cyan)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3h5v5H2V3zm7 0h5v5H9V3zM2 9h5v5H2V9zm7 0h5v5H9V9z" stroke="currentColor" strokeWidth="1.5"/></svg>
              </span>
              <span className="font-semibold text-lg">Windows</span>
            </div>
            <p className="text-sm text-[var(--text-tertiary)]">Telemetry reduction + endpoint security</p>
          </Link>
        </div>
      </div>

      {/* Core Principles + Key References */}
      <div className="grid md:grid-cols-2 gap-5 mb-12">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
          <h3 className="text-xl font-semibold mb-4">Core Principles</h3>
          <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
            <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Local-first execution and data sovereignty</li>
            <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Complementary sources (Opsek + community hardening scripts)</li>
            <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Agent OpSec with hardened environments</li>
            <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Minimal attack surface across all platforms</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
          <h3 className="text-xl font-semibold mb-4">Key References</h3>
          <div className="space-y-2.5 text-sm text-[var(--text-secondary)]">
            <div>Opsek/OSs-security — Linux, macOS, Windows hardening</div>
            <div>WalletBeat — Ethereum wallet privacy rankings</div>
            <div>Endpoint security research from arXiv & independent labs</div>
          </div>
        </div>
      </div>

      <div className="text-sm text-[var(--text-muted)]">
        Full playbooks and hardening guides produced through the Content Forge.
      </div>
    </div>
  );
}
