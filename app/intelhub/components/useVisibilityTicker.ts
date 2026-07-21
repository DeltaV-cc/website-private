'use client';

import { useEffect, useRef } from 'react';

type LoopMode = 'half' | 'end';

/** Low-cost horizontal ticker: pauses offscreen, in hidden tabs, and on hover. */
export function useVisibilityTicker(itemCount: number, baseSpeed = 1.2, mode: LoopMode = 'half') {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = useRef(baseSpeed);
  const raf = useRef(0);
  const pauseRef = useRef<() => void>(() => {});
  const resumeRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || itemCount === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let intersecting = false;
    let paused = false;
    let lastFrame = 0;

    const stop = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
    const start = () => {
      if (!raf.current && intersecting && !paused && document.visibilityState === 'visible') {
        raf.current = requestAnimationFrame(tick);
      }
    };
    const tick = (now: number) => {
      raf.current = 0;
      if (now - lastFrame < 32) { start(); return; }
      lastFrame = now;
      if (!paused && document.visibilityState === 'visible') {
        el.scrollLeft += speed.current;
        if (mode === 'end') {
          if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0;
        } else {
          const half = el.scrollWidth / 2;
          if (half > 0) {
            if (el.scrollLeft >= half) el.scrollLeft -= half;
            else if (el.scrollLeft < 0) el.scrollLeft += half;
          }
        }
      }
      start();
    };
    const pause = () => { paused = true; stop(); };
    const resume = () => { paused = false; start(); };
    pauseRef.current = pause;
    resumeRef.current = resume;

    const onVisibility = () => { if (document.visibilityState === 'visible') start(); else stop(); };
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry?.isIntersecting ?? false;
      if (intersecting) start(); else stop();
    }, { rootMargin: '120px' });

    observer.observe(el);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      pauseRef.current = () => {};
      resumeRef.current = () => {};
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [itemCount, mode]);

  return {
    scrollRef,
    speed,
    pause: () => pauseRef.current(),
    resume: () => resumeRef.current(),
  };
}
