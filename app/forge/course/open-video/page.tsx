import type { Metadata } from 'next';
import Link from 'next/link';
import { VideoLandingVisuals } from '@/app/components/course/CourseVisuals';
import {
  OPEN_VIDEO_LAB_THEMES,
  OPEN_VIDEO_META,
  OPEN_VIDEO_OUTLINE,
} from '@/app/data/courses/open-video';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Open Video — Course 03 (teaser) | Delta V',
  description: OPEN_VIDEO_META.description,
  openGraph: {
    title: OPEN_VIDEO_META.title,
    description: OPEN_VIDEO_META.tagline,
    url: `${SITE_URL}/forge/course/open-video/`,
    siteName: 'Delta V',
    type: 'website',
  },
};

export default function OpenVideoTeaserPage() {
  return (
    <main className="page-container pt-16 md:pt-20 pb-24">
      <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
        <Link href="/forge/" className="text-[var(--text-muted)] hover:text-[var(--accent-orange)]">
          Forge
        </Link>
        <span className="text-[var(--text-disabled)]">/</span>
        <span className="text-[var(--text-secondary)]">Open Video</span>
      </div>

      <div className="eyebrow text-[var(--accent-purple)]">
        Roadmap · teaser (not live mastery)
      </div>
      <h1 className="section-title mt-3">{OPEN_VIDEO_META.title}</h1>
      <p className="mt-6 max-w-2xl text-xl text-[var(--text-secondary)] leading-relaxed">
        {OPEN_VIDEO_META.tagline}
      </p>
      <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
        {OPEN_VIDEO_META.description}
      </p>
      <p className="mt-3 text-sm text-[var(--text-tertiary)]">
        <span className="font-mono text-xs uppercase tracking-[1px] text-[var(--accent-cyan)]">
          Prerequisite
        </span>{' '}
        {OPEN_VIDEO_META.prereq}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/forge/course/open-design/" className="button-primary">
          Do Open Design first ↗
        </Link>
        <Link href="/forge/course/my-first-ai-agent/" className="button-secondary">
          My First AI Agent
        </Link>
        <Link href="/contact/?topic=open-video" className="button-secondary">
          Contact
        </Link>
      </div>

      <section className="mt-14" aria-labelledby="ov-glance">
        <h2 id="ov-glance" className="text-2xl font-semibold tracking-tight">
          At a glance
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          Static design vs motion stack — different success metric, different course.
        </p>
        <VideoLandingVisuals />
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Why not fold this into Design?</h2>
        <ul className="mt-4 space-y-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          <li>· Different success metric: rendered MP4 vs openable PPTX</li>
          <li>· Different time cost: renders and iteration loops</li>
          <li>· Different stack: HyperFrames / Remotion vs DESIGN.md + stills</li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">Planned outline</h2>
        <div className="mt-6 divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
          {OPEN_VIDEO_OUTLINE.map((block) => (
            <div key={block.code} className="grid md:grid-cols-[4rem_1fr] gap-4 py-5">
              <span className="font-mono text-xs text-[var(--accent-orange)]">{block.code}</span>
              <div>
                <h3 className="text-lg font-semibold">{block.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{block.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">Lab themes (coming)</h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-2xl">
          Research themes we will turn into written labs — not a third-party video dump.
        </p>
        <ul className="mt-5 space-y-2 max-w-2xl">
          {OPEN_VIDEO_LAB_THEMES.map((theme) => (
            <li
              key={theme}
              className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-card)] px-4 py-3 text-sm text-[var(--text-secondary)]"
            >
              {theme}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
