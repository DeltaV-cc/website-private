'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

// ============================
//  Category detection + colors
// ============================
const KEYWORDS: Record<string, string> = {
  ai: 'ai,llm,agent,model,inference,transformer,gpt,claude,local-first,sovereign',
  opsec: 'opsec,security,privacy,hardening,threat,vulnerability,exploit,zero-day,cve',
  cybersec: 'cybersec,infosec,breach,malware,ransomware,bgp,outage,cisa',
  web3: 'web3,blockchain,evm,ethereum,defi,yield,token,on-chain,dao',
  crypto: 'bitcoin,crypto,polymarket,orderbook',
  hardware: 'chip,hardware,compute,gpu,cpu,meshtastic,iot',
  macro: 'macro,geopolitic,sanction,ofac,tariff,energy,trade,export,un,federal',
  ip: 'patent,ip,trademark,wipo,uspto,copyright,license',
  prediction: 'prediction,forecast,market,odds,kalshi',
  research: 'research,paper,arxiv,study',
  legal: 'legal,regulation,law,compliance,sec,ftc,cfpb,doj,antitrust',
};

function getTag(title: string, summary: string): string {
  const t = `${title} ${summary}`.toLowerCase();
  for (const [tag, kw] of Object.entries(KEYWORDS))
    if (kw.split(',').some(k => t.includes(k.trim()))) return tag;
  return '';
}

const TC: Record<string,string> = {
  ai:'bg-blue-500/15 text-blue-400', opsec:'bg-red-500/15 text-red-400',
  cybersec:'bg-orange-500/15 text-orange-400', web3:'bg-purple-500/15 text-purple-400',
  crypto:'bg-yellow-500/15 text-yellow-400', hardware:'bg-green-500/15 text-green-400',
  macro:'bg-amber-500/15 text-amber-400', ip:'bg-pink-500/15 text-pink-400',
  prediction:'bg-cyan-500/15 text-cyan-400', research:'bg-indigo-500/15 text-indigo-400',
  legal:'bg-rose-500/15 text-rose-400',
};

const DASH: Record<string, {bg:string, border:string, accent:string, title:string, glow:string}> = {
  macro:   {bg:'from-amber-500/[0.04] to-transparent', border:'border-amber-500/10', accent:'text-amber-400', title:'Macro & Geopolitical', glow:'shadow-amber-500/5'},
  infosec: {bg:'from-orange-500/[0.04] to-transparent', border:'border-orange-500/10', accent:'text-orange-400', title:'Cybersecurity & Infrastructure', glow:'shadow-orange-500/5'},
  web3:    {bg:'from-purple-500/[0.04] to-transparent', border:'border-purple-500/10', accent:'text-purple-400', title:'Crypto & DeFi', glow:'shadow-purple-500/5'},
};

// ============================
interface Item { title:string; url:string; source:string; published_at:string; summary:string; tag?:string; }

