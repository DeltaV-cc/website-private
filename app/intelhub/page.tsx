'use client';

import { useState, useMemo, useEffect } from 'react';
import { useIntelData, BCOL, TC } from './hooks';
import PulseFeed from './components/PulseFeed';
import MacroDashboard from './components/MacroDashboard';
import AIDashboard from './components/AIDashboard';
import Web3Dashboard from './components/Web3Dashboard';
import CryptoFrontierSignals from './components/CryptoFrontierSignals';

// Tab → parent categories
const CATS_FOR: Record<string, string[]> = {
  macro: ['macro', 'science'],
  ai: ['ai', 'hardware'],
  web3: ['crypto'],
};

export default function IntelHubPage() {
  const [active, setActive] = useState<string>('macro');
  const {
    items, loading, patents, dd, dd2, forex, watchlist,
    catBoxes, top3, tabAccent, tabLabel, ts, ago, isNew, fmt, fmtN,
    TC, BCOL, SOCMED_SOURCES, lastFetch,
  } = useIntelData();

  // Filter items by active tab's categories — strict: exclude conflicting tags
  const tabKws = CATS_FOR[active] || [];
  const activeCatBox = catBoxes.filter((c: any) => tabKws.includes(c.id));
  const activeKwSet = useMemo(() => new Set(activeCatBox.flatMap((c: any) => c.kw)), [active]);
  // Tags that should never appear outside their home tab
  const TAB_EXCLUSIVE: Record<string, string[]> = {
    macro: ['crypto', 'cybersec'],
    ai: ['crypto', 'cybersec'],
    web3: ['cybersec', 'science'],
  };
  const excludedTags = TAB_EXCLUSIVE[active] || [];
  const filteredItems = useMemo(() =>
    items.filter((it: any) => {
      if (activeKwSet.size === 0) return true;
      // Block items tagged for other exclusive tabs
      if (it.tag && excludedTags.includes(it.tag)) return false;
      // Include if tag matches active categories
      if (it.tag && tabKws.includes(it.tag)) return true;
      // Include if keyword match passes (title/summary)
      return activeCatBox.some((c: any) =>
        c.kw.some((k: string) => (it.title + ' ' + (it.summary || '')).toLowerCase().includes(k))
      );
    }), [items, activeKwSet, activeCatBox, excludedTags, tabKws]);

  // Per-tab signal counts for badges
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tab of ['macro', 'ai', 'web3']) {
      const tabKws = CATS_FOR[tab] || [];
      const catBoxesList = catBoxes.filter((c: any) => tabKws.includes(c.id));
      const kwSet = new Set(catBoxesList.flatMap((c: any) => c.kw));
      const excluded = TAB_EXCLUSIVE[tab] || [];
      counts[tab] = items.filter((it: any) => {
        if (kwSet.size === 0) return true;
        if (it.tag && excluded.includes(it.tag)) return false;
        if (it.tag && tabKws.includes(it.tag)) return true;
        return catBoxesList.some((c: any) =>
          c.kw.some((k: string) => (it.title + ' ' + (it.summary || '')).toLowerCase().includes(k))
        );
      }).length;
    }
    return counts;
  }, [items, catBoxes]);

  // Keyboard shortcuts: 1=Macro, 2=AI, 3=Web3 (skip when input focused)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === '1') setActive('macro');
      else if (e.key === '2') setActive('ai');
      else if (e.key === '3') setActive('web3');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Freshness dot color
  const freshnessDot = useMemo(() => {
    if (!lastFetch) return null;
    const mins = (Date.now() - lastFetch.getTime()) / 60000;
    if (mins < 10) return 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]';
    return 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]';
  }, [lastFetch]);

  const tabs = ['macro', 'ai', 'web3'] as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">

      <div className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#f59e0b] to-[#C2410C] bg-[length:400%_100%] animate-[gradient_6s_ease_infinite]" />
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-end justify-between relative">
          <div>
            <h1 className="text-5xl font-bold tracking-[-1.5px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#f59e0b] to-[#C2410C] bg-clip-text text-transparent">
              IntelHub
            </h1>
            <p className="text-[#ededed]/30 mt-1.5 text-base font-light tracking-wide">
              Live threat surface · Market intel · Signal triage
            </p>
          </div>
          <div className="flex items-center gap-3">
            {freshnessDot && (
              <span className={`inline-block w-2 h-2 rounded-full ${freshnessDot}`} title={lastFetch ? `Fetched ${ago(lastFetch.toISOString())} ago` : ''} />
            )}
            <span className="text-xs text-[#ededed]/30 uppercase tracking-[.15em]">
              {lastFetch ? ago(lastFetch.toISOString()) : 'Loading...'}
            </span>
          </div>
        </div>
      </div>

      <style>{`@keyframes gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.tab-enter{animation:fadeIn 0.25s ease-out}`}</style>

      <PulseFeed items={filteredItems} loading={loading} TC={TC} BCOL={BCOL} ts={ts} isNew={isNew} />

      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        {loading && !items.length && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-[#222] border-t-[#00f0ff] rounded-full animate-spin" />
              <span className="text-sm text-[#ededed]/30">Loading intelligence feeds...</span>
            </div>
          </div>
        )}
        <div className="flex gap-1 bg-[#111] p-1 rounded-2xl w-fit mb-5 border border-[#222]" role="tablist" aria-label="Dashboard tabs">
          {tabs.map(d => (
            <button key={d} onClick={() => setActive(d)}
              role="tab" aria-selected={active === d} aria-current={active === d ? 'page' : undefined}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                active === d ? `${tabAccent(d)} bg-white/[0.08] shadow-sm` : 'text-[#ededed]/25 hover:text-[#ededed]/50'
              }`}>{tabLabel(d)}
              {tabCounts[d] != null && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-[#ededed]/30">{tabCounts[d]}</span>}
            </button>
          ))}
        </div>

        <div className="tab-enter" key={active}>
          {active === 'macro' && <MacroDashboard items={items} dd={dd} patents={patents} forex={forex} catBoxes={catBoxes} TC={TC} ago={ago} ts={ts} />}
          {active === 'ai' && <AIDashboard items={items} dd={dd} patents={patents} catBoxes={catBoxes} TC={TC} ago={ago} ts={ts} />}
          {active === 'web3' && <Web3Dashboard dd={dd} catBoxes={catBoxes} TC={TC} ago={ago} fmt={fmt} fmtN={fmtN} items={items} ts={ts} />}
        </div>
      </div>
    </div>
  );
}
