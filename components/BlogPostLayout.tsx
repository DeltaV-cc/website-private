'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import BackLink from '@/app/components/BackLink';

interface BlogPostProps {
  title: string;
  date: string;
  category: string;
  type?: string;
  excerpt?: string;
  children: ReactNode;
  readingTime?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  backHref?: string;
  backLabel?: string;
}

type TocItem = { id: string; text: string; level: number };

const accentFor = (key: string): string => {
  const k = key.trim().toLowerCase();
  if (k === 'ai' || k === 'tutorial' || k === 'dashboard' || k === 'tool') return 'var(--accent-cyan)';
  if (k === 'web3' || k === 'macro') return 'var(--accent-orange)';
  if (k === 'opsec' || k === 'thought' || k === 'infosec') return 'var(--accent-amber)';
  if (k === 'hardware' || k === 'deep dive') return 'var(--accent-purple)';
  if (k === 'crypto' || k === 'defi weekly' || k === 'the signal' || k === 'weekly delta financial brief') return 'var(--accent-gold)';
  if (k === 'research') return 'var(--accent-green)';
  return 'var(--accent-cyan)';
};

const badge = (label: string) => {
  const c = accentFor(label.trim());
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide uppercase border"
      style={{ color: c, background: `color-mix(in srgb, ${c} 8%, transparent)`, borderColor: `color-mix(in srgb, ${c} 25%, transparent)` }}
    >
      {label.trim()}
    </span>
  );
};

