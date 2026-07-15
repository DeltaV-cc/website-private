'use client';
/* Chart hover tooltip hooks and formatters */
import { useCallback, useState } from 'react';

export interface ChartPoint {
  t: string; // ISO timestamp
  v: number; // value
}

export function useChartHover(points: ChartPoint[]) {
  const [hover, setHover] = useState<{ point: ChartPoint; x: number; y: number; changeFromStart?: number } | null>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!points || points.length === 0) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const idx = Math.floor(ratio * (points.length - 1));
    const point = points[Math.min(idx, points.length - 1)];
    const firstVal = points[0]?.v;
    const changeFromStart = firstVal && firstVal !== 0 ? ((point.v - firstVal) / firstVal) * 100 : undefined;
    setHover({ point, x: e.clientX - rect.left, y: e.clientY - rect.top, changeFromStart });
  }, [points]);

  const onLeave = useCallback(() => setHover(null), []);

  return { hover, onMove, onLeave };
}

export function formatValue(v: number): string {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
  return `$${v.toFixed(2)}`;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return iso; }
}
