'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useIntelData, BCOL, TC } from './hooks';
import PulseFeed from './components/PulseFeed';
import MacroDashboard from './components/MacroDashboard';

// Lazy non-default tabs — smaller Macro first paint JS
const AIDashboard = dynamic(() => import('./components/AIDashboard'), {
  ssr: false,
  loading: () => <div className="skeleton-shimmer h-40 w-full rounded-lg" aria-hidden />,
});
const Web3Dashboard = dynamic(() => import('./components/Web3Dashboard'), {
  ssr: false,
  loading: () => <div className="skeleton-shimmer h-40 w-full rounded-lg" aria-hidden />,
});
const InfosecDashboard = dynamic(() => import('./components/InfosecDashboard'), {
  ssr: false,
  loading: () => <div className="skeleton-shimmer h-40 w-full rounded-lg" aria-hidden />,
});

// Tab → parent categories
const CATS_FOR: Record<string, string[]> = {
  macro: ['macro', 'science'],
  ai: ['ai', 'hardware'],
  web3: ['crypto'],
  infosec: ['cybersec'],
};

const VALID_TABS = ['macro', 'ai', 'web3', 'infosec'] as const;
type TabId = (typeof VALID_TABS)[number];

function readTabFromUrl(): TabId {
  if (typeof window === 'undefined') return 'macro';
  try {
    const t = new URLSearchParams(window.location.search).get('tab');
    if (t && (VALID_TABS as readonly string[]).includes(t)) return t as TabId;
  } catch { /* */ }
  return 'macro';
}

