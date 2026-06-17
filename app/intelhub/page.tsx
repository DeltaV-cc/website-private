'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

/* ================================================================
   KEYWORDS
   ================================================================ */
const KEYWORDS: Record<string, string> = {
  physics: 'physics,quantum,particle,fusion,astrophysics',
  energy: 'energy,nuclear,renewable,solar,wind,grid,battery,oil,gas,opec',
  space: 'space,spacex,nasa,rocket,satellite,orbital,mars',
  cybersec: 'cybersec,cve,vulnerability,breach,ransomware,outage,bgp,ddos,cisa,kev,zero-day,exploit,malware,hibp',
  opsec: 'opsec,hardening,threat model,privacy,air-gapped',
  crypto: 'bitcoin,ethereum,token,defi,yield,orderbook,perp,stablecoin,staking,validator,dex,l2,rollup',
  web3: 'web3,blockchain,evm,on-chain,dao,nft,smart contract',
  macro: 'macro,geopolitic,sanction,ofac,tariff,federal reserve,inflation,gdp,rate hike,treasury,sec',
  ai: 'llm,transformer,gpt,claude,deepseek,mistral,gemma,sovereign ai,lora,qlora',
  ml: 'machine learning,ml,deep learning,training,benchmark,dataset,fine-tuning',
  hardware: 'chip,gpu,cpu,npu,tpu,h100,compute cluster,meshtastic',
  ip: 'patent,uspto,trademark,copyright',
  research: 'arxiv,paper,study,benchmark',
  legal: 'regulation,law,compliance,ftc,doj,gdpr',
};
function getTag(t: string, s: string): string {
  const txt = `${t} ${s}`.toLowerCase();
  for (const [tag, kw] of Object.entries(KEYWORDS))
    if (kw.split(',').some(k => txt.includes(k.trim()))) return tag;
  return '';
}

const TC: Record<string,string>={
  ai:'bg-blue-500/15 text-blue-400',ml:'bg-sky-500/15 text-sky-400',
  opsec:'bg-red-500/15 text-red-400',cybersec:'bg-orange-500/15 text-orange-400',
  web3:'bg-purple-500/15 text-purple-400',crypto:'bg-yellow-500/15 text-yellow-400',
  hardware:'bg-green-500/15 text-green-400',macro:'bg-amber-500/15 text-amber-400',
  ip:'bg-pink-500/15 text-pink-400',research:'bg-indigo-500/15 text-indigo-400',
  legal:'bg-rose-500/15 text-rose-400',physics:'bg-violet-500/15 text-violet-400',
  energy:'bg-lime-500/15 text-lime-400',space:'bg-fuchsia-500/15 text-fuchsia-400',
};

/* ================================================================
   DASHBOARDS — 4 tabs (Macro · Infosec · Web3 · Social)
   ================================================================ */
interface SourceDef { name: string; color: string; match: string[]; }
interface DashDef { accent: string; title: string; sources: SourceDef[]; tags: string[]; chart?: boolean; }

