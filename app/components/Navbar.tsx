'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/ai/', label: 'AI' },
  { href: '/web3/', label: 'Web3' },
  { href: '/forge/', label: 'Forge' },
  { href: '/blog/', label: 'Blog' },
  { href: '/intelhub/', label: 'IntelHub' },
  { href: '/contact/', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-semibold tracking-[-1px]">
          Delta V
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#00f0ff] transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          <span className={`block w-5 h-[2px] bg-[#ededed] transition-all duration-200 ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-[#ededed] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-[#ededed] transition-all duration-200 ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-[#222] bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-sm hover:bg-[#1a1a1a] hover:text-[#00f0ff] transition-colors"
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
