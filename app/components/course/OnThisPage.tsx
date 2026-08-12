'use client';

import { useEffect, useState } from 'react';

type TocItem = { id: string; text: string };

/**
 * "On this page" rail for course pages.
 *
 * Deliberately a copy of the heading-extraction + IntersectionObserver logic in
 * components/BlogPostLayout.tsx rather than a shared extraction: that layout is
 * rendered by 36 blog, tutorial and opsec pages and is not in scope here.
 *
 * Headings are read from the DOM after mount, so this works with the static
 * export — nothing is needed at build time.
 */
export function OnThisPage() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const root = document.querySelector('.course-prose');
    if (!root) return;

    const slug = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60);

    const used = new Set<string>();
    // Only top-level section headings — nested h2s inside collapsed <details>
    // would produce entries the reader cannot see.
    const heads = (Array.from(root.querySelectorAll('.course-h2')) as HTMLElement[]).filter(
      (h) => !h.closest('details'),
    );

    const next: TocItem[] = heads
      .map((h, i) => {
        const text = (h.textContent || '').trim();
        let id = h.id || slug(text) || `section-${i}`;
        while (used.has(id)) id = `${id}-${i}`;
        used.add(id);
        h.id = id;
        return { id, text };
      })
      .filter((it) => it.text);

    setItems(next);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: '-80px 0px -70% 0px' },
    );
    heads.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 2) return null;

  return (
    <nav className="course-rail-nav" aria-label="On this page">
      <div className="course-rail-title">On this page</div>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={`course-rail-link ${active === it.id ? 'is-active' : ''}`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
