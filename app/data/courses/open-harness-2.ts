/**
 * Own Your AI — the public course, in the aihero.dev reading experience.
 *
 * The 13 modules are re-exported from open-harness.ts on purpose: that file
 * remains the single source of curriculum content and progress ids (courseId +
 * block ids). This module only carries the course's public-facing branding.
 */
import type { LocaleString } from '@/app/data/courses/open-harness';

export {
  OPEN_HARNESS_MODULES,
  OPEN_HARNESS_PARTS,
  UI_COPY,
  getModule,
  getModuleIndex,
  t,
  type CourseLang,
  type CourseModule,
} from '@/app/data/courses/open-harness';

const L = (en: string, fr?: string): LocaleString => ({ en, fr: fr ?? en });

export const OH2_META = {
  id: 'own-your-ai',
  href: '/forge/course/open-harness/',
  title: L('Own Your AI'),
  tagline: L(
    'Thirteen free lessons to build your own agent harness — yours to run and change, instead of renting one from Claude or OpenAI. No code required.',
  ),
  description: L(
    'Thirteen lessons across two parts. Start from zero — no engineering background needed — and finish with an agent installed, configured, and working for you. Bring your own models: free cloud routes to start, local weights when you want them.',
  ),
} as const;
