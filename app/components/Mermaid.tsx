'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidProps {
  chart: string;
  caption?: string;
  className?: string;
}

/**
 * Mermaid is initialised with literal colours, not CSS variables — it inlines
 * them into the SVG it generates, so a var() would resolve once and then lie
 * after a theme switch. Each palette is therefore spelled out, and the diagram
 * is re-rendered when <html data-theme> changes.
 */
const PALETTE = {
  dark: {
    theme: 'dark' as const,
    background: '#0a0f0d',
    primaryColor: '#18221d',
    primaryBorderColor: '#8bc8cc',
    primaryTextColor: '#ededed',
    lineColor: '#3c4d44',
    secondaryColor: '#101714',
    tertiaryColor: '#0a0f0d',
    edgeLabelBackground: '#101714',
  },
  light: {
    theme: 'base' as const,
    background: '#fcfdfc',
    primaryColor: '#eaf1ee',
    primaryBorderColor: '#1f6068',
    primaryTextColor: '#14211d',
    lineColor: '#9aa9a1',
    secondaryColor: '#f2f5f2',
    tertiaryColor: '#ffffff',
    edgeLabelBackground: '#f2f5f2',
  },
};

function channels(hex: string) {
  const v = hex.replace('#', '');
  const full = v.length === 3 ? v.split('').map((c) => c + c).join('') : v;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

/** Rough relative luminance — enough to answer "is this a dark swatch?". */
function luminance(hex: string) {
  const [r, g, b] = channels(hex);
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}

function toward(hex: string, target: number, weight: number) {
  const mixed = channels(hex).map((c) => Math.round(c * (1 - weight) + target * weight));
  return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Diagram authors pin node fills inline (`style D fill:#14261c,color:#ededed`),
 * which survives any theme config mermaid is given — so a diagram written for
 * the dark theme renders as near-black blocks with near-black labels on paper.
 *
 * Fills that point the wrong way for the active theme are pulled across (a
 * dark fill becomes a pale tint of the same hue, and vice versa) and label
 * colours are snapped to that theme's ink. Strokes are left alone: they are
 * brand accents, and they read on both.
 */
function retint(chart: string, theme: 'light' | 'dark') {
  const wantDark = theme === 'dark';
  return chart
    .split('\n')
    .map((line) => {
      if (!/^\s*(style|classDef|linkStyle)\s/.test(line)) return line;
      return line.replace(/\b(fill|color)\s*:\s*(#[0-9a-fA-F]{3,6})\b/g, (match, key: string, hex: string) => {
        const isDark = luminance(hex) < 0.42;
        if (isDark === wantDark) return match;
        if (key === 'color') return `${key}:${wantDark ? '#ededed' : '#14211d'}`;
        return `${key}:${wantDark ? toward(hex, 0, 0.82) : toward(hex, 255, 0.86)}`;
      });
    })
    .join('\n');
}

export default function Mermaid({ chart, caption, className = '' }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // The attribute is set before first paint by the inline theme script, so a
  // read on mount is already correct; the observer covers later switches.
  useEffect(() => {
    const read = () => setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;
    const palette = PALETTE[theme];
    const render = async () => {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({
          startOnLoad: false,
          theme: palette.theme,
          themeVariables: {
            background: palette.background,
            primaryColor: palette.primaryColor,
            primaryBorderColor: palette.primaryBorderColor,
            primaryTextColor: palette.primaryTextColor,
            textColor: palette.primaryTextColor,
            lineColor: palette.lineColor,
            secondaryColor: palette.secondaryColor,
            tertiaryColor: palette.tertiaryColor,
            edgeLabelBackground: palette.edgeLabelBackground,
            fontSize: '14px',
          },
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
            padding: 16,
          },
          sequence: {
            useMaxWidth: true,
            showSequenceNumbers: false,
          },
          gantt: {
            useMaxWidth: true,
            barHeight: 28,
            barGap: 8,
            topAxis: true,
          },
          timeline: {
            useMaxWidth: true,
            disableMulticolor: false,
          },
        });

        if (ref.current && mounted) {
          ref.current.innerHTML = '';
          const { svg } = await mermaid.render('mermaid-' + Math.random().toString(36).slice(2), retint(chart, theme));
          ref.current.innerHTML = svg;
          setRendered(true);
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to render diagram');
      }
    };
    render();
    return () => { mounted = false; };
  }, [chart, theme]);

  if (error) {
    return (
      <div className={`my-8 rounded-xl border border-red-500/30 bg-red-500/5 p-4 ${className}`}>
        <div className="text-red-400 text-xs font-mono whitespace-pre-wrap">{error}</div>
      </div>
    );
  }

  return (
    <figure className={`my-10 ${className}`}>
      <div
        ref={ref}
        className="flex justify-center py-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-x-auto"
      />
      {caption && (
        <figcaption className="text-center text-sm text-[var(--text-muted)] mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
