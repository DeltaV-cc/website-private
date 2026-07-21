'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { PageBackdrop } from './PageShell';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/website-private/';

  return (
    <div className="relative min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)] font-sans flex flex-col">
      {/* Skip link - keyboard users jump past sticky nav */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <PageBackdrop home={isHome} />
      <main id="main-content" className="relative z-10 flex-1 pt-16" tabIndex={-1}>
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
