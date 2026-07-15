'use client';

import { useRef } from 'react';
import BrandGlyph from './BrandGlyph';

export default function SpotlightField({ kind = 'ai' }: { kind?: 'ai' | 'web3' | 'forge' | 'opsec' }) {
  const ref = useRef<HTMLDivElement>(null);
  return <div ref={ref} className="spotlight-field" onPointerMove={(event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  }}>
    <div className="spotlight-grid" />
    <div className="spotlight-glow" />
    <BrandGlyph kind={kind} className="spotlight-glyph" />
    <span className="spotlight-caption">LOCAL / SIGNAL / CONTROL</span>
  </div>;
}
