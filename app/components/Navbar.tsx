'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const NAV_ITEMS = [
  { href: '/ai/', label: 'AI' },
  { href: '/web3/', label: 'Web3' },
  { href: '/forge/', label: 'Forge' },
  { href: '/opsec/', label: 'OpSec' },
  { href: '/tutorials/', label: 'Tutorials' },
  { href: '/blog/', label: 'Blog' },
  { href: '/intelhub/', label: 'IntelHub' },
  { href: '/contact/', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[var(--border-default)] bg-[var(--bg-deep)]/80 backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 group">
            <span className="flex-shrink-0 transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.35)]">
              <Logo size={28} />
            </span>
            <span className="text-lg font-semibold tracking-[-0.5px]">Delta V</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3.5 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 rounded-lg hover:bg-white/[0.04]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
          >
            <span className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-200 ${open ? 'opacity-0 translate-x-2' : ''}`} />
            <span className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-[var(--border-default)] bg-[var(--bg-deep)]/95 backdrop-blur-xl animate-fade-in">
          <div className="max-w-[1440px] mx-auto px-6 py-3">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-white/[0.04] transition-all duration-150 animate-fade-in-up"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
