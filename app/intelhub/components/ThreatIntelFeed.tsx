/* IntelHub — Digibastion Threat Intel feed card
   Fresh severity-tagged web3 + infosec items from the public corpus
   behind digibastion.com's Threat Intel page. Auto-refreshes 5 min. */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { PanelMeta } from './Shared';

type ThreatItem = {
  uid?: string;
  severity?: string;
  category?: string;
  title?: string;
  link?: string;
  source?: string;
};

const MIRROR_BASES = ['/website-private/', '/gh-pages/', '/'];

async function fetchThreatFeed(): Promise<ThreatItem[]> {
  const t = Date.now();
  for (const base of MIRROR_BASES) {
    try {
      const r = await fetch(`${base}data/digibastion-feed.json?_t=${t}`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) continue;
      const j = await r.json();
      const list = Array.isArray(j) ? j : j?.items;
      if (Array.isArray(list)) return list as ThreatItem[];
    } catch {
      /* try next mirror */
    }
  }
  return [];
}

export default function ThreatIntelFeed({
  title = 'Digibastion Threat Intel',
  accent = 'var(--accent-red)',
  categories,
  limit = 10,
}: {
  title?: string;
  accent?: string;
  categories?: string[];
  limit?: number;
}) {
  const [items, setItems] = useState<ThreatItem[] | null>(null);
  const [sevFilter, setSevFilter] = useState<'all' | 'critical' | 'high'>('all');

  useEffect(() => {
    let alive = true;
    fetchThreatFeed().then((list) => {
      if (alive) setItems(list);
    });
    const iv = window.setInterval(() => {
      fetchThreatFeed().then((list) => {
        if (alive) setItems(list);
      });
    }, 5 * 60 * 1000);
    return () => {
      alive = false;
      window.clearInterval(iv);
    };
  }, []);

  const scoped = useMemo(() => {
    if (!items) return [];
    if (!categories || !categories.length) return items;
    return items.filter((it) => categories.includes(String(it.category || '')));
  }, [items, categories]);

  const filtered = useMemo(() => {
    let list = scoped;
    if (sevFilter !== 'all') {
      list = list.filter((it) => String(it.severity || '').toLowerCase() === sevFilter);
    }
    return list.slice(0, limit);
  }, [scoped, sevFilter, limit]);

  const counts = useMemo(
    () => ({
      critical: scoped.filter((it) => String(it.severity || '').toLowerCase() === 'critical').length,
      high: scoped.filter((it) => String(it.severity || '').toLowerCase() === 'high').length,
    }),
    [scoped],
  );

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-red)]/[0.06] to-transparent">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: accent }} />
          <span className="text-xs uppercase tracking-[1.5px] font-bold truncate" style={{ color: accent }}>
            {title}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">phishing · drainers · exploits</span>
        </div>
        <PanelMeta source="digibastion feed" />
      </div>

      <div className="flex items-center gap-2 px-5 py-2 border-b border-[var(--border-default)]">
        {(['all', 'critical', 'high'] as const).map((k) => (
          <button
            key={k}
            onClick={() => setSevFilter(k)}
            className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider transition-colors ${
              sevFilter === k
                ? 'bg-white/[0.08] text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {k}
            {k !== 'all' ? ` · ${counts[k]}` : ''}
          </button>
        ))}
      </div>

      <div className="divide-y divide-white/[0.02] max-h-[360px] overflow-y-auto scrollbar-hide">
        {!items ? (
          <div className="px-5 py-6 text-center text-[10px] text-[var(--text-disabled)]">Loading threat feed…</div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-6 text-center text-[10px] text-[var(--text-disabled)]">No matching items</div>
        ) : (
          filtered.map((it, i) => (
            <a
              key={it.uid || i}
              href={it.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-2.5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <span className="text-xs text-[var(--text-primary)] leading-snug">{it.title}</span>
                <span
                  className={`text-[10px] font-bold uppercase shrink-0 ${
                    String(it.severity || '').toLowerCase() === 'critical'
                      ? 'text-[var(--accent-red)]'
                      : 'text-[var(--accent-orange)]'
                  }`}
                >
                  {it.severity}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-[var(--text-muted)]">
                <span className="uppercase tracking-wider">{it.category || 'intel'}</span>
                {it.source ? <span className="truncate max-w-[140px]">{it.source}</span> : null}
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}