"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function FooterDrift({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    function update() {
      raf = 0;
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;

      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / vh;
      const tx = Math.max(-1, Math.min(1, progress)) * -60;
      el!.style.transform = `translate3d(${tx}px, 0, 0)`;
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="footer-mega-wrap" aria-hidden>
      {children}
    </div>
  );
}
