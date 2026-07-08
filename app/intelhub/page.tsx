'use client';

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { useIntelData } from './hooks';
import PulseFeed from './components/PulseFeed';
import TopPicks from './components/TopPicks';
import MacroDashboard from './components/MacroDashboard';
import InfosecDashboard from './components/InfosecDashboard';
import Web3Dashboard from './components/Web3Dashboard';
import AIDashboard from './components/AIDashboard';

const TAB_CATS: Record<string, string[]> = {
  macro: ['macro', 'science'],
  ai: ['ai', 'hardware'],
  infosec: ['cybersec'],
  web3: ['crypto'],
};

export default function IntelHubPage() {
  const [active, setActive] = useState<'macro' | 'infosec' | 'web3' | 'ai'>('macro');
  const {
    items, loading, patents, dd, dd2, forex, watchlist,
    catBoxes, top3, tabAccent, tabLabel, ts, ago, isNew, fmt, fmtN,
    TC, BCOL, SOCMED_SOURCES,
  } = useIntelData();

  // Filter items by active tab's categories — strict: exclude conflicting tags
  const tabKws = TAB_CATS[active] || [];
  const activeCatBox = catBoxes.filter((c: any) => tabKws.includes(c.id));
  const activeKwSet = useMemo(() => new Set(activeCatBox.flatMap((c: any) => c.kw)), [active]);
  // Tags that should never appear outside their home tab
  const TAB_EXCLUSIVE: Record<string, string[]> = {
    macro: ['crypto', 'cybersec'],
    ai: ['crypto', 'cybersec'],
    infosec: ['crypto', 'macro', 'ai', 'hardware'],
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

  const filteredTop3 = useMemo(() =>
    [...filteredItems].sort((a: any, b: any) => {
      const da = new Date(a.pubDate || a.date || 0).getTime();
      const db = new Date(b.pubDate || b.date || 0).getTime();
      return db - da;
    }).slice(0, 3).map((it: any) => ({
      ...it,
      title: (it.title || '').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim(),
    })),
  [filteredItems]);

  const tabs = ['macro', 'ai', 'infosec', 'web3'] as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#f59e0b] to-[#C2410C] bg-[length:400%_100%] animate-[gradient_6s_ease_infinite]" />
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-end justify-between relative">
          <div>
            <h1 className="text-[42px] font-bold tracking-[-1.5px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#f59e0b] to-[#C2410C] bg-clip-text text-transparent">
              IntelHub
            </h1>
            <p className="text-[#ededed]/30 mt-1.5 text-[15px] font-light tracking-wide">
              Live threat surface · Market intel · Signal triage
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-xs text-[#ededed]/20"><span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />Macro</span>
              <span className="flex items-center gap-1.5 text-xs text-[#ededed]/20"><span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />AI</span>
              <span className="flex items-center gap-1.5 text-xs text-[#ededed]/20"><span className="w-1.5 h-1.5 rounded-full bg-orange-400/60" />Infosec</span>
              <span className="flex items-center gap-1.5 text-xs text-[#ededed]/20"><span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />Web3</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
            <span className="text-xs text-[#ededed]/30 uppercase tracking-[.15em]">Live</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>

      <PulseFeed items={filteredItems} loading={loading} TC={TC} BCOL={BCOL} ts={ts} isNew={isNew} />
      <TopPicks top3={filteredTop3} TC={TC} ts={ts} />

      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        <div className="flex gap-1 bg-[#111] p-1 rounded-2xl w-fit mb-5 border border-[#222]">
          {tabs.map(d => (
            <button key={d} onClick={() => setActive(d)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === d ? `${tabAccent(d)} bg-white/[0.08] shadow-sm` : 'text-[#ededed]/25 hover:text-[#ededed]/50'
              }`}>{tabLabel(d)}</button>
          ))}
        </div>

        {active === 'macro' && <MacroDashboard items={items} dd={dd} patents={patents} forex={forex} catBoxes={catBoxes} TC={TC} ago={ago} />}
        {active === 'ai' && <AIDashboard items={items} dd={dd} patents={patents} catBoxes={catBoxes} TC={TC} ago={ago} ts={ts} />}
        {active === 'infosec' && <InfosecDashboard items={items} dd2={dd2} watchlist={watchlist} TC={TC} ago={ago} SOCMED_SOURCES={SOCMED_SOURCES} />}
        {active === 'web3' && <Web3Dashboard dd={dd} catBoxes={catBoxes} TC={TC} ago={ago} fmt={fmt} fmtN={fmtN} items={items} ts={ts} />}
      </div>
    </div>
  );
}
