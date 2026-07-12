'use client';

import React from 'react';

interface SparklineProps {
  data: number[]; width?: number; height?: number; color?: string;
  fillOpacity?: number; strokeWidth?: number; className?: string;
}

export default function Sparkline({
  data, width = 64, height = 28, color = 'var(--accent-cyan)',
  fillOpacity = 0.15, strokeWidth = 1.5, className = '',
}: SparklineProps) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data); const max = Math.max(...data); const range = max - min || 1;
  const padY = height * 0.15; const drawH = height - padY * 2;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padY + drawH - ((v - min) / range) * drawH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const pathD = `M ${points.join(' L ')}`;
  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`sparkline-container ${className}`} preserveAspectRatio="none">
      <path d={fillD} fill={color} opacity={fillOpacity} />
      <path d={pathD} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
