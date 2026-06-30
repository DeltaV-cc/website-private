'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useIntelData } from './hooks';
import PulseFeed from './components/PulseFeed';
import TopPicks from './components/TopPicks';
import MacroDashboard from './components/MacroDashboard';
import InfosecDashboard from './components/InfosecDashboard';
import Web3Dashboard from './components/Web3Dashboard';

export default function IntelHubPage() {
  const [active, setActive] = useState<'macro' | 'infosec' | 'web3'>('macro');
  const {
    items, loading, patents, dd, dd2, forex, watchlist,
    catBoxes, top3, tabAccent, tabLabel, ts, ago, isNew, fmt, fmtN,
    TC, BCOL, SOCMED_SOURCES,
  } = useIntelData();

  const tabs = ['macro', 'infosec', 'web3'] as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── Sticky Header ── */}
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
              <span className="flex items-center gap-1.5 text-xs text-[#ededed]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />Macro
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#ededed]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400/60" />Infosec
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#ededed]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />Web3
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
            <span className="text-xs text-[#ededed]/30 uppercase tracking-[.15em]">Live</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>

      {/* ── Pulse ── */}
      <PulseFeed items={items} loading={loading} TC={TC} BCOL={BCOL} ts={ts} isNew={isNew} />

      {/* ── Top Picks ── */}
      <TopPicks top3={top3} TC={TC} ts={ts} />

      {/* ── Tabs ── */}
      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        <div className="flex gap-1 bg-[#111] p-1 rounded-2xl w-fit mb-5 border border-[#222]">
          {tabs.map(d => (
            <button
              key={d}
              onClick={() => setActive(d)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === d
                  ? `${tabAccent(d)} bg-white/[0.08] shadow-sm`
                  : 'text-[#ededed]/25 hover:text-[#ededed]/50'
              }`}
            >
              {tabLabel(d)}
            </button>
          ))}
        </div>

        {/* Macro Tab */}
        {active === 'macro' && (
          <MacroDashboard
            items={items}
            dd={dd}
            patents={patents}
            forex={forex}
            catBoxes={catBoxes}
            TC={TC}
            ago={ago}
            fmt={fmt}
            fmtN={fmtN}
          />
        )}

        {/* Infosec Tab */}
        {active === 'infosec' && (
          <InfosecDashboard
            items={items}
            dd2={dd2}
            watchlist={watchlist}
            TC={TC}
            ago={ago}
            SOCMED_SOURCES={SOCMED_SOURCES}
          />
        )}

        {/* Web3 Tab */}
        {active === 'web3' && (
          <Web3Dashboard
            dd={dd}
            catBoxes={catBoxes}
            TC={TC}
            ago={ago}
            fmt={fmt}
            fmtN={fmtN}
          />
        )}
      </div>
    </div>
  );
}
