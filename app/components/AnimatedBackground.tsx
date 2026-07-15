'use client';

import { useState } from 'react';

export default function AnimatedBackground({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  return <div className={`animated-background ${active ? 'is-active' : ''}`} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
    <span className="animated-background-wash" aria-hidden="true" />
    <div className="relative z-10">{children}</div>
  </div>;
}
