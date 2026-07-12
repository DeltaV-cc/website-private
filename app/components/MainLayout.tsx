'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