export default function BlogPostLayout({
  title,
  date,
  category,
  type = 'Thought',
  excerpt,
  children,
  readingTime,
  sourceLabel,
  sourceUrl,
  backHref = '/blog/',
  backLabel = 'All articles',
}: BlogPostProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [active, setActive] = useState('');
  const [tocOpen, setTocOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  // Reading-progress bar: fills as the reader scrolls the page.
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    const slug = (s: string) =>
      s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 60);

    const used = new Set<string>();
    // Exclude headings inside dynamically-injected newsletter HTML (.artemis-body)
    // so the table of contents only reflects the article's own sections.
    const heads = (Array.from(el.querySelectorAll('h2, h3')) as HTMLElement[]).filter(
      (h) => !h.closest('.artemis-body')
    );
    const items: TocItem[] = heads
      .map((h, i) => {
        const text = (h.textContent || '').trim();
        let id = h.id || slug(text) || `section-${i}`;
        while (used.has(id)) id = `${id}-${i}`;
        used.add(id);
        h.id = id;
        return { id, text, level: h.tagName === 'H3' ? 3 : 2 };
      })
      .filter((it) => it.text);
    setToc(items);

    // Inject a copy button on every code block.
    el.querySelectorAll('pre').forEach((pre) => {
      const p = pre as HTMLElement;
      if (p.dataset.enhanced) return;
      p.dataset.enhanced = '1';
      const original = ((pre.querySelector('code') as HTMLElement) || p).textContent || '';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dv-copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.addEventListener('click', () => {
        const flash = (ok: boolean) => {
          btn.textContent = ok ? 'Copied' : 'Copy failed';
          if (ok) btn.dataset.copied = 'true';
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.removeAttribute('data-copied');
          }, 1600);
        };
        const legacyCopy = () => {
          try {
            const ta = document.createElement('textarea');
            ta.value = original;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            flash(ok);
          } catch {
            flash(false);
          }
        };
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(original).then(() => flash(true), legacyCopy);
        } else {
          legacyCopy();
        }
      });
      pre.appendChild(btn);
    });

    // Highlight the section currently in view.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );
    heads.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  // Newsletter HTML is injected after the initial render. Keep those external
  // images out of the first paint and let the browser decode them off-thread.
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    const prepareImages = () => {
      el.querySelectorAll('img').forEach((image) => {
        const img = image as HTMLImageElement;
        if (!img.hasAttribute('loading')) img.loading = 'lazy';
        img.decoding = 'async';
      });
    };

    prepareImages();
    const observer = new MutationObserver(prepareImages);
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const handleTocClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      // scrollIntoView can place a heading underneath the fixed navbar. Use
      // the actual header height so desktop and mobile stay aligned.
      const header = document.querySelector('header');
      const headerHeight = header?.getBoundingClientRect().height ?? 64;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
      setActive(id);
    }
  };

  const tocList = (
    <ul className="space-y-1 text-sm border-l border-[var(--border-default)]">
      {toc.map((t) => (
        <li key={t.id}>
          <a
            href={`#${t.id}`}
            onClick={(e) => handleTocClick(e, t.id)}
            className={`block -ml-px border-l pl-3 py-1 leading-snug transition-colors ${
              t.level === 3 ? 'pl-6' : ''
            } ${
              active === t.id
                ? 'border-[var(--accent-cyan)] text-[var(--accent-cyan)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="article-reading-page min-h-screen">
      {/* Reading-progress bar — fills as the reader scrolls, sits below fixed navbar */}
      <div className="fixed top-16 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-[var(--bg-surface)]/40">
        <div
          className="h-full transition-[width] duration-75 ease-out"
          style={{
            width: `${progress}%`,
            background:
              'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple), var(--accent-amber), var(--accent-orange))',
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-20 pb-24">
        <BackLink
          fallback={backHref}
          label={backLabel}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors mb-10 group"
        />

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
          {/* Main column */}
          <div className="max-w-[720px] min-w-0">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {category.split(',').map((cat, i) => (
                  <span key={i}>{badge(cat)}</span>
                ))}
                {type && type.split(',').map((t, i) => (
                  <span key={`t${i}`}>{badge(t)}</span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-[-1.5px] leading-tight mb-5">
                {title}
              </h1>
              <div className="flex items-center flex-wrap gap-3 text-sm text-[var(--text-muted)]">
                <span>{date}</span>
                {readingTime && (
                  <>
                    <span className="text-[var(--text-disabled)]">·</span>
                    <span>{readingTime}</span>
                  </>
                )}
              </div>
              {excerpt && (
                <p className="text-lg text-[var(--text-tertiary)] mt-6 leading-relaxed border-l-2 border-[var(--accent-cyan)]/30 pl-5">
                  {excerpt}
                </p>
              )}
              {(sourceLabel || sourceUrl) && (
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mt-6">
                  {sourceLabel && (
                    <span>
                      Intel source: <span className="text-[var(--text-secondary)]">{sourceLabel}</span>
                    </span>
                  )}
                  {sourceUrl && (
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-cyan)] hover:underline ml-1"
                    >
                      View original →
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent mb-8" />

            {/* Collapsible TOC — mobile / narrow */}
            {toc.length > 1 && (
              <details className="lg:hidden mb-8 rounded-xl border border-[var(--border-default)] bg-[rgba(8,11,10,.9)] px-4 py-3" open>
                <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  On this page
                </summary>
                <div className="mt-3">{tocList}</div>
              </details>
            )}

            {/* Article body */}
            <article ref={articleRef} className="article-prose">
              {children}
            </article>

            {/* Intel pipeline note */}
            <div className="border border-[var(--border-default)] rounded-2xl p-6 mt-16 bg-[var(--bg-surface)]">
              <div className="flex items-start gap-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4m0-4h.01" />
                </svg>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--accent-cyan)]">Delta V Intel pipeline</strong> — generated and verified through the Delta V intelligence system.
                  </p>
                  <Link href="/intelhub/" className="text-[var(--accent-cyan)] text-sm hover:underline mt-2 inline-block">
                    Explore IntelHub →
                  </Link>
                </div>
              </div>
            </div>

            {/* Newsletter / contact CTA */}
            <div className="mt-8 border-t border-[var(--border-default)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[var(--text-tertiary)]">Want high-signal intel like this in your inbox?</p>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-orange)] text-white rounded-xl text-sm font-medium hover:bg-[#d94d0f] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Get in touch
              </Link>
            </div>
          </div>

          {/* Sticky TOC — desktop */}
          <aside className="hidden lg:block">
            {toc.length > 1 && (
              <nav aria-label="Table of contents" className="sticky top-24 rounded-xl border border-[var(--border-default)] bg-[rgba(8,11,10,.9)] p-4 shadow-[0_16px_40px_rgba(0,0,0,.18)]">
                <button
                  type="button"
                  onClick={() => setTocOpen((o) => !o)}
                  className="flex items-center justify-between w-full text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-3"
                >
                  On this page
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transition-transform ${tocOpen ? '' : '-rotate-90'}`}
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {tocOpen && tocList}
              </nav>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