const DASHES: Record<string, DashDef> = {
  macro: {
    accent: 'text-amber-400', title: 'Macro — AI · Hardware · Energy · Headlines',
    tags: ['ai','ml','hardware','energy','space','macro','legal','physics'],
    chart: false,
    sources: [
      {name:'Anthropic',color:'border-l-blue-400',match:['anthropic']},
      {name:'OpenAI',color:'border-l-emerald-400',match:['openai']},
      {name:'DeepMind',color:'border-l-sky-400',match:['deepmind']},
      {name:'Stanford HAI',color:'border-l-purple-400',match:['stanford hai']},
      {name:'Reuters',color:'border-l-amber-400',match:['reuters']},
      {name:'Federal Reserve',color:'border-l-emerald-400',match:['federal reserve','feds']},
      {name:'IMF',color:'border-l-blue-400',match:['imf']},
      {name:'World Bank',color:'border-l-sky-400',match:['world bank']},
      {name:'Brookings',color:'border-l-purple-400',match:['brookings']},
      {name:'Nature',color:'border-l-green-400',match:['nature']},
      {name:'MIT Tech Review',color:'border-l-red-400',match:['mit technology']},
      {name:'IEEE Spectrum',color:'border-l-cyan-400',match:['ieee']},
      {name:'OFAC',color:'border-l-orange-400',match:['ofac']},
      {name:'BIS',color:'border-l-rose-400',match:['bis']},
      {name:'UN',color:'border-l-cyan-400',match:['un sanctions','un security']},
    ],
  },
  infosec: {
    accent: 'text-red-400', title: 'Infosec — CVEs · Hacks · Protocol Upgrades',
    tags: ['cybersec','opsec'],
    chart: false,
    sources: [
      {name:'NIST NVD',color:'border-l-red-400',match:['nist','nvd']},
      {name:'CISA',color:'border-l-orange-400',match:['cisa']},
      {name:'ICS-CERT',color:'border-l-amber-400',match:['ics-cert']},
      {name:'Krebs',color:'border-l-pink-400',match:['krebs']},
      {name:'The Hacker News',color:'border-l-yellow-400',match:['the hacker news']},
      {name:'BleepingComputer',color:'border-l-rose-400',match:['bleeping']},
      {name:'Dark Reading',color:'border-l-purple-400',match:['dark reading']},
      {name:'Schneier',color:'border-l-blue-400',match:['schneier']},
      {name:'HIBP',color:'border-l-pink-400',match:['hibp','pwned']},
    ],
  },
  web3: {
    accent: 'text-purple-400', title: 'Web3 — TVL · Stablecoins · DEX Volume',
    tags: ['crypto','web3'],
    chart: true,
    sources: [
      {name:'DeFiLlama',color:'border-l-emerald-400',match:['defillama']},
      {name:'IPFS',color:'border-l-sky-400',match:['ipfs']},
      {name:'Protocol Labs',color:'border-l-blue-400',match:['protocol labs']},
      {name:'Filecoin',color:'border-l-cyan-400',match:['filecoin']},
      {name:'Vitalik',color:'border-l-green-400',match:['vitalik']},
      {name:'CoinDesk',color:'border-l-orange-400',match:['coindesk']},
      {name:'The Block',color:'border-l-purple-400',match:['the block']},
      {name:'Defiant',color:'border-l-rose-400',match:['defiant']},
      {name:'Decrypt',color:'border-l-amber-400',match:['decrypt']},
      {name:'Bankless',color:'border-l-pink-400',match:['bankless']},
    ],
  },
  social: {
    accent: 'text-cyan-400', title: 'Social — X · Telegram · On-Chain Signals',
    tags: [],
    sources: [
      {name:'BrianRoemmele',color:'border-l-sky-400',match:['brianroemmele']},
      {name:'Teknium',color:'border-l-indigo-400',match:['teknium']},
      {name:'DeepSeek',color:'border-l-blue-400',match:['deepseek']},
      {name:'Qwen',color:'border-l-cyan-400',match:['qwen','alibaba_qwen']},
      {name:'Zhipu',color:'border-l-purple-400',match:['zhipu']},
      {name:'Moonshot',color:'border-l-rose-400',match:['moonshot']},
      {name:'Baichuan',color:'border-l-emerald-400',match:['baichuan']},
      {name:'lex_node',color:'border-l-amber-400',match:['lex_node']},
      {name:'pcaversaccio',color:'border-l-red-400',match:['pcaversaccio']},
      {name:'Hypernative',color:'border-l-orange-400',match:['hypernative']},
      {name:'0xngmi',color:'border-l-emerald-400',match:['0xngmi']},
      {name:'polymutex',color:'border-l-purple-400',match:['polymutex']},
      {name:'Santiment',color:'border-l-cyan-400',match:['santiment']},
      {name:'CryptoQuant',color:'border-l-amber-400',match:['cryptoquant']},
      {name:'Glassnode',color:'border-l-pink-400',match:['glassnode']},
      {name:'Lookonchain',color:'border-l-green-400',match:['lookonchain']},
      {name:'ki_young_ju',color:'border-l-yellow-400',match:['ki_young_ju']},
      {name:'L2Beat',color:'border-l-blue-400',match:['l2beat']},
    ],
  },
};