export default function IntelHubPage() {
  const [active, setActiveState] = useState<string>('macro');
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [pulseScope, setPulseScope] = useState<'all' | 'tab'>('tab');

  // Hydrate tab from ?tab= without SSR mismatch
  useEffect(() => {
    setActiveState(readTabFromUrl());
  }, []);

  const setActive = useCallback((tab: string) => {
    setActiveState(tab);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    } catch { /* */ }
  }, []);

  const {
    items, loading, patents, dd, dd2, forex, watchlist,
    catBoxes, tabAccent, tabLabel, ts, ago, isNew, fmt, fmtN,
    TC, BCOL, lastFetch, infosecMeta,
  } = useIntelData(active);

  // Filter items by active tab's categories — strict: exclude conflicting tags
  const tabKws = CATS_FOR[active] || [];
  const activeCatBox = catBoxes.filter((c: any) => tabKws.includes(c.id));
  const activeKwSet = useMemo(() => new Set(activeCatBox.flatMap((c: any) => c.kw)), [activeCatBox]);
  // Tags that should never appear outside their home tab
  const TAB_EXCLUSIVE: Record<string, string[]> = {
    macro: ['crypto', 'cybersec'],
    ai: ['crypto', 'cybersec'],
    web3: ['cybersec', 'science'],
    infosec: ['crypto', 'macro', 'science', 'hardware'],
  };
  const excludedTags = TAB_EXCLUSIVE[active] || [];
  const filteredItems = useMemo(() =>
    items.filter((it: any) => {
      if (activeKwSet.size === 0) return true;
      if (it.tag && excludedTags.includes(it.tag)) return false;
      if (active === 'ai') {
        const src = (it.source || '').toLowerCase();
        const blob = `${it.title || ''} ${it.summary || ''}`;
        if (/crude oil|gasoline inventor|distillate|\$macro\b|gta vi|save \$|combo deal|etf netflow|whales? are shorting/i.test(blob)) return false;
        if (['coindesk', 'decrypt', 'the defiant', 'lookonchain', 'wublockchain', 'marketnews', 'dinosn', 'cvenew', 'science daily', 'cryptoquant'].some((b) => src.includes(b))) return false;
        if (src.includes("tom's hardware") || src.includes('tom’s hardware') || src.includes('phoronix')) {
          return /\b(nvidia|tsmc|gpu|hbm|foundry|semiconductor|cerebras|llm|ai accelerator)\b/i.test(blob);
        }
        // "intel" as a substring matches "intelligence" — require a real AI/ML/chip token for untagged items
        if (it.tag === 'hardware' && !/\b(nvidia|tsmc|gpu|hbm|foundry|semiconductor|cerebras|asic|npu|tpu|wafer|lithograph)\b/i.test(blob)) return false;
      }
      if (it.tag && tabKws.includes(it.tag)) return true;
      return activeCatBox.some((c: any) =>
        c.kw.some((k: string) => (it.title + ' ' + (it.summary || '')).toLowerCase().includes(k))
      );
    }), [items, activeKwSet, activeCatBox, excludedTags, tabKws, active]);

  // Per-tab signal counts for badges
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tab of VALID_TABS) {
      const tKws = CATS_FOR[tab] || [];
      const catBoxesList = catBoxes.filter((c: any) => tKws.includes(c.id));
      const kwSet = new Set(catBoxesList.flatMap((c: any) => c.kw));
      const excluded = TAB_EXCLUSIVE[tab] || [];
      counts[tab] = items.filter((it: any) => {
        if (kwSet.size === 0) return true;
        if (it.tag && excluded.includes(it.tag)) return false;
        if (it.tag && tKws.includes(it.tag)) return true;
        return catBoxesList.some((c: any) =>
          c.kw.some((k: string) => (it.title + ' ' + (it.summary || '')).toLowerCase().includes(k))
        );
      }).length;
    }
    return counts;
  }, [items, catBoxes]);

  // Keyboard shortcuts: 1=Macro, 2=AI, 3=Web3, 4=Infosec
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === '1') setActive('macro');
      else if (e.key === '2') setActive('ai');
      else if (e.key === '3') setActive('web3');
      else if (e.key === '4') setActive('infosec');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setActive]);

  const freshnessDot = useMemo(() => {
    if (!lastFetch) return null;
    const mins = (Date.now() - lastFetch.getTime()) / 60000;
    if (mins < 10) return 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]';
    return 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]';
  }, [lastFetch]);

  const tabs = VALID_TABS;

  const uniqueSources = useMemo(() => {
    const base = pulseScope === 'tab' ? filteredItems : items;
    const srcs = new Map<string, number>();
    base.forEach(it => {
      const key = (it.source || '').replace(/^(x:|X:)\s*/, '').trim();
      if (key) srcs.set(key, (srcs.get(key) || 0) + 1);
    });
    return Array.from(srcs.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name, count]) => ({ name, count }));
  }, [items, filteredItems, pulseScope]);

  const pulseItems = useMemo(() => {
    let filtered = pulseScope === 'tab' ? filteredItems : items;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(it =>
        (it.title || '').toLowerCase().includes(q) ||
        (it.summary || '').toLowerCase().includes(q) ||
        (it.source || '').toLowerCase().includes(q)
      );
    }
    if (sourceFilter) {
      filtered = filtered.filter(it =>
        (it.source || '').toLowerCase().includes(sourceFilter.toLowerCase())
      );
    }
    return filtered;
  }, [items, filteredItems, pulseScope, searchQuery, sourceFilter]);

  return (
    <div className="intelhub-shell min-h-screen text-[#ededed]">

      <div className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-6 flex items-end justify-between relative gap-8">
          <div>
            <div className="text-[10px] font-mono tracking-[.2em] uppercase text-[var(--accent-cyan)] mb-3 flex items-center gap-2">
              Field intelligence / live surface
              {freshnessDot && (
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${freshnessDot}`}
                  title={lastFetch ? `Signals updated ${ago(lastFetch.toISOString())} ago` : 'Loading'}
                  aria-hidden
                />
              )}
              {lastFetch && (
                <span className="normal-case tracking-normal text-[#ededed]/25 font-sans">
                  · feeds {ago(lastFetch.toISOString()) === 'now' ? 'just now' : `${ago(lastFetch.toISOString())} ago`}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[-.06em] text-[var(--text-primary)]">
              IntelHub
            </h1>
            <p className="text-[#ededed]/30 mt-1.5 text-base font-light tracking-wide">
              Curated market data · AI &amp; Web3 signals · Onchain intelligence
            </p>
          </div>
        </div>
      </div>

      <style>{`@keyframes gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.tab-enter{animation:fadeIn 0.25s ease-out}`}</style>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 pt-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-[360px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-disabled)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search signals..."
              className="w-full pl-9 pr-3 py-1.5 bg-[var(--bg-deep)] border border-[var(--border-default)] rounded-lg text-xs text-[var(--text-secondary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent-cyan)]/40 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[var(--text-disabled)] hover:text-[var(--text-primary)]">✕</button>
            )}
          </div>
          <div className="flex gap-0.5 bg-[var(--bg-deep)] rounded-lg p-0.5 border border-[var(--border-default)] text-[10px]">
            <button
              type="button"
              onClick={() => setPulseScope('tab')}
              className={`px-2 py-1 rounded-md transition-colors ${pulseScope === 'tab' ? 'bg-white/[0.10] text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}
              title="Pulse follows active dashboard tab"
            >
              Tab pulse
            </button>
            <button
              type="button"
              onClick={() => setPulseScope('all')}
              className={`px-2 py-1 rounded-md transition-colors ${pulseScope === 'all' ? 'bg-white/[0.10] text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}
              title="Show all categories in the pulse"
            >
              All signals
            </button>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {uniqueSources.map(s => (
              <button key={s.name} onClick={() => setSourceFilter(sourceFilter === s.name ? null : s.name)}
                className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                  sourceFilter === s.name
                    ? 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30'
                    : 'bg-white/[0.04] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-white/[0.08]'
                }`}>
                {s.name} <span className="opacity-50">{s.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <PulseFeed items={pulseItems} loading={loading} TC={TC} BCOL={BCOL} ts={ts} isNew={isNew} lastFetch={lastFetch} ago={ago} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 pb-24">
        {loading && !items.length && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-[#222] border-t-[#00f0ff] rounded-full animate-spin" />
              <span className="text-sm text-[#ededed]/30">Loading intelligence feeds...</span>
            </div>
          </div>
        )}
        <div className="intelhub-tabs flex gap-6 border-b border-[var(--border-default)] w-full mb-5" role="tablist" aria-label="Dashboard tabs">
          {tabs.map(d => (
            <button key={d} onClick={() => setActive(d)}
              role="tab" aria-selected={active === d} aria-current={active === d ? 'page' : undefined}
              className={`px-1 pb-3 pt-2 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                active === d ? `${tabAccent(d)}` : 'text-[#ededed]/35 hover:text-[#ededed]/70'
              }`}>{tabLabel(d)}
              {tabCounts[d] != null && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-[#ededed]/30">{tabCounts[d]}</span>}
            </button>
          ))}
        </div>

        <div className="tab-enter" key={active}>
          {active === 'macro' && <MacroDashboard items={items} dd={dd} patents={patents} forex={forex} catBoxes={catBoxes} TC={TC} ago={ago} ts={ts} />}
          {active === 'ai' && <AIDashboard items={items} dd={dd} patents={patents} catBoxes={catBoxes} TC={TC} ago={ago} ts={ts} />}
          {active === 'web3' && <Web3Dashboard dd={dd} catBoxes={catBoxes} TC={TC} ago={ago} fmt={fmt} fmtN={fmtN} items={items} ts={ts} />}
          {active === 'infosec' && <InfosecDashboard dd2={dd2} watchlist={watchlist} catBoxes={catBoxes} TC={TC} ago={ago} infosecMeta={infosecMeta} />}
        </div>
      </div>
    </div>
  );
}
