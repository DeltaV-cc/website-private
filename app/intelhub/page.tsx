'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

/* ================================================================
   BROADER & TIGHTER CATEGORIZATION — ordered: rare/important first
   ================================================================ */
const KEYWORDS: Record<string, string> = {
  // science / physics / macro-impact sectors
  physics: 'physics,quantum,particle,fusion,fission,astrophysics,cosmology,higgs,neutrino,gravitational',
  chemistry: 'chemistry,materials science,catalyst,semiconductor,fabrication,lithography',
  biology: 'biology,genome,crispr,mrna,protein,synthetic biology,bioengineering,neuroscience',
  energy: 'energy,nuclear,renewable,solar,wind,grid,battery,fusion,oil,gas,opec,spr',
  space: 'space,spacex,nasa,rocket,satellite,orbital,mars,lunar',
  med: 'medical,fda,drug,trial,vaccine,clinical,pharma,biotech',

  // security / infosec
  cybersec: 'cybersec,cve,vulnerability,breach,ransomware,outage,bgp,ddos,cisa,kev,hibp,zero-day,exploit',
  opsec: 'opsec,hardening,threat model,privacy,air-gapped,self-sovereign,local-first',

  // crypto / web3 / defi
  crypto: 'bitcoin,ethereum,token,defi,yield,liquidity pool,dex,amm,polymarket,kalshi,orderbook,perp,stablecoin,l2,rollup,staking,validator',
  web3: 'web3,blockchain,evm,on-chain,dao,nft,smart contract,solidity',

  // macro / geopolitics / finance
  macro: 'macro,geopolitic,sanction,ofac,tariff,export control,trade war,federal reserve,bis,un security,energy,gdp,inflation,rate hike,treasury,sec,regulation,antitrust',

  // AI / ML
  ai: 'llm,transformer,gpt,claude,deepseek,mistral,gemma,sovereign ai,lora,qlora,neural network,attention mechanism',
  ml: 'machine learning,ml,deep learning,training,benchmark,dataset,fine-tuning,rlhf,alignment',

  // hardware / compute
  hardware: 'chip,gpu,cpu,npu,tpu,h100,a100,b200,compute cluster,meshtastic,iot,edge device,asic,fpga',

  // patents / IP
  ip: 'patent,uspto,wipo,trademark,copyright,intellectual property,license',

  // prediction markets (general)
  prediction: 'prediction market,forecast,odds,event contract',

  // research / papers
  research: 'arxiv,paper,study,benchmark,meta-analysis,systematic review',

  // legal / regulatory
  legal: 'regulation,law,compliance,ftc,cfpb,doj,gdpr,antitrust,sec enforcement,decree',
};

function getTag(title: string, summary: string): string {
  const txt = `${title} ${summary}`.toLowerCase();
  for (const [tag, kw] of Object.entries(KEYWORDS)) {
    for (const k of kw.split(',')) {
      if (txt.includes(k.trim())) return tag;
    }
  }
  return '';
}

/* ================================================================
   COLOR MAP — expanded for new categories
   ================================================================ */
