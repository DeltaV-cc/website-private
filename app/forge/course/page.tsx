import Link from 'next/link';
import { OPEN_DESIGN_PARTS } from '@/app/data/courses/open-design';
import { OPEN_HARNESS_PARTS } from '@/app/data/courses/open-harness';
import { HARNESS_LABS } from '@/app/data/courses/harness-labs';

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function AICoursePage() {
  return (
    <main className="page-container pt-16 md:pt-20 pb-24">
      <div className="mb-6">
        <Link href="/forge/" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-orange)]">
          ← Forge
        </Link>
      </div>

      <div className="eyebrow text-[var(--accent-orange)]">AI Mastery</div>
      <h1 className="section-title mt-3">Course map</h1>
      <p className="mt-4 max-w-lg text-[var(--text-secondary)]">
        Two live courses. Labs after Harness install. More tracks later.
      </p>

      <section className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">01 · Open Harness</h2>
          <Link
            href="/forge/course/open-harness/"
            className="text-sm font-medium text-[var(--accent-orange)]"
          >
            Course home <Arrow />
          </Link>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {OPEN_HARNESS_PARTS.map((part) => (
            <Link
              key={part.id}
              href={`/forge/course/open-harness/${part.startSlug}/`}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-5 hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-orange)]">
                Part {part.code}
              </div>
              <div className="mt-2 text-lg font-semibold">{part.title.en}</div>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{part.subtitle.en}</p>
              <span className="mt-4 inline-block text-sm text-[var(--accent-orange)]">
                Open Part {part.code} <Arrow />
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/forge/course/open-harness/labs/"
          className="mt-5 inline-block text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-orange)]"
        >
          Labs ({HARNESS_LABS.length}) after Part I →
        </Link>
      </section>

      <section className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">02 · Open Design</h2>
          <Link
            href="/forge/course/open-design/"
            className="text-sm font-medium text-[var(--accent-cyan)]"
          >
            Course home <Arrow />
          </Link>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {OPEN_DESIGN_PARTS.map((part) => (
            <Link
              key={part.id}
              href={`/forge/course/open-design/${part.startSlug}/`}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-5 hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
                Part {part.code}
              </div>
              <div className="mt-2 text-lg font-semibold">{part.title.en}</div>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{part.subtitle.en}</p>
              <span className="mt-4 inline-block text-sm text-[var(--accent-cyan)]">
                Open Part {part.code} <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-muted)]">
          Later
        </div>
        <ul className="mt-4 space-y-2 text-sm text-[var(--text-tertiary)]">
          <li>
            <Link href="/forge/course/open-video/" className="hover:text-[var(--text-primary)]">
              Open Video — teaser
            </Link>
          </li>
          <li>
            <Link href="/forge/x402-workshop/" className="hover:text-[var(--text-primary)]">
              x402 workshop outline
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
