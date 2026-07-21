import type { ReactNode } from 'react';

export default function AnimatedBackground({ children }: { children: ReactNode }) {
  return <div className="animated-background">
    <span className="animated-background-wash" aria-hidden="true" />
    <div className="relative z-10">{children}</div>
  </div>;
}