const TC: Record<string, string> = {
  ai:          'bg-blue-500/15 text-blue-400 border-blue-500/20',
  ml:          'bg-sky-500/15 text-sky-400 border-sky-500/20',
  opsec:       'bg-red-500/15 text-red-400 border-red-500/20',
  cybersec:    'bg-orange-500/15 text-orange-400 border-orange-500/20',
  web3:        'bg-purple-500/15 text-purple-400 border-purple-500/20',
  crypto:      'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  hardware:    'bg-green-500/15 text-green-400 border-green-500/20',
  macro:       'bg-amber-500/15 text-amber-400 border-amber-500/20',
  ip:          'bg-pink-500/15 text-pink-400 border-pink-500/20',
  prediction:  'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  research:    'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
  legal:       'bg-rose-500/15 text-rose-400 border-rose-500/20',
  physics:     'bg-violet-500/15 text-violet-400 border-violet-500/20',
  chemistry:   'bg-teal-500/15 text-teal-400 border-teal-500/20',
  biology:     'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  energy:      'bg-lime-500/15 text-lime-400 border-lime-500/20',
  space:       'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/20',
  med:         'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

/* ================================================================
   DASHBOARD DEFINITIONS
   ================================================================ */
const DASH: Record<string, { accent: string; title: string; sources: string[] }> = {
  macro: {
    accent: 'text-amber-400',
    title: 'Macro & Geopolitical',
    sources: ['OFAC', 'BIS', 'ITA', 'UN', 'Sanctions', 'Trade', 'Tariff', 'Export', 'Federal', 'Treasury', 'SEC'],
  },
  infosec: {
    accent: 'text-orange-400',
    title: 'Cybersecurity & Infrastructure',
    sources: ['CISA', 'ICS-CERT', 'NIST', 'HIBP', 'IODA', 'BGP', 'Vulnerability', 'CVE', 'Breach', 'Outage', 'Malware', 'Ransomware'],
  },
  web3: {
    accent: 'text-purple-400',
    title: 'Crypto & DeFi',
    sources: ['DeFiLlama', 'Polymarket', 'IPFS', 'Protocol Labs', 'Filecoin', 'Yield', 'Token', 'Volume', 'DEX', 'Bitcoin', 'Ethereum'],
  },
};

/* ================================================================
   NOISE FILTERS
   ================================================================ */

// Polymarket: keep only macro / crypto / AI / science related markets
const POLY_KEEP = [
  'crypto', 'bitcoin', 'ethereum', 'macro', 'election', 'fed', 'tariff',
  'ai', 'gdp', 'inflation', 'rate', 'treasury', 'sec', 'regulation',
  'war', 'oil', 'energy', 'climate', 'space',
];

const POLY_JUNK = [
  'rihanna', 'kardashian', 'taylor swift', 'grammy', 'oscar',
  'nfl', 'nba', 'super bowl', 'world cup', 'olympics',
  'celebrity', 'influencer', 'tiktok', 'youtube drama',
];

function isRelevantPoly(item: { title: string; source: string }) {
  if (!item.source?.toLowerCase().includes('polymarket')) return true;
  const t = item.title.toLowerCase();
  // explicit junk → drop
  if (POLY_JUNK.some(k => t.includes(k))) return false;
  // keep if matches a topic of interest
  return POLY_KEEP.some(k => t.includes(k));
}

// General feed junk: drop HN posts that are just comments / flamewars / not useful
const JUNK_PATTERNS = [
  /^Ask HN:/i, /^Tell HN:/i, /^Show HN:/i,
  /Who is hiring/i, /Who wants to be hired/i,
];

function isRelevantGeneral(item: Item) {
  // keep Polymarket only if it passes the poly filter (handled above)
  if (item.source?.toLowerCase().includes('hacker news') || item.source?.toLowerCase().includes('y combinator')) {
    for (const p of JUNK_PATTERNS) {
      if (p.test(item.title)) return false;
    }
  }
  return true;
}

/* ================================================================ */
interface Item {
  title: string; url: string; source: string; published_at: string; summary: string; tag?: string;
}

export default function IntelHubPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<'macro' | 'infosec' | 'web3'>('macro');
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = useRef(1.2);
  const af = useRef(0);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/intel/raw-items');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      if (!Array.isArray(d)) throw new Error('Not an array');
      const enriched = d
        .map((x: any) => ({ ...x, tag: getTag(x.title || '', x.summary || '') }))
        .filter(isRelevantPoly)
        .filter(isRelevantGeneral);
      setItems(enriched);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); const i = setInterval(load, 5 * 60_000); return () => clearInterval(i); }, []);

  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    const mv = (e: MouseEvent) => {
      const rx = (e.clientX - el.getBoundingClientRect().left) / el.offsetWidth;
      if (rx < 0.15) speed.current = -0.6; else if (rx < 0.35) speed.current = 0.25;
      else if (rx < 0.65) speed.current = 1.0; else if (rx < 0.85) speed.current = 2.8; else speed.current = 4.5;
    };
    el.addEventListener('mousemove', mv);
    el.addEventListener('mouseleave', () => { speed.current = 1.2; });
    const tick = () => { if (el) el.scrollLeft += speed.current; af.current = requestAnimationFrame(tick); };
    af.current = requestAnimationFrame(tick);
    return () => { el.removeEventListener('mousemove', mv); cancelAnimationFrame(af.current); };
  }, []);

  const ts = (iso: string) => { try { const d = new Date(iso); return d.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };
  const ago = (iso: string) => { try { const m = (Date.now() - new Date(iso).getTime()) / 60000; return m < 1 ? 'now' : m < 60 ? `${Math.round(m)}m` : m < 1440 ? `${Math.round(m / 60)}h` : `${Math.round(m / 1440)}d`; } catch { return ''; } };
  const isNew = (iso: string) => { try { return Date.now() - new Date(iso).getTime() < 3_600_000; } catch { return false; } };

  const ds = DASH[active];
  const di = items
    .filter(i => ds.sources.some(s => i.source?.toLowerCase().includes(s.toLowerCase())) || (i.tag && ds.sources.some(s => s.toLowerCase() === i.tag)))
    .slice(0, 15);
  const top3 = items.slice(0, 3);
  const dc = DASH[active];
  const newToday = di.filter(i => isNew(i.published_at)).length;
  const sourcesCount = new Set(di.map(i => i.source)).size;

  return (
    <div className="min-h-screen bg-[#040407] text-white">
      <Navbar />

      {/* Hero */}
      <div className="border-b border-white/[0.04] bg-black/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-end justify-between">
          <div>
            <h1 className="text-[42px] font-bold tracking-[-1.5px] bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">Intel Hub</h1>
            <p className="text-white/30 mt-1.5 text-[15px] font-light tracking-wide">High‑signal intelligence for Delta&nbsp;V&nbsp;ZHC</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
            <span className="text-[11px] text-white/30 uppercase tracking-[.15em]">Live</span>
          </div>
        </div>
      </div>

      {/* Raw Pulse */}
      <div className="border-b border-white/[0.04] py-5 bg-[#080810]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] text-white/20 uppercase tracking-[.2em] font-semibold select-none">Raw Pulse</span>
            <span className="w-px h-3 bg-white/5" />
            <span className="text-[11px] text-white/15 tabular-nums">{items.length} items</span>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-3"
            style={{
              overflowX: 'scroll',
              scrollBehavior: 'auto',
              scrollbarWidth: 'none',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
            }}
          >
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] rounded-2xl p-4 bg-white/[0.02] border border-white/[0.04] animate-pulse">
                <div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3" /><div className="h-3 bg-white/[0.05] rounded w-1/2" />
                <div className="flex gap-2 mt-4"><div className="h-2.5 bg-white/[0.05] rounded w-12" /><div className="h-2.5 bg-white/[0.05] rounded w-16" /></div>
              </div>
            ))}
            {!loading && items.length === 0 && <div className="text-white/15 text-sm italic py-6 px-2">Awaiting first signals…</div>}
            {items.slice(0, 50).map((it, i) => (
              <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] rounded-2xl p-4 border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0"><div className="text-[13px] font-medium leading-snug line-clamp-2 text-white/85 group-hover:text-white">{it.title}</div></div>
                  {isNew(it.published_at) && <span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />}
                </div>
                <div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">
                  {it.tag && <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] tracking-wide ${TC[it.tag]?.split(' ')[0] || ''} ${TC[it.tag]?.split(' ')[1] || ''}`}>#{it.tag}</span>}
                  <span className="truncate max-w-[90px]">{it.source}</span>
                  <span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Picks */}
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] text-white/20 uppercase tracking-[.25em] font-bold select-none">Today's Top Picks</span>
          <span className="w-px h-3 bg-white/[0.06]" /><span className="text-[11px] text-white/10">chiefstaff</span>
        </div>
        {top3.length === 0 && <div className="text-white/15 text-sm italic py-4">Top picks will appear after chiefintel triage.</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3.map((it, i) => (
            <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
              className="group rounded-3xl p-6 border border-white/[0.06] hover:border-white/15 bg-gradient-to-b from-white/[0.03] to-white/[0.005] hover:from-white/[0.06] hover:to-white/[0.015] transition-all duration-300">
              <div className="text-[17px] font-semibold leading-snug text-white/90 group-hover:text-white group-hover:underline decoration-white/20 underline-offset-4">{it.title}</div>
              <p className="text-white/35 text-sm mt-3 line-clamp-3 leading-relaxed">{it.summary}</p>
              <div className="flex items-center gap-2 mt-5 text-[12px] text-white/25">
                {it.tag && <span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${TC[it.tag]?.split(' ')[0] || ''} ${TC[it.tag]?.split(' ')[1] || ''}`}>#{it.tag}</span>}
                <span>{it.source}</span><span className="ml-auto tabular-nums">{ts(it.published_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        <div className="flex gap-1 bg-white/[0.02] p-1 rounded-2xl w-fit mb-8 border border-white/[0.04]">
          {(['macro', 'infosec', 'web3'] as const).map(d => {
            const s = DASH[d];
            return (
              <button key={d} onClick={() => setActive(d)}
                className={`px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${active === d ? `${s.accent} bg-white/[0.08] shadow-sm` : 'text-white/25 hover:text-white/50'}`}>
                {d === 'macro' ? 'Macro' : d === 'infosec' ? 'Infosec' : 'Web3'}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[11px] text-white/20 uppercase tracking-wider">Items</div><div className={`text-2xl font-bold tabular-nums mt-1 ${dc.accent}`}>{di.length}</div><div className="text-[11px] text-white/15 mt-1">in dashboard</div></div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[11px] text-white/20 uppercase tracking-wider">New</div><div className="text-2xl font-bold tabular-nums mt-1 text-emerald-400">{newToday}</div><div className="text-[11px] text-white/15 mt-1">last hour</div></div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[11px] text-white/20 uppercase tracking-wider">Sources</div><div className="text-2xl font-bold tabular-nums mt-1 text-white/70">{sourcesCount}</div><div className="text-[11px] text-white/15 mt-1">active</div></div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[11px] text-white/20 uppercase tracking-wider">Top Source</div><div className="text-base font-semibold mt-1 text-white/50 truncate">{di[0]?.source || '—'}</div><div className="text-[11px] text-white/15 mt-1">{di[0] ? ago(di[0].published_at) + ' ago' : ''}</div></div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className={`text-[12px] uppercase tracking-[.2em] font-bold ${dc.accent}`}>{dc.title}</span><span className="w-px h-3 bg-white/[0.06]" /><span className="text-[11px] text-white/15">{di.length} high‑signal</span></div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.01]">
          <div className="grid grid-cols-[1fr_120px_80px_100px] gap-4 px-5 py-3 border-b border-white/[0.04] bg-white/[0.015] text-[11px] text-white/20 uppercase tracking-wider font-semibold">
            <div>Item</div><div>Source</div><div className="text-center">Tag</div><div className="text-right">Time</div>
          </div>
          {di.length === 0 && <div className="px-5 py-12 text-center text-white/15 text-sm italic">No high‑signal items yet.</div>}
          {di.map((it, i) => (
            <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
              className={`grid grid-cols-[1fr_120px_80px_100px] gap-4 px-5 py-3.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.03] transition-all duration-150 group ${i % 2 === 1 ? 'bg-white/[0.008]' : ''}`}>
              <div className="min-w-0"><div className="text-[13px] font-medium text-white/80 group-hover:text-white truncate leading-snug">{it.title}</div>{it.summary && <div className="text-[11px] text-white/25 truncate mt-0.5">{it.summary.slice(0, 100)}</div>}</div>
              <div className="flex items-center text-[12px] text-white/30 truncate">{it.source}</div>
              <div className="flex items-center justify-center">{it.tag && <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] border ${TC[it.tag] || ''}`}>#{it.tag}</span>}</div>
              <div className="flex items-center justify-end gap-2 text-[12px] text-white/25">{isNew(it.published_at) && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}<span className="tabular-nums">{ago(it.published_at)}</span></div>
            </a>
          ))}
        </div>

        <div className="mt-6"><div className="flex items-center gap-3 mb-4"><span className="text-[10px] text-white/15 uppercase tracking-[.15em]">Card View</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {di.slice(0, 6).map((it, i) => (
              <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
                className="group rounded-2xl p-4 border border-white/[0.05] hover:border-white/15 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300">
                <div className="text-[13px] font-semibold leading-snug text-white/80 group-hover:text-white line-clamp-2">{it.title}</div>
                <div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">{it.tag && <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag]?.split(' ')[0] || ''} ${TC[it.tag]?.split(' ')[1] || ''}`}>#{it.tag}</span>}<span>{it.source}</span><span className="ml-auto tabular-nums">{ago(it.published_at)}</span></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
