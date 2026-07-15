'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/' || pathname === '';
  // Match exact segment or nested routes (e.g. /blog/post, /opsec/linux)
  const base = href.replace(/\/$/, '');
  return pathname === href || pathname === base || pathname.startsWith(`${base}/`);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';
  const menuId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape + body scroll lock while menu is open
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <nav
      className="fixed top-0 w-full z-50 border-b border-[var(--border-default)] bg-[var(--bg-deep)]/80 backdrop-blur-xl"
      aria-label="Primary"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 group rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
            aria-label="Delta V - Home"
          >
            <span className="flex-shrink-0 transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.35)]">
              <Logo size={28} />
            </span>
            <span className="text-lg font-semibold tracking-[-0.5px]">Delta V</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5" role="list">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="listitem"
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3.5 py-2 text-sm rounded-lg transition-colors duration-150 ${
                    active
                      ? 'text-[var(--text-primary)] bg-white/[0.05]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute left-3.5 right-3.5 -bottom-[1px] h-[2px] rounded-full bg-[var(--accent-cyan)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            ref={closeBtnRef}
            type="button"
            className="md:hidden flex flex-col justify-center gap-1.5 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls={menuId}
          >
            <span
              className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-200 origin-center ${
                open ? 'rotate-45 translate-y-[5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-200 ${
                open ? 'opacity-0 translate-x-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-200 origin-center ${
                open ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          id={menuId}
          className="md:hidden border-t border-[var(--border-default)] bg-[var(--bg-deep)]/95 backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="max-w-[1440px] mx-auto px-6 py-3 max-h-[calc(100dvh-4rem)] overflow-y-auto">
            {NAV_ITEMS.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-4 py-3 rounded-xl text-sm transition-all duration-150 animate-fade-in-up ${
                    active
                      ? 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/[0.06] font-medium'
                      : 'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-white/[0.04]'
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
