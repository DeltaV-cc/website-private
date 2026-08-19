import type { ReactNode } from 'react';
import { withBasePath } from '@/lib/site';
import { PrivacyWarningChip } from '@/app/components/course/PrivacyWarningChip';
import { TermChip } from '@/app/components/course/TermChip';
import { hrefFor } from '@/lib/i18n';
import type { CourseLang } from '@/app/data/courses/open-harness';

/**
 * Lightweight course inline markup. Four channels, deliberately:
 *
 * - `**bold**`            → <strong class="course-em">   — brightens .72 → 1.0
 * - `` `code` ``          → <code class="course-code">   — literals, paths, commands
 * - `[label](href)`       → <a class="course-link">      — accent-coloured link
 * - `[label](~term-id)`   → label + inline glossary ⓘ    — definition where the word is
 *
 * The `~` link form is what puts a TermChip next to the word it explains,
 * instead of a detached row of ⓘ buttons at the top of the lesson.
 *
 * Styling lives in globals.css under @layer components — do not re-add Tailwind
 * fallbacks here, they only fight the layered rules.
 */
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

export function formatCourseText(text: string, lang: CourseLang = 'en'): ReactNode {
  if (!text) return text;
  if (!text.includes('**') && !text.includes('`') && !text.includes('](')) return text;

  const nodes: ReactNode[] = [];
  const parts = text.split(TOKEN);

  parts.forEach((part, i) => {
    if (!part) return;

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      nodes.push(
        <strong key={i} className="course-em">
          {part.slice(2, -2)}
        </strong>,
      );
      return;
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      nodes.push(
        <code key={i} className="course-code">
          {part.slice(1, -1)}
        </code>,
      );
      return;
    }

    const link = LINK.exec(part);
    if (link) {
      const [, label, href] = link;

      // `~term-id` → inline glossary chip on the word itself.
      if (href === '~privacy-warning') {
        nodes.push(<PrivacyWarningChip key={i} />);
        return;
      }

      // `~term-id` → inline glossary chip on the word itself.
      if (href.startsWith('~')) {
        nodes.push(
          <span key={i} className="course-term">
            {label}
            <TermChip termId={href.slice(1)} lang={lang} />
          </span>,
        );
        return;
      }

      const external = /^https?:\/\//.test(href);
      const localized = external ? href : hrefFor(href, lang);
      nodes.push(
        <a
          key={i}
          className="course-link"
          href={external ? href : withBasePath(localized)}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
          {external ? ' ↗' : ''}
        </a>,
      );
      return;
    }

    nodes.push(part);
  });

  return nodes.length === 1 ? nodes[0] : nodes;
}
