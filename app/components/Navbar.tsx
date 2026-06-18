'use client';

import React from 'react';

export default function Navbar() {
  return (
    <nav className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="text-2xl font-semibold tracking-[-1px]">Delta V</a>
        </div>
        <div className="flex items-center gap-8 text-sm">
          <a href="/ai" className="hover:text-[#00f0ff] transition-colors">AI</a>
          <a href="/web3" className="hover:text-[#00f0ff] transition-colors">Web3</a>
          <a href="/forge" className="hover:text-[#00f0ff] transition-colors">Forge</a>
          <a href="/blog" className="hover:text-[#00f0ff] transition-colors">Blog</a>
          <a href="/intelhub" className="hover:text-[#00f0ff] transition-colors">IntelHub</a>
          <a href="/contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}