/* ================================================================ */
const JUNK_HN=[/^Ask HN:/i,/^Tell HN:/i,/^Show HN:/i,/Who is hiring/i,/Who wants to be hired/i];
function isRelevantHN(it:{title:string;source:string}){if(it.source?.toLowerCase().includes('hacker news')||it.source?.toLowerCase().includes('y combinator'))return!JUNK_HN.some(p=>p.test(it.title));return true;}

interface Item{title:string;url:string;source:string;published_at:string;summary:string;tag?:string;}
interface ChartData{totalTVL:number;dexVolume24h:number;fees24h:number;topProtocols:any[];stablecoinData:any[];updated:string;}

type DashKey = 'macro'|'infosec'|'web3'|'social';

export default function IntelHubPage(){
  const [items,setItems]=useState<Item[]>([]);
  const [charts,setCharts]=useState<ChartData|null>(null);
  const [loading,setLoading]=useState(true);
  const [active,setActive]=useState<DashKey>('macro');
  const scrollRef=useRef<HTMLDivElement>(null);
  const speed=useRef(1.2);
  const af=useRef(0);

  const load=async()=>{setLoading(true);try{const r=await fetch('/api/intel/raw-items');if(!r.ok)throw new Error('');const d=await r.json();if(!Array.isArray(d))throw new Error('');setItems(d.map((x:any)=>({...x,tag:getTag(x.title||'',x.summary||'')})).filter(isRelevantHN));}catch(e){console.error(e);}finally{setLoading(false);}};
  useEffect(()=>{load();const i=setInterval(load,5*60_000);return ()=>clearInterval(i);},[]);
  useEffect(()=>{if(active==='web3'){fetch('/api/intel/charts').then(r=>r.json()).then(setCharts).catch(()=>{});}},[]);

  useEffect(()=>{const el=scrollRef.current;if(!el)return;const mv=(e:MouseEvent)=>{const rx=(e.clientX-el.getBoundingClientRect().left)/el.offsetWidth;if(rx<.15)speed.current=-0.6;else if(rx<.35)speed.current=0.25;else if(rx<.65)speed.current=1.0;else if(rx<.85)speed.current=2.8;else speed.current=4.5;};el.addEventListener('mousemove',mv);el.addEventListener('mouseleave',()=>{speed.current=1.2;});const tick=()=>{if(el)el.scrollLeft+=speed.current;af.current=requestAnimationFrame(tick);};af.current=requestAnimationFrame(tick);return ()=>{el.removeEventListener('mousemove',mv);cancelAnimationFrame(af.current);};},[]);

  const fmt=(n:number)=>{if(n>=1e9)return'$'+(n/1e9).toFixed(1)+'B';if(n>=1e6)return'$'+(n/1e6).toFixed(1)+'M';if(n>=1e3)return'$'+(n/1e3).toFixed(1)+'K';return'$'+n.toFixed(0);};
  const ts=(iso:string)=>{try{const d=new Date(iso);return d.toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return'';}};
  const ago=(iso:string)=>{try{const m=(Date.now()-new Date(iso).getTime())/60000;return m<1?'now':m<60?`${Math.round(m)}m`:m<1440?`${Math.round(m/60)}h`:`${Math.round(m/1440)}d`;}catch{return'';}};
  const isNew=(iso:string)=>{try{return Date.now()-new Date(iso).getTime()<3_600_000;}catch{return false;}};

  const dd=DASHES[active];
  const sourceTiles=dd.sources.map(s=>{const matches=items.filter(i=>s.match.some(k=>i.source?.toLowerCase().includes(k)));return{...s,latest:matches[0],count:matches.length,items:matches.slice(0,3)};});
  const dashItems=items.filter(i=>{const src=dd.sources.some(s=>s.match.some(k=>i.source?.toLowerCase().includes(k)));const tag=dd.tags.some(t=>i.tag===t);return src||tag;}).slice(0,20);
  const top3=items.slice(0,3);
  const dc=dd;
  const totalItems=sourceTiles.reduce((s,t)=>s+t.count,0);
  const activeSources=sourceTiles.filter(s=>s.count>0).length;
  const newToday=sourceTiles.reduce((s,t)=>s+(t.latest&&isNew(t.latest.published_at)?1:0),0);

  const TAB_CLASSES=(d:DashKey)=>active===d?`${DASHES[d].accent} bg-white/[0.08] shadow-sm`:'text-white/25 hover:text-white/50';

  return(
    <div className="min-h-screen bg-[#040407] text-white"><Navbar/>
      {/* Hero */}
      <div className="border-b border-white/[0.04] bg-black/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-end justify-between">
          <div><h1 className="text-[42px] font-bold tracking-[-1.5px] bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">Intel Hub</h1><p className="text-white/30 mt-1.5 text-[15px] font-light tracking-wide">High signal intelligence for Delta V ZHC</p></div>
          <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]"/><span className="text-[11px] text-white/30 uppercase tracking-[.15em]">Live</span></div>
        </div>
      </div>

      {/* Raw Pulse */}
      <div className="border-b border-white/[0.04] py-4 bg-[#080810]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-3"><span className="text-[11px] text-white/20 uppercase tracking-[.2em] font-semibold">Raw Pulse</span><span className="w-px h-3 bg-white/5"/><span className="text-[11px] text-white/15 tabular-nums">{items.length} items</span></div>
          <div ref={scrollRef} className="flex gap-3" style={{overflowX:'scroll',scrollbarWidth:'none',WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',maskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)'}}>
            {loading&&Array.from({length:6}).map((_,i)=>(<div key={i} className="flex-shrink-0 w-[300px] rounded-2xl p-4 bg-white/[0.02] border border-white/[0.04] animate-pulse"><div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3"/><div className="h-3 bg-white/[0.05] rounded w-1/2"/></div>))}
            {!loading&&items.length===0&&<div className="text-white/15 text-sm italic py-6 px-2">Awaiting first signals</div>}
            {items.slice(0,50).map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-[300px] rounded-2xl p-4 border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group"><div className="flex items-start gap-2"><div className="flex-1 min-w-0"><div className="text-[13px] font-medium leading-snug line-clamp-2 text-white/85 group-hover:text-white">{it.title}</div></div>{isNew(it.published_at)&&<span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400"/>}</div><div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">{it.tag&&<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag]?.split(' ')[0]||''} ${TC[it.tag]?.split(' ')[1]||''}`}>#{it.tag}</span>}<span className="truncate max-w-[90px]">{it.source}</span><span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span></div></a>))}
          </div>
        </div>
      </div>

      {/* Top 3 */}
      <div className="max-w-[1440px] mx-auto px-8 py-10">
        <div className="flex items-center gap-3 mb-5"><span className="text-[11px] text-white/20 uppercase tracking-[.25em] font-bold">Today's Top Picks</span><span className="w-px h-3 bg-white/[0.06]"/><span className="text-[11px] text-white/10">chiefstaff</span></div>
        {top3.length===0&&<div className="text-white/15 text-sm italic py-4">Top picks will appear after chiefintel triage.</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3.map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="group rounded-3xl p-6 border border-white/[0.06] hover:border-white/15 bg-gradient-to-b from-white/[0.03] to-white/[0.005] hover:from-white/[0.06] hover:to-white/[0.015] transition-all duration-300"><div className="text-[17px] font-semibold leading-snug text-white/90 group-hover:text-white group-hover:underline decoration-white/20 underline-offset-4">{it.title}</div><p className="text-white/35 text-sm mt-3 line-clamp-3 leading-relaxed">{it.summary}</p><div className="flex items-center gap-2 mt-5 text-[12px] text-white/25">{it.tag&&<span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${TC[it.tag]?.split(' ')[0]||''} ${TC[it.tag]?.split(' ')[1]||''}`}>#{it.tag}</span>}<span>{it.source}</span><span className="ml-auto tabular-nums">{ts(it.published_at)}</span></div></a>))}
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        {/* Tabs — 4 now */}
        <div className="flex gap-1 bg-white/[0.02] p-1 rounded-2xl w-fit mb-8 border border-white/[0.04]">
          {(['macro','infosec','web3','social']as const).map(d=>{const s=DASHES[d];return(<button key={d} onClick={()=>setActive(d)} className={`px-5 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-200 ${TAB_CLASSES(d)}`}>{d==='macro'?'Macro':d==='infosec'?'Infosec':d==='web3'?'Web3':'Social'}</button>);})}
        </div>

        {/* Chart section (Web3 only) */}
        {active==='web3'&&charts&&(
          <div className="mb-8 space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[10px] text-white/20 uppercase tracking-wider">Total TVL</div><div className="text-2xl font-bold tabular-nums mt-1 text-emerald-400">{fmt(charts.totalTVL)}</div></div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[10px] text-white/20 uppercase tracking-wider">DEX Vol (24h)</div><div className="text-2xl font-bold tabular-nums mt-1 text-purple-400">{fmt(charts.dexVolume24h)}</div></div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[10px] text-white/20 uppercase tracking-wider">Fees (24h)</div><div className="text-2xl font-bold tabular-nums mt-1 text-amber-400">{fmt(charts.fees24h)}</div></div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[10px] text-white/20 uppercase tracking-wider">Updated</div><div className="text-base font-semibold mt-1 text-white/50">{ago(charts.updated)} ago</div></div>
            </div>
            {charts.topProtocols?.length>0&&(
              <div>
                <div className="text-[10px] text-white/15 uppercase tracking-[.15em] mb-3">Top Protocols by TVL</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {charts.topProtocols.slice(0,8).map((p:any,i:number)=>(
                    <div key={i} className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-3 hover:border-white/15 transition-all">
                      <div className="flex items-center justify-between"><span className="text-[12px] font-medium text-white/70 truncate">{p.name}</span><span className={`text-[10px] font-medium ${p.change_1d>=0?'text-emerald-400':'text-red-400'}`}>{p.change_1d>=0?'+':''}{p.change_1d?.toFixed(1)}%</span></div>
                      <div className="text-[15px] font-bold mt-1 text-white/90">{fmt(p.tvl)}</div>
                      <div className="text-[10px] text-white/25 mt-0.5">{p.chain} · {p.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {charts.stablecoinData?.length>0&&(
              <div>
                <div className="text-[10px] text-white/15 uppercase tracking-[.15em] mb-3">Stablecoins</div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {charts.stablecoinData.map((s:any,i:number)=>(
                    <div key={i} className="flex-shrink-0 w-[150px] rounded-xl border border-white/[0.05] bg-white/[0.01] p-3">
                      <div className="text-[11px] font-medium text-white/60">{s.name}</div>
                      <div className="text-[10px] text-white/30">{s.symbol}</div>
                      <div className="text-sm font-bold mt-1 text-white/80">{fmt(s.circulating)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[10px] text-white/20 uppercase tracking-wider">Sources</div><div className={`text-2xl font-bold tabular-nums mt-1 ${dc.accent}`}>{activeSources}</div><div className="text-[10px] text-white/15 mt-1">active</div></div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[10px] text-white/20 uppercase tracking-wider">Items</div><div className="text-2xl font-bold tabular-nums mt-1 text-white/70">{totalItems}</div><div className="text-[10px] text-white/15 mt-1">total</div></div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[10px] text-white/20 uppercase tracking-wider">New</div><div className="text-2xl font-bold tabular-nums mt-1 text-emerald-400">{newToday}</div><div className="text-[10px] text-white/15 mt-1">last hour</div></div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"><div className="text-[10px] text-white/20 uppercase tracking-wider">Freq</div><div className="text-base font-semibold mt-1 text-white/50">5 min</div><div className="text-[10px] text-white/15 mt-1">ingestion</div></div>
        </div>

        <div className="flex items-center justify-between mb-5"><div className="flex items-center gap-3"><span className={`text-[11px] uppercase tracking-[.2em] font-bold ${dc.accent}`}>{dc.title}</span><span className="w-px h-3 bg-white/[0.06]"/><span className="text-[11px] text-white/15">{activeSources} sources</span></div></div>

        {/* Source cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sourceTiles.map((src,i)=>(
            <div key={i} className={`rounded-2xl border border-white/[0.06] bg-white/[0.01] border-l-2 ${src.color} overflow-hidden hover:border-white/15 transition-all duration-300`}>
              <div className="px-4 py-3 border-b border-white/[0.04] flex items-center justify-between bg-white/[0.015]">
                <div className="flex items-center gap-2"><span className="text-[13px] font-semibold text-white/80">{src.name}</span>{src.count>0&&<span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/30">{src.count}</span>}</div>
                <div className="flex items-center gap-2 text-[10px] text-white/30">{src.latest?<span className="flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${isNew(src.latest.published_at)?'bg-emerald-400':'bg-white/20'}`}/>{ago(src.latest.published_at)} ago</span>:<span className="text-white/15 italic">no data</span>}</div>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {src.items.length===0?<div className="px-4 py-4 text-[12px] text-white/15 italic text-center">Awaiting data</div>:src.items.map((it,j)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-white/[0.03] transition-all duration-150 group"><div className="text-[12px] font-medium text-white/70 group-hover:text-white/90 line-clamp-1 leading-snug">{it.title}</div><div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/25">{it.tag&&<span className={`px-1.5 py-0.5 rounded font-semibold text-[9px] ${TC[it.tag]||''}`}>#{it.tag}</span>}<span className="ml-auto tabular-nums">{ago(it.published_at)}</span></div></a>))}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Table — DeFiLlama‑style compact rows */}
        <div><div className="flex items-center gap-3 mb-4"><span className="text-[10px] text-white/15 uppercase tracking-[.15em]">Latest {dashItems.length} items</span></div>
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.01]">
            <div className="grid grid-cols-[1fr_120px_80px_90px] gap-4 px-5 py-3 border-b border-white/[0.04] bg-white/[0.015] text-[11px] text-white/20 uppercase tracking-wider font-semibold"><div>Item</div><div>Source</div><div className="text-center">Tag</div><div className="text-right">Time</div></div>
            {dashItems.length===0&&<div className="px-5 py-12 text-center text-white/15 text-sm italic">No items yet.</div>}
            {dashItems.map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className={`grid grid-cols-[1fr_120px_80px_90px] gap-4 px-5 py-3 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.03] transition-all duration-150 group ${i%2===1?'bg-white/[0.008]':''}`}><div className="min-w-0"><div className="text-[13px] font-medium text-white/80 group-hover:text-white truncate leading-snug">{it.title}</div>{it.summary&&<div className="text-[11px] text-white/25 truncate mt-0.5">{it.summary.slice(0,100)}</div>}</div><div className="flex items-center text-[12px] text-white/30 truncate">{it.source}</div><div className="flex items-center justify-center">{it.tag&&<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] border ${TC[it.tag]||''}`}>#{it.tag}</span>}</div><div className="flex items-center justify-end gap-2 text-[12px] text-white/25">{isNew(it.published_at)&&<span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>}<span className="tabular-nums">{ago(it.published_at)}</span></div></a>))}
          </div>
        </div>
      </div>
    </div>
  );
}
