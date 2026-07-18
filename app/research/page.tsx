'use client';

import { useMemo, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ContentResult from '../components/ContentResult';
import { contentIndex, type ContentEntry, type ContentType } from '../data/content-index';

const typeLabels: Record<ContentType, string> = { blog: 'Blog', tutorial: 'Tutorial', course: 'AI Course', page: 'Page', guide: 'Guide' };
const normalize = (value: string) => value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const scoreEntry = (entry: ContentEntry, query: string) => {
  if (!query) return 0;
  const q = normalize(query); const title = normalize(entry.title); const tags = normalize(entry.tags.join(' ')); const excerpt = normalize(entry.excerpt); const domain = normalize(entry.domain);
  if (title === q) return 100;
  if (title.includes(q)) return 80;
  if (tags.includes(q) || domain.includes(q)) return 55;
  if (excerpt.includes(q)) return 30;
  const tokens = q.split(' ').filter(Boolean); return tokens.every((token) => `${title} ${tags} ${domain} ${excerpt}`.includes(token)) ? 15 : -1;
};

export default function ResearchPage() {
  const [query, setQuery] = useState(() => typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('q') || ''); const [types, setTypes] = useState<string[]>([]); const [domains, setDomains] = useState<string[]>([]); const [periods, setPeriods] = useState<string[]>([]);
  const submitQuery = (value: string) => { const next = value.trim(); setQuery(next); const url = new URL(window.location.href); if (next) url.searchParams.set('q', next); else url.searchParams.delete('q'); window.history.replaceState({}, '', url); };
  const toggle = (list: string[], setter: (value: string[]) => void, value: string) => setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  const periodsAvailable = Array.from(new Set(contentIndex.map((entry) => entry.date).filter(Boolean) as string[]));
  const results = useMemo(() => contentIndex.filter((entry) => (types.length === 0 || types.includes(entry.type)) && (domains.length === 0 || domains.includes(entry.domain)) && (periods.length === 0 || (entry.date && periods.some((period) => entry.date?.includes(period)) ))).map((entry) => ({ entry, score: scoreEntry(entry, query) })).filter(({ score }) => !query || score >= 0).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title)).map(({ entry }) => entry), [query, types, domains, periods]);
  const typeOptions = (Object.keys(typeLabels) as ContentType[]).map((type) => ({ value: type, label: typeLabels[type], count: contentIndex.filter((entry) => entry.type === type).length }));
  const domainOptions = Array.from(new Set(contentIndex.map((entry) => entry.domain))).map((domain) => ({ value: domain, label: domain, count: contentIndex.filter((entry) => entry.domain === domain).length }));
  const periodOptions = periodsAvailable.map((period) => ({ value: period, label: period, count: contentIndex.filter((entry) => entry.date === period).length }));
  const clear = () => { setTypes([]); setDomains([]); setPeriods([]); submitQuery(''); };

  return <main className="min-h-screen page-container py-16 md:py-20" aria-labelledby="research-heading">
    <div className="max-w-3xl mb-12"><div className="eyebrow">Research / index</div><h1 id="research-heading" className="section-title mt-3">Find the signal.</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">Search across Delta V&apos;s writing, tutorials, courses, services and hardening guides.</p><form className="mt-8 relative" onSubmit={(event) => { event.preventDefault(); submitQuery((event.currentTarget.elements.namedItem('q') as HTMLInputElement).value); }}><label htmlFor="research-query" className="sr-only">Search research</label><input id="research-query" name="q" value={query} onChange={(event) => setQuery(event.target.value)} onBlur={(event) => submitQuery(event.target.value)} placeholder="research" className="w-full border-b border-[var(--border-default)] bg-transparent py-4 pr-12 text-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none" /><svg className="absolute right-1 top-4 w-6 h-6 text-[var(--accent-cyan)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5" strokeLinecap="round"/></svg></form></div>
    <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12"><aside className="mb-10 lg:mb-0"><FilterSidebar groups={[{ title: 'Type', options: typeOptions, selected: types, onToggle: (value) => toggle(types, setTypes, value) }, { title: 'Domain', options: domainOptions, selected: domains, onToggle: (value) => toggle(domains, setDomains, value) }, { title: 'Period', options: periodOptions, selected: periods, onToggle: (value) => toggle(periods, setPeriods, value) }]} onClear={clear} /></aside><section aria-live="polite"><div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-muted)]"><span>{results.length} result{results.length === 1 ? '' : 's'}{query && <> for <strong className="text-[var(--text-primary)]">{query}</strong></>}</span>{(types.length || domains.length || periods.length) ? <button className="text-[var(--accent-cyan)] hover:underline" onClick={clear}>Clear filters</button> : null}</div>{results.length ? <div className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">{results.map((entry) => <ContentResult key={entry.id} entry={entry} />)}</div> : <div className="border border-[var(--border-default)] py-20 text-center"><p className="text-lg text-[var(--text-secondary)]">No signal matches this search.</p><button onClick={clear} className="mt-3 text-sm text-[var(--accent-cyan)] hover:underline">Reset research</button></div>}</section></div>
  </main>;
}
