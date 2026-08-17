import type { ReactNode } from 'react';
import './course.css';

/**
 * Exists only to scope the course stylesheet to the course routes.
 *
 * `course.css` is 50 KB of `.course-*` and `.aih-*` rules that no page outside
 * `/forge/course/**` uses. It used to sit at the bottom of globals.css, which
 * the root layout loads render-blocking on every page — 750 ms of it on mobile,
 * before the homepage could paint a single word. Importing it here makes Next
 * emit it as this segment's own CSS chunk.
 *
 * No wrapper element: the layout passes children straight through so the
 * existing page markup and grid are untouched.
 */
export default function CourseLayout({ children }: { children: ReactNode }) {
  return children;
}
