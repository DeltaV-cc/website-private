/**
 * Open Video 01 — teaser with clearer promise (full modules later).
 */

export const OPEN_VIDEO_META = {
  id: 'open-video',
  href: '/forge/course/open-video/',
  title: 'Open Video',
  courseCode: '03',
  tagline: 'Motion is not “slides that move.” Different stack, different failure modes.',
  description:
    'Course 03 (teaser). After Open Design: timelines, renders, captions, HyperFrames-first motion, Remotion when you want React-level control. Do not start here if you cannot ship a deck offline yet.',
  prereq:
    'My First AI Agent Part I required. Open Design 01 strongly recommended (brief + stills + brand file).',
  status: 'teaser' as const,
};

export const OPEN_VIDEO_OUTLINE = [
  {
    code: 'A',
    title: 'Motion mental model',
    text: 'Timeline vs slide deck. Why iteration costs minutes, not seconds. When not to use video.',
  },
  {
    code: 'B',
    title: 'HyperFrames path (default)',
    text: 'HTML-native compositions on Hermes. Script → scenes → captions → MP4. One short piece end-to-end.',
  },
  {
    code: 'C',
    title: 'Stills into motion',
    text: 'Import Design 01 / Imagine keyframes. Storyboard before render. Kill weak frames early.',
  },
  {
    code: 'D',
    title: 'Remotion path (advanced)',
    text: 'React compositions and agent skills when you need code-level ownership and reuse.',
  },
  {
    code: 'E',
    title: 'Studio habits',
    text: 'Render budgets, naming, review before publish. Multi-agent video pipelines later — not day one.',
  },
];

export const OPEN_VIDEO_LAB_THEMES = [
  'HyperFrames on Hermes — default open motion path',
  'Short promo / keyframe spots (HTML + optional Three.js class effects)',
  'Short film loop from generative stills (FLUX-class or Imagine frames)',
  'Engine map only: P5 / Manim / TouchDesigner — pick zero or one later, not all',
];
