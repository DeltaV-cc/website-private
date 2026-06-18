'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidProps {
  chart: string;
  caption?: string;
  className?: string;
}

export default function Mermaid({ chart, caption, className = '' }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const render = async () => {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            background: '#0a0a0a',
            primaryColor: '#1a1a2e',
            primaryBorderColor: '#00f0ff',
            primaryTextColor: '#ededed',
            lineColor: '#333',
            secondaryColor: '#111',
            tertiaryColor: '#0a0a0a',
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
          const { svg } = await mermaid.render('mermaid-' + Math.random().toString(36).slice(2), chart);
          ref.current.innerHTML = svg;
          setRendered(true);
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to render diagram');
      }
    };
    render();
    return () => { mounted = false; };
  }, [chart]);

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
        className="flex justify-center py-4 rounded-xl border border-[#222] bg-[#0a0a0a] overflow-x-auto"
      />
      {caption && (
        <figcaption className="text-center text-sm text-[#666] mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
