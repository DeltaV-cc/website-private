import type { ReactNode } from 'react';

/**
 * Lightweight course inline markup:
 * - **bold** → <strong>
 * - `code` → <code>
 * Plain text otherwise. No full markdown.
 */
export function formatCourseText(text: string): ReactNode {
  if (!text) return text;
  if (!text.includes('**') && !text.includes('`')) return text;

  const nodes: ReactNode[] = [];
  // Split keeping **...** and `...` tokens
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      nodes.push(
        <strong key={i} className="course-em font-semibold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>,
      );
      return;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      nodes.push(
        <code
          key={i}
          className="course-code rounded px-1 py-0.5 font-mono text-[0.9em] text-[var(--text-primary)] bg-[var(--surface-card)] border border-[var(--border-default)]"
        >
          {part.slice(1, -1)}
        </code>,
      );
      return;
    }
    nodes.push(part);
  });

  return nodes.length === 1 ? nodes[0] : nodes;
}
