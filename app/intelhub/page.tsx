'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

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
  ai:'bg-blue-500/20 text-blue-300', opsec:'bg-red-500/20 text-red-300',
  cybersec:'bg-orange-500/20 text-orange-300', web3:'bg-purple-500/20 text-purple-300',
  crypto:'bg-yellow-500/20 text-yellow-300', hardware:'bg-green-500/20 text-green-300',
  macro:'bg-amber-500/20 text-amber-300', ip:'bg-pink-500/20 text-pink-300',
  prediction:'bg-cyan-500/20 text-cyan-300', research:'bg-indigo-500/20 text-indigo-300',
  legal:'bg-rose-500/20 text-rose-300',
};

interface Item { title:string; url:string; source:string; published_at:string; summary:string; tag?:string; }

export default function IntelHubPage() {
  const [items,setItems]=useState<Item[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [active,setActive]=useState<'macro'|'infosec'|'web3'>('macro');
  const scrollRef=useRef<HTMLDivElement>(null);
  const speed=useRef(1.2);
  const af=useRef(0);

  useEffect(()=>{
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
        console.error('[IntelHub] Fetch failed:', e);
        setError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();
    const i=setInterval(load, 5*60_000);
    return ()=>clearInterval(i);
  },[]);

  useEffect(()=>{
    const el=scrollRef.current; if(!el)return;
    const mv=(e:MouseEvent)=>{
      const rx=(e.clientX-el.getBoundingClientRect().left)/el.offsetWidth;
      if(rx<.15)speed.current=-.8; else if(rx<.35)speed.current=.2;
      else if(rx<.65)speed.current=1.0; else if(rx<.85)speed.current=2.5; else speed.current=4.0;
    };
    el.addEventListener('mousemove',mv);
    el.addEventListener('mouseleave',()=>{speed.current=1.2;});
    const tick=()=>{if(el)el.scrollLeft+=speed.current; af.current=requestAnimationFrame(tick);};
    af.current=requestAnimationFrame(tick);
    return ()=>{el.removeEventListener('mousemove',mv); cancelAnimationFrame(af.current);};
  },[]);

  const ts=(iso:string)=>{try{const d=new Date(iso);return d.toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return'';}};

  const ds:Record<string,string[]>={macro:['OFAC','BIS','ITA','UN'],infosec:['CISA','ICS-CERT','NIST','HIBP','IODA','BGP'],web3:['DeFiLlama','Polymarket','IPFS','Protocol Labs','Filecoin']};
  const di=items.filter(i=>ds[active]?.some(s=>i.source?.toLowerCase().includes(s.toLowerCase()))).slice(0,9);
  const top3=items.slice(0,3);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar/>

      <div className="border-b border-white/5 bg-black/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-bold tracking-[-1px] bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Intel Hub</h1>
            <p className="text-white/40 mt-1 text-base">High‑signal intelligence for Delta V ZHC</p>
          </div>
          <span className="text-xs px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50">Updates every 5 min</span>
        </div>
      </div>

      {error && (
        <div className="max-w-[1400px] mx-auto px-8 py-3 bg-red-500/10 border-b border-red-500/20 text-red-400 text-sm">
          Error: {error}
        </div>
      )}

      <div className="border-b border-white/5 py-4 bg-[#0a0a10]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-xs text-white/30 uppercase tracking-[.2em] font-medium">Raw Pulse</span>
            <span className="text-xs text-white/20">{items.length} items</span>
          </div>
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar" style={{scrollBehavior:'auto'}}>
            {loading&&<span className="text-white/30 text-sm py-8">Loading...</span>}
            {!loading&&!error&&items.length===0&&<span className="text-white/30 text-sm py-8">No items yet.</span>}
            {items.slice(0,50).map((it,i)=>(
              <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
                 className="flex-shrink-0 w-[300px] border border-white/[0.06] hover:border-white/20
                            rounded-2xl p-4 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 group">
                <div className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-white/90">{it.title}</div>
                <div className="flex items-center gap-2 mt-3 text-[11px] text-white/35">
                  {it.tag&&<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] tracking-wide ${TC[it.tag]||''}`}>#{it.tag}</span>}
                  <span className="truncate max-w-[100px]">{it.source}</span>
                  <span className="ml-auto tabular-nums">{ts(it.published_at)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] text-white/25 uppercase tracking-[.25em] font-bold">Today's Top Picks</span>
          <span className="text-[10px] text-white/15">— chiefstaff selected</span>
        </div>
        {top3.length===0&&<div className="text-white/25 text-sm">No picks yet.</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3.map((it,i)=>(
            <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
               className="border border-white/[0.08] hover:border-white/25 rounded-3xl p-6 bg-gradient-to-b from-white/[0.04] to-transparent transition-all group">
              <div className="text-lg font-semibold leading-snug group-hover:underline">{it.title}</div>
              <p className="text-white/45 text-sm mt-3 line-clamp-3 leading-relaxed">{it.summary}</p>
              <div className="flex items-center gap-2 mt-4 text-xs text-white/35">
                {it.tag&&<span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${TC[it.tag]||''}`}>#{it.tag}</span>}
                <span>{it.source}</span>
                <span className="ml-auto tabular-nums">{ts(it.published_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pb-24">
        <div className="flex gap-1.5 mb-6 bg-white/[0.03] p-1 rounded-2xl w-fit">
          {(['macro','infosec','web3']as const).map(d=>(
            <button key={d} onClick={()=>setActive(d)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active===d?'bg-white/10 text-white shadow-sm':'text-white/40 hover:text-white/70'}`}>
              {d==='macro'?'Macro':d==='infosec'?'Infosec':'Web3'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] text-white/25 uppercase tracking-[.2em] font-bold">
            {active==='macro'?'Macro & Geopolitical':active==='infosec'?'Cybersecurity & Infrastructure':'Crypto & DeFi'}
          </span>
          <span className="text-[10px] text-white/15">{di.length} high‑signal</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {di.length===0&&<div className="text-white/25 text-sm col-span-full">No high‑signal items yet.</div>}
          {di.map((it,i)=>(
            <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
               className="border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 bg-white/[0.02] transition-all group">
              <div className="text-sm font-semibold leading-snug group-hover:underline line-clamp-2">{it.title}</div>
              <p className="text-white/40 text-xs mt-2 line-clamp-2 leading-relaxed">{it.summary}</p>
              <div className="flex items-center gap-2 mt-3 text-[11px] text-white/30">
                {it.tag&&<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>}
                <span className="truncate max-w-[100px]">{it.source}</span>
                <span className="ml-auto tabular-nums">{ts(it.published_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
