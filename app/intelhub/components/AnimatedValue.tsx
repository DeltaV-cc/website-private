'use client';
/* Animated counter that eases to target value */
import { useEffect, useState, useRef } from 'react';

export default function AnimatedValue({ value, format, className }: { value: number; format?: (n: number) => string; className?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev === value) { setDisplay(value); prevRef.current = value; return; }
    const duration = 600;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const current = prev + (value - prev) * eased;
      setDisplay(current);
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    prevRef.current = value;
  }, [value]);

  const formatted = format ? format(display) : display.toLocaleString();
  return <span className={className}>{formatted}</span>;
}