export default function IntelHubPage() {
  const [items,setItems]=useState<Item[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [active,setActive]=useState<'macro'|'infosec'|'web3'>('macro');
  const scrollRef=useRef<HTMLDivElement>(null);
  const speed=useRef(1.2);
  const af=useRef(0);

  const load=async()=>{
    setLoading(true);
    try {
      const r = await fetch('/api/intel/raw-items');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      if (!Array.isArray(d)) throw new Error('Not an array');
      setItems(d.map((x:any)=>({...x, tag: getTag(x.title||'', x.summary||'')})));
      setError('');
    } catch(e:any) {
      console.error('[IntelHub]', e);
      setError(e.message||'Failed to load');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); const i=setInterval(load,5*60_000); return ()=>clearInterval(i); },[]);

  // ================ mouse‑directed auto‑scroll ================
  useEffect(()=>{
    const el=scrollRef.current; if(!el)return;
    const mv=(e:MouseEvent)=>{
      const rx=(e.clientX-el.getBoundingClientRect().left)/el.offsetWidth;
      if(rx<.15) speed.current=-0.6; else if(rx<.35) speed.current=0.25;
      else if(rx<.65) speed.current=1.0; else if(rx<.85) speed.current=2.8; else speed.current=4.5;
    };
    el.addEventListener('mousemove',mv);
    el.addEventListener('mouseleave',()=>{speed.current=1.2;});
    const tick=()=>{if(el)el.scrollLeft+=speed.current; af.current=requestAnimationFrame(tick);};
    af.current=requestAnimationFrame(tick);
    return ()=>{el.removeEventListener('mousemove',mv); cancelAnimationFrame(af.current);};
  },[]);

  const ts=(iso:string)=>{try{const d=new Date(iso);return d.toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return'';}};
  const isNew=(iso:string)=>{try{return (Date.now()-new Date(iso).getTime())<3_600_000;}catch{return false;}};  // <1h

  const ds:Record<string,string[]>={
    macro:['OFAC','BIS','ITA','UN'],
    infosec:['CISA','ICS-CERT','NIST','HIBP','IODA','BGP'],
    web3:['DeFiLlama','Polymarket','IPFS','Protocol Labs','Filecoin'],
  };
  const di=items.filter(i=>ds[active]?.some(s=>i.source?.toLowerCase().includes(s.toLowerCase()))).slice(0,9);
  const top3=items.slice(0,3);
  const dc=DASH[active];

  // ================================================================
  return (
    <div className="min-h-screen bg-[#040407] text-white">
      <Navbar/>

      {/* ==================== HERO ==================== */}
      <div className="border-b border-white/[0.04] bg-black/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-end justify-between">
          <div>
            <h1 className="text-[42px] font-bold tracking-[-1.5px] bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Intel Hub
            </h1>
            <p className="text-white/30 mt-1.5 text-[15px] font-light tracking-wide">
              High‑signal intelligence for Delta&nbsp;V&nbsp;ZHC
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]"/>
            <span className="text-[11px] text-white/30 uppercase tracking-[.15em]">Live</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-[1440px] mx-auto px-8 py-3 bg-red-500/10 border-b border-red-500/20 text-red-400 text-sm animate-in fade-in">
          ⚠ {error}
        </div>
      )}

      {/* ==================== RAW PULSE RIVER ==================== */}
      <div className="border-b border-white/[0.04] py-5 bg-[#080810]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] text-white/20 uppercase tracking-[.2em] font-semibold select-none">Raw Pulse</span>
            <span className="w-px h-3 bg-white/5"/>
            <span className="text-[11px] text-white/15 tabular-nums">{items.length} items</span>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto no-scrollbar smooth-scroll"
            style={{scrollBehavior:'auto', WebkitMaskImage:'linear-gradient(to right, transparent, black 2%, black 98%, transparent)'}}
          >
            {/* loading skeleton */}
            {loading && Array.from({length:6}).map((_,i)=>(
              <div key={i} className="flex-shrink-0 w-[300px] rounded-2xl p-4 bg-white/[0.02] border border-white/[0.04] animate-pulse">
                <div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3"/>
                <div className="h-3 bg-white/[0.05] rounded w-1/2"/>
                <div className="flex gap-2 mt-4">
                  <div className="h-2.5 bg-white/[0.05] rounded w-12"/>
                  <div className="h-2.5 bg-white/[0.05] rounded w-16"/>
                </div>
              </div>
            ))}
            {/* empty */}
            {!loading && !error && items.length===0 && (
              <div className="text-white/15 text-sm italic py-6 px-2">Awaiting first signals…</div>
            )}
            {/* items */}
            {items.slice(0,50).map((it,i)=>(
              <a
                key={i}
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] rounded-2xl p-4 border border-white/[0.05]
                           bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/15
                           transition-all duration-300 ease-out group cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium leading-snug line-clamp-2 text-white/85 group-hover:text-white transition-colors duration-200">
                      {it.title}
                    </div>
                  </div>
                  {isNew(it.published_at) && (
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]"/>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">
                  {it.tag && (
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] tracking-wide ${TC[it.tag]||''}`}>
                      #{it.tag}
                    </span>
                  )}
                  <span className="truncate max-w-[90px]">{it.source}</span>
                  <span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== TOP 3 PICKS ==================== */}
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] text-white/20 uppercase tracking-[.25em] font-bold select-none">Today's Top Picks</span>
          <span className="w-px h-3 bg-white/[0.06]"/>
          <span className="text-[11px] text-white/10">chiefstaff</span>
        </div>

        {top3.length===0 && (
          <div className="text-white/15 text-sm italic py-4">Top picks will appear after chiefintel triage.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3.map((it,i)=>(
            <a
              key={i}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl p-6 border border-white/[0.06] hover:border-white/15
                         bg-gradient-to-b from-white/[0.03] to-white/[0.005]
                         hover:from-white/[0.06] hover:to-white/[0.015]
                         transition-all duration-300 ease-out"
            >
              <div className="text-[17px] font-semibold leading-snug text-white/90 group-hover:text-white group-hover:underline decoration-white/20 underline-offset-4 transition-all">
                {it.title}
              </div>
              <p className="text-white/35 text-sm mt-3 line-clamp-3 leading-relaxed">{it.summary}</p>
              <div className="flex items-center gap-2 mt-5 text-[12px] text-white/25">
                {it.tag && (<span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${TC[it.tag]||''}`}>#{it.tag}</span>)}
                <span>{it.source}</span>
                <span className="ml-auto tabular-nums">{ts(it.published_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ==================== DASHBOARDS ==================== */}
      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        {/* tabs */}
        <div className="flex gap-1 bg-white/[0.02] p-1 rounded-2xl w-fit mb-8 border border-white/[0.04]">
          {(['macro','infosec','web3']as const).map(d=>{
            const s = DASH[d];
            return (
              <button key={d} onClick={()=>setActive(d)}
                className={`px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  active===d
                    ? `${s.accent} bg-white/[0.08] shadow-sm`
                    : 'text-white/25 hover:text-white/50'}`}>
                {d==='macro'?'Macro':d==='infosec'?'Infosec':'Web3'}
              </button>
            );
          })}
        </div>

        {/* section header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className={`text-[11px] uppercase tracking-[.2em] font-bold ${dc.accent}`}>{dc.title}</span>
            <span className="w-px h-3 bg-white/[0.06]"/>
            <span className="text-[11px] text-white/15 tabular-nums">{di.length} high‑signal</span>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {di.length===0 && (
            <div className="col-span-full text-center py-12 text-white/15 text-sm italic">
              No high‑signal items yet — triage layer is processing.
            </div>
          )}
          {di.map((it,i)=>(
            <a
              key={i}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-2xl p-5 border ${dc.border} hover:border-white/15
                         bg-gradient-to-b ${dc.bg} hover:from-white/[0.06] hover:to-transparent
                         transition-all duration-300 ease-out ${dc.glow}`}
            >
              <div className="text-[14px] font-semibold leading-snug text-white/85 group-hover:text-white group-hover:underline decoration-white/15 underline-offset-4 line-clamp-2 transition-all">
                {it.title}
              </div>
              <p className="text-white/30 text-[12px] mt-2.5 line-clamp-2 leading-relaxed">{it.summary}</p>
              <div className="flex items-center gap-2 mt-4 text-[11px] text-white/20">
                {it.tag && (<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>)}
                <span className="truncate max-w-[90px]">{it.source}</span>
                <span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
