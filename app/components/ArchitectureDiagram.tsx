'use client';

import React from 'react';

export type ArchNode = {
  title: string;
  subtitle?: string;
  accent?: 'cyan' | 'orange' | 'purple' | 'amber' | 'default';
};

export type ArchLayer = {
  id: string;
  label: string;
  accent?: 'cyan' | 'orange' | 'purple' | 'amber';
  nodes: ArchNode[];
};

const layerAccent: Record<string, string> = {
  cyan: 'text-[var(--accent-cyan)] border-[var(--accent-cyan)]/25',
  orange: 'text-[var(--accent-orange)] border-[var(--accent-orange)]/25',
  purple: 'text-[var(--accent-purple)] border-[var(--accent-purple)]/25',
  amber: 'text-[var(--accent-amber)] border-[var(--accent-amber)]/25',
};

const nodeAccent: Record<string, string> = {
  cyan: 'border-[var(--accent-cyan)]/35',
  orange: 'border-[var(--accent-orange)]/35',
  purple: 'border-[var(--accent-purple)]/35',
  amber: 'border-[var(--accent-amber)]/35',
  default: 'border-[var(--border-default)]',
};

/**
 * Responsive layered architecture diagram for tutorials and OpSec guides.
 * Code-built (not a raster) so labels stay sharp on every breakpoint.
 */
export default function ArchitectureDiagram({
  title,
  subtitle,
  layers,
  className = '',
}: {
  title?: string;
  subtitle?: string;
  layers: ArchLayer[];
  className?: string;
}) {
  return (
    <figure
      className={`rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden my-8 ${className}`}
      aria-label={title || 'Architecture diagram'}
    >
      {(title || subtitle) && (
        <figcaption className="px-5 md:px-6 pt-5 pb-3 border-b border-[var(--border-default)]">
          {title && (
            <div className="text-base md:text-lg font-semibold tracking-tight text-[var(--text-primary)]">
              {title}
            </div>
          )}
          {subtitle && (
            <div className="text-xs md:text-sm text-[var(--accent-cyan)] mt-1 tracking-wide">
              {subtitle}
            </div>
          )}
        </figcaption>
      )}

      <div className="p-4 md:p-6 space-y-0 relative">
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(90deg, var(--border-default) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {layers.map((layer, li) => {
          const la = layer.accent || 'cyan';
          return (
            <div key={layer.id} className="relative">
              {li > 0 && (
                <div className="flex justify-center py-2" aria-hidden="true">
                  <div className="flex flex-col items-center gap-0.5 text-[var(--accent-cyan)]">
                    <span className="w-px h-3 bg-[var(--accent-cyan)]/50" />
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="currentColor">
                      <path d="M5 8L0 0h10L5 8z" />
                    </svg>
                  </div>
                </div>
              )}

              <div
                className={`relative rounded-xl border bg-[var(--bg-surface)]/90 p-3 md:p-4 ${layerAccent[la]}`}
              >
                <div className={`text-[10px] font-semibold tracking-[2px] uppercase mb-3 ${layerAccent[la].split(' ')[0]}`}>
                  {layer.label}
                </div>
                <div
                  className={`grid gap-2 ${
                    layer.nodes.length === 1
                      ? 'grid-cols-1'
                      : layer.nodes.length === 2
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {layer.nodes.map((node) => (
                    <div
                      key={node.title}
                      className={`rounded-lg border bg-[var(--bg-deep)] px-3.5 py-3 ${nodeAccent[node.accent || 'default']}`}
                    >
                      <div className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                        {node.title}
                      </div>
                      {node.subtitle && (
                        <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                          {node.subtitle}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}

/** Compact horizontal flow (A -> B -> C) for simpler tutorial stacks */
export function ArchitectureFlow({
  title,
  steps,
  accent = 'cyan',
}: {
  title?: string;
  steps: { label: string; detail?: string }[];
  accent?: 'cyan' | 'orange' | 'amber' | 'purple';
}) {
  const color =
    accent === 'orange'
      ? 'var(--accent-orange)'
      : accent === 'amber'
        ? 'var(--accent-amber)'
        : accent === 'purple'
          ? 'var(--accent-purple)'
          : 'var(--accent-cyan)';

  return (
    <figure className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden my-8">
      {title && (
        <figcaption className="px-5 pt-4 pb-2 text-sm font-semibold text-[var(--text-primary)]">
          {title}
        </figcaption>
      )}
      <div className="flex flex-wrap items-stretch gap-2 p-4 md:p-5">
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            {i > 0 && (
              <div className="hidden sm:flex items-center text-[var(--text-muted)] px-0.5" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-[140px] rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] px-3.5 py-3">
              <div className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1" style={{ color }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-sm font-medium text-[var(--text-primary)]">{step.label}</div>
              {step.detail && (
                <div className="text-[11px] text-[var(--text-muted)] mt-1">{step.detail}</div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </figure>
  );
}
