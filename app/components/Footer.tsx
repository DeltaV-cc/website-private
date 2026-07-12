'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-deep)] relative overflow-hidden">
      <div className="ambient-glow ambient-glow-cyan -top-40 -right-40" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-16 relative">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-[var(--accent-cyan)]">
                <rect x="2" y="2" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M9 20V8l10 6-10 6z" fill="currentColor" />
              </svg>
              <span className="text-lg font-semibold tracking-[-0.5px]">Delta V</span>
            </Link>
            <p className="text-[var(--text-tertiary)] text-sm leading-relaxed max-w-[280px]">
              Sovereign AI, Web3, and OpSec engineering. Zero-headcount company operating at the frontier of intelligence.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[2px] mb-4">Services</h4>
            <div className="space-y-2.5">
              <Link href="/ai/" className="text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors duration-150 text-sm">AI Engineering</Link>
              <Link href="/web3/" className="text-[var(--text-tertiary)] hover:text-[var(--accent-orange)] transition-colors duration-150 text-sm">Web3</Link>
              <Link href="/forge/" className="text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors duration-150 text-sm">Skill Forge</Link>
              <Link href="/opsec/" className="text-[var(--text-tertiary)] hover:text-[var(--accent-amber)] transition-colors duration-150 text-sm">OpSec</Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[2px] mb-4">Resources</h4>
            <div className="space-y-2.5">
              <Link href="/blog/" className="text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors duration-150 text-sm">Blog</Link>
              <Link href="/intelhub/" className="text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors duration-150 text-sm">IntelHub</Link>
              <Link href="/tutorials/" className="text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors duration-150 text-sm">Tutorials</Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[2px] mb-4">Connect</h4>
            <div className="space-y-2.5">
              <a href="mailto:engage@deltav.cc" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors duration-150 text-sm">engage@deltav.cc</a>
              <div className="text-sm text-[var(--text-tertiary)]">Signal: @DeltaV.01</div>
              <Link href="/contact/" className="text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors duration-150 text-sm">Contact</Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[2px] mb-4">Trust</h4>
            <div className="space-y-2.5">
              <div className="text-sm text-[var(--text-tertiary)]">Open-source foundations</div>
              <div className="text-sm text-[var(--text-tertiary)]">Extreme privacy</div>
              <div className="text-sm text-[var(--text-tertiary)]">Long-term autonomy</div>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--border-default)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[var(--text-disabled)]">All work is grounded in open-source foundations, extreme privacy, and long-term autonomy.</div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-[var(--text-disabled)]">Delta V · 2026</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--text-disabled)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />Systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
