/**
 * My First AI Agent — the public course, in the aihero.dev reading experience.
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
  id: 'my-first-ai-agent',
  href: '/forge/course/my-first-ai-agent/',
  title: L('My First AI Agent', 'Mon premier agent IA'),
  tagline: L(
    'Set up a state-of-the-art AI agent, free, in thirteen lessons. No code required.',
    'Mettez en place un agent IA à l’état de l’art, gratuitement, en treize leçons. Sans écrire une ligne de code.',
  ),
  description: L(
    'Start from zero and finish with an agent that reads your files, runs real tasks, and answers on your phone. Free models throughout — you pay nothing to complete this course. [⚠](~privacy-warning)',
    'Partez de zéro et terminez avec un agent qui lit vos fichiers, exécute de vraies tâches et vous répond sur votre téléphone. Des modèles gratuits du début à la fin — vous ne payez rien pour suivre ce cours. [⚠](~privacy-warning)',
  ),
} as const;
