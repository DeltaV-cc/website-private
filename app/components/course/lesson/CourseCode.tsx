import { formatCourseText } from '@/app/components/course/formatCourseText';
import { t, type CourseCodeBlock, type CourseLang } from '@/app/data/courses/open-harness';
import { CopyButton } from './CopyButton';

/**
 * A runnable command, with the copy button in the label row rather than
 * floating over the code — that is what lets it be visible at rest instead of
 * appearing on hover and covering the first characters.
 *
 * The `$` prompt on shell blocks is drawn by CSS (`::before`), so it is
 * physically impossible to select or copy it.
 */
export function CourseCode({ block, lang }: { block: CourseCodeBlock; lang: CourseLang }) {
  const shell = block.lang === 'sh' || block.lang === 'ps';

  return (
    <figure className="course-code-block">
      <div className="course-code-head">
        <span className="course-code-label">
          {block.label ? t(block.label, lang) : (block.lang ?? 'text')}
        </span>
        <CopyButton value={block.copy ?? block.code} />
      </div>
      <pre className="course-code-pre" data-prompt={shell ? block.lang : undefined}>
        <code>{block.code}</code>
      </pre>
      {block.note && (
        <figcaption className="course-code-note">{formatCourseText(t(block.note, lang), lang)}</figcaption>
      )}
    </figure>
  );
}
