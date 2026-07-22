import Link from 'next/link';
import type { ContentEntry } from '../data/content-index';

const labels: Record<ContentEntry['type'], string> = { blog: 'Blog', tutorial: 'Tutorial', course: 'AI Course', page: 'Page', guide: 'Guide' };

export default function ContentResult({ entry }: { entry: ContentEntry }) {
  return <article className="content-result listing-card group">
    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[.14em] font-mono text-[var(--text-muted)]">
      <span className="text-[var(--accent-cyan)]">{labels[entry.type]}</span><span>·</span><span>{entry.domain}</span>{entry.date && <><span>·</span><span>{entry.date}</span></>}
    </div>
    <Link href={entry.href} className="block mt-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan)]">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-[var(--accent-cyan)] transition-colors">{entry.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">{entry.excerpt}</p>
    </Link>
    <div className="mt-4 flex flex-wrap gap-2">{entry.tags.slice(0, 5).map((tag) => <span key={tag} className="text-[10px] text-[var(--text-muted)] border border-[var(--border-default)] px-2 py-1">{tag}</span>)}</div>
  </article>;
}
