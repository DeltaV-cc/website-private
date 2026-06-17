'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

/* ================================================================
   CATEGORIES — precise, non-leaking
   ================================================================ */
const CATEGORIES = [
  {id:'ai',label:'AI/ML',color:'border-l-blue-400',accent:'text-blue-400',bg:'bg-blue-500/5',
   kw:['llm','transformer','gpt','claude','deepseek','lora','qlora','sovereign ai','rlhf','alignment','neural network','attention mechanism','fine-tuning','machine learning','deep learning','training','benchmark']},
  {id:'crypto',label:'Crypto',color:'border-l-yellow-400',accent:'text-yellow-400',bg:'bg-yellow-500/5',
   kw:['wallet','defi','stablecoin','dex','amm','yield','token','staking','liquidity','privacy tech','zk','zero-knowledge','rollup','l2','on-chain','smart contract','dao','evm','solidity','polymarket','perp','orderbook','validator']},
  {id:'cybersec',label:'Cybersec',color:'border-l-orange-400',accent:'text-orange-400',bg:'bg-orange-500/5',
   kw:['vulnerability','cve','zero-day','breach','ransomware','malware','ddos','outage','bgp','cisa','kev','opsec','hardening','threat model','air-gapped','pentest','infosec','hibp','pwned','exploit']},
  {id:'macro',label:'Macro',color:'border-l-amber-400',accent:'text-amber-400',bg:'bg-amber-500/5',
   kw:['sanction','tariff','ofac','federal reserve','inflation','gdp','rate hike','treasury','sec regulation','export control','trade war','geopolitic','bis','imf','world bank','un security','compliance','antitrust']},
  {id:'hardware',label:'Hardware',color:'border-l-green-400',accent:'text-green-400',bg:'bg-green-500/5',
   kw:['gpu','cpu','npu','tpu','h100','a100','b200','compute cluster','semiconductor','fabrication','lithography','asic','fpga','meshtastic','iot','edge device']},
  {id:'science',label:'Science',color:'border-l-violet-400',accent:'text-violet-400',bg:'bg-violet-500/5',
   kw:['physics','quantum','fusion','fission','astrophysics','cosmology','nuclear','renewable','solar','wind','grid','battery','spacex','nasa','satellite','biology','genome','crispr','mrna','neuroscience','fda','clinical trial','pharma']},
];

const TAG_MAP:Record<string,string>={};
CATEGORIES.forEach(c=>c.kw.forEach(k=>{TAG_MAP[k]=c.id;}));
function getTag(t:string):string{const txt=t.toLowerCase();for(const c of CATEGORIES)if(c.kw.some(k=>txt.includes(k.trim())))return c.id;return'';}
const TC:Record<string,string>={ai:'bg-blue-500/15 text-blue-400',crypto:'bg-yellow-500/15 text-yellow-400',cybersec:'bg-orange-500/15 text-orange-400',macro:'bg-amber-500/15 text-amber-400',hardware:'bg-green-500/15 text-green-400',science:'bg-violet-500/15 text-violet-400'};

/* ================================================================
   SOCIAL ACCOUNTS PER TAB
   ================================================================ */
const SOCIAL:Record<string,{name:string;handle:string;color:string}[]> = {
  macro:[
    {name:'Reuters',handle:'@Reuters',color:'border-l-amber-400'},
    {name:'Bloomberg',handle:'@business',color:'border-l-amber-400'},
    {name:'IMF',handle:'@IMFNews',color:'border-l-blue-400'},
    {name:'World Bank',handle:'@WorldBank',color:'border-l-sky-400'},
    {name:'Fed',handle:'@federalreserve',color:'border-l-emerald-400'},
  ],
  infosec:[
    {name:'Krebs',handle:'@briankrebs',color:'border-l-red-400'},
    {name:'Schneier',handle:'@schneierblog',color:'border-l-blue-400'},
    {name:'Hacker News',handle:'@thehackernews',color:'border-l-amber-400'},
    {name:'Bleeping',handle:'@BleepinComputer',color:'border-l-orange-400'},
    {name:'Troy Hunt',handle:'@troyhunt',color:'border-l-pink-400'},
  ],
  web3:[
    {name:'Vitalik',handle:'@VitalikButerin',color:'border-l-blue-400'},
    {name:'Polymarket',handle:'@Polymarket',color:'border-l-pink-400'},
    {name:'DeFiLlama',handle:'@DefiLlama',color:'border-l-cyan-400'},
    {name:'L2Beat',handle:'@l2beat',color:'border-l-purple-400'},
    {name:'Balaji',handle:'@balajis',color:'border-l-amber-400'},
    {name:'CoinDesk',handle:'@CoinDesk',color:'border-l-orange-400'},
  ],
};

/* ================================================================
   FILTERS
   ================================================================ */
const PJ=['nba','nfl','mlb','ufc','soccer','formula','grammy','oscar','celebrity','rihanna','kardashian','super bowl','olympics','tiktok'];
const JHN=[/^Ask HN:/i,/^Tell HN:/i,/^Show HN:/i,/Who is hiring/i];
function rel(it:{title:string;source:string}){if(it.source?.toLowerCase().includes('polymarket')){const t=it.title.toLowerCase();if(PJ.some(k=>t.includes(k)))return false;return true;}if(it.source?.toLowerCase().includes('hacker')||it.source?.toLowerCase().includes('y combinator'))return!JHN.some(p=>p.test(it.title));return true;}

/* ================================================================ */
interface Item{title:string;url:string;source:string;published_at:string;summary:string;tag?:string}
interface DashData{fearGreed:any;defiLlama:{tvl:any[];volume:any[];fees:any[];stablecoins:any[];totalVolume24h?:number};polymarket:any[]}

function SeverityBadge({sev,score}:{sev:string;score:number}){const c=sev==='CRITICAL'?'bg-red-500/20 text-red-400':sev==='HIGH'?'bg-orange-500/20 text-orange-400':sev==='MEDIUM'?'bg-yellow-500/20 text-yellow-400':'bg-blue-500/20 text-blue-400';return<span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${c}`}>{score||sev}</span>;}
function TileBox({title,accent,color,count,children}:{title:string;accent:string;color:string;count:number;children:React.ReactNode}){return<div className={`rounded-2xl border border-white/[0.06] bg-white/[0.01] border-l-2 ${color} overflow-hidden`}><div className="px-4 py-3 border-b border-white/[0.04] bg-white/[0.015] flex items-center justify-between"><span className={`text-[13px] font-semibold ${accent}`}>{title}</span><span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/30">{count}</span></div><div className="divide-y divide-white/[0.02] max-h-[320px] overflow-y-auto scrollbar-hide">{children}</div></div>;}
function TileRow({it,ago}:{it:Item;ago:(iso:string)=>string}){return<a href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-white/[0.03] group"><div className="text-[11px] font-medium text-white/60 group-hover:text-white/85 line-clamp-2 leading-snug">{it.title}</div><div className="text-[9px] text-white/20 mt-1">{ago(it.published_at)}</div></a>;}

export default function IntelHubPage(){
  const [items,setItems]=useState<Item[]>([]);
  const [loading,setLoading]=useState(true);
  const [active,setActive]=useState<'macro'|'infosec'|'web3'>('macro');
  const [dd,setDd]=useState<DashData|null>(null);
  const [dd2,setDd2]=useState<any>(null);
  const [patents,setPatents]=useState<any>(null);
  const [forex,setForex]=useState<any>(null);
  const [storedPicks,setStoredPicks]=useState<Item[]>([]);
  const loadPatents=async()=>{try{const r=await fetch('/api/intel/patent-data');if(r.ok)setPatents(await r.json());}catch(e){}};
  const loadForex=async()=>{try{const r=await fetch('https://api.exchangerate-api.com/v4/latest/USD');if(r.ok)setForex(await r.json());}catch(e){}};
  const loadPicks=async()=>{try{const r=await fetch('/api/intel/picks');if(r.ok){const d=await r.json();setStoredPicks(d.picks||[]);}}catch(e){}};
  useEffect(()=>{loadPatents();loadForex();loadPicks();const i=setInterval(loadForex,5*60_000);return()=>clearInterval(i);},[]);
  const loadInfosec=async()=>{try{const r=await fetch('/api/intel/infosec-data');if(r.ok)setDd2(await r.json());}catch(e){}};
  useEffect(()=>{loadInfosec();const i=setInterval(loadInfosec,10*60_000);return()=>clearInterval(i);},[]);
  const scrollRef=useRef<HTMLDivElement>(null);
  const socialRef=useRef<HTMLDivElement>(null);
  const speed=useRef(1.2);
  const af=useRef(0);

  const load=async()=>{try{const r=await fetch('/api/intel/raw-items');if(r.ok){const d=await r.json();if(Array.isArray(d))setItems(d.map((x:any)=>({...x,tag:getTag(x.title||'')})).filter(rel));}}catch(e){}finally{setLoading(false);}};
  const loadDash=async()=>{try{const r=await fetch('/api/intel/dashboard-data');if(r.ok)setDd(await r.json());}catch(e){}};
  useEffect(()=>{setLoading(true);Promise.all([load(),loadDash()]).finally(()=>setLoading(false));const i=setInterval(()=>{load();loadDash();},5*60_000);return()=>clearInterval(i);},[]);

  useEffect(()=>{const el=scrollRef.current;if(!el)return;const mv=(e:MouseEvent)=>{const rx=(e.clientX-el.getBoundingClientRect().left)/el.offsetWidth;if(rx<.15)speed.current=-0.6;else if(rx<.35)speed.current=0.25;else if(rx<.65)speed.current=1.0;else if(rx<.85)speed.current=2.8;else speed.current=4.5;};el.addEventListener('mousemove',mv);el.addEventListener('mouseleave',()=>{speed.current=1.2;});const tick=()=>{if(el)el.scrollLeft+=speed.current;af.current=requestAnimationFrame(tick);};af.current=requestAnimationFrame(tick);return()=>{el.removeEventListener('mousemove',mv);cancelAnimationFrame(af.current);};},[]);

  useEffect(()=>{const el=socialRef.current;if(!el||active!=='web3')return;let pos=0;const tick=()=>{if(el){pos+=0.3;if(pos>=el.scrollWidth/2)pos=0;el.scrollLeft=pos;}af.current=requestAnimationFrame(tick);};af.current=requestAnimationFrame(tick);return()=>cancelAnimationFrame(af.current);},[active]);

  const ts=(iso:string)=>{try{return new Date(iso).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return'';}};
  const ago=(iso:string)=>{try{const m=(Date.now()-new Date(iso).getTime())/60000;return m<1?'now':m<60?`${Math.round(m)}m`:m<1440?`${Math.round(m/60)}h`:`${Math.round(m/1440)}d`;}catch{return'';}};
  const isNew=(iso:string)=>{try{return Date.now()-new Date(iso).getTime()<3_600_000;}catch{return false;}};
  const fmt=(n:number)=>{if(n>=1e9)return`$${(n/1e9).toFixed(2)}B`;if(n>=1e6)return`$${(n/1e6).toFixed(2)}M`;if(n>=1e3)return`$${(n/1e3).toFixed(1)}K`;return`$${n.toFixed(2)}`;};
  const fmtN=(n:number)=>{if(n>=1e9)return`${(n/1e9).toFixed(1)}B`;if(n>=1e6)return`${(n/1e6).toFixed(1)}M`;return`${n}`;};

  const fgVal=dd?.fearGreed?.data?.[0]?Number(dd.fearGreed.data[0].value)||0:0;
  const fgLabel=dd?.fearGreed?.data?.[0]?.value_classification||'';
  const totalVol=dd?.defiLlama?.totalVolume24h||0;

  // Items per dashboard category
  const dashCats=(ids:string[])=>CATEGORIES.filter(c=>ids.includes(c.id)).map(c=>{
    const catItems=items.filter(i=>c.kw.some(k=>(i.title+' '+i.summary).toLowerCase().includes(k))).slice(0,12);
    return{...c,items:catItems,count:catItems.length};
  });

  const macroCats=dashCats(['macro','science']);
  const infosecCats=dashCats(['cybersec']);
  const web3Cats=dashCats(['crypto']);

  const top3=storedPicks;

  const tabs=['macro','infosec','web3']as const;
  const tabLabel=(t:string)=>t==='macro'?'Macro':t==='infosec'?'Infosec':'Web3';
  const tabAccent=(t:string)=>t==='macro'?'text-amber-400':t==='infosec'?'text-orange-400':'text-purple-400';

  /* ============================================================== */
  return(
    <div className="min-h-screen bg-[#040407] text-white"><Navbar/>
      <div className="border-b border-white/[0.04] bg-black/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-end justify-between">
          <div><h1 className="text-[42px] font-bold tracking-[-1.5px] bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">Intel Hub</h1><p className="text-white/30 mt-1.5 text-[15px] font-light tracking-wide">High‑signal intelligence for Delta V ZHC</p></div>
          <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]"/><span className="text-[11px] text-white/30 uppercase tracking-[.15em]">Live</span></div>
        </div>
      </div>

      {/* Pulse */}
      <div className="border-b border-white/[0.04] py-4 bg-[#080810]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-3"><span className="text-[11px] text-white/20 uppercase tracking-[.2em] font-semibold">Pulse</span><span className="w-px h-3 bg-white/5"/><span className="text-[11px] text-white/15 tabular-nums">{items.length} signals</span></div>
          <div ref={scrollRef} className="flex gap-3" style={{overflowX:'scroll',scrollbarWidth:'none',WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',maskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)'}}>
            {loading&&Array.from({length:6}).map((_,i)=>(<div key={i} className="flex-shrink-0 w-[260px] rounded-2xl p-4 bg-white/[0.02] border border-white/[0.04] animate-pulse"><div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3"/><div className="h-3 bg-white/[0.05] rounded w-1/2"/></div>))}
            {!loading&&items.length===0&&<div className="text-white/15 text-sm italic py-6 px-2">Awaiting first signals</div>}
            {items.slice(0,40).map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-[260px] rounded-2xl p-4 border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group"><div className="flex items-start gap-2"><div className="flex-1 min-w-0"><div className="text-[13px] font-medium leading-snug line-clamp-2 text-white/85 group-hover:text-white">{it.title}</div></div>{isNew(it.published_at)&&<span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400"/>}</div><div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">{it.tag&&<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>}<span className="truncate max-w-[90px]">{it.source}</span><span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span></div></a>))}
          </div>
        </div>
      </div>

      {/* Top 3 */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-5"><span className="text-[11px] text-white/20 uppercase tracking-[.25em] font-bold">Top Picks</span><span className="w-px h-3 bg-white/[0.06]"/><span className="text-[11px] text-white/10">chiefstaff</span></div>
        {top3.length===0?<div className="text-white/25 text-[13px] font-light py-4">Chief staff selects Top Picks twice daily via Telegram. None selected yet.</div>:
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{top3.map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="group rounded-2xl p-5 border border-white/[0.06] hover:border-white/15 bg-gradient-to-b from-white/[0.03] to-white/[0.005] hover:from-white/[0.06] transition-all duration-300"><div className="text-[16px] font-semibold leading-snug text-white/90 group-hover:text-white group-hover:underline decoration-white/20 underline-offset-4">{it.title}</div><p className="text-white/35 text-sm mt-2 line-clamp-2 leading-relaxed">{it.summary}</p><div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">{it.tag&&<span className={`px-2 py-0.5 rounded-lg font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>}<span>{it.source}</span><span className="ml-auto tabular-nums">{ts(it.published_at)}</span></div></a>))}</div>}
      </div>

      {/* ==================== TABS ==================== */}
      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        <div className="flex gap-1 bg-white/[0.02] p-1 rounded-2xl w-fit mb-6 border border-white/[0.04]">
          {tabs.map(d=>(<button key={d} onClick={()=>setActive(d)} className={`px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${active===d?`${tabAccent(d)} bg-white/[0.08] shadow-sm`:'text-white/25 hover:text-white/50'}`}>{tabLabel(d)}</button>))}
        </div>

        {/* ============ MACRO TAB ============ */}
        {active==='macro'&&(
          <div className="space-y-4">
            {/* F&G + Forex + Market Movers */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-3 flex flex-col items-center">
                <div className="text-[9px] text-amber-400 uppercase tracking-[.15em] font-bold mb-1">F&G</div>
                <div className="relative h-20 w-4 bg-white/[0.04] rounded-full overflow-hidden mb-1"><div className={`absolute bottom-0 w-full rounded-full ${fgVal>50?'bg-emerald-500/60':fgVal<30?'bg-red-500/60':'bg-amber-500/60'}`} style={{height:`${Math.max(3,fgVal)}%`}}/></div>
                <div className={`text-sm font-bold ${fgVal>50?'text-emerald-400':fgVal<30?'text-red-400':'text-amber-400'}`}>{fgVal||'--'}</div><div className="text-[8px] text-white/25">{fgLabel||'...'}</div>
              </div>
              <div className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-3">
                <div className="text-[9px] text-white/20 uppercase tracking-[.1em] font-bold mb-1.5">Forex</div>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {[{l:'EUR/USD',v:forex?.rates?.EUR?(1/forex.rates.EUR).toFixed(4):'...'},{l:'USD/JPY',v:forex?.rates?.JPY?forex.rates.JPY.toFixed(2):'...'},{l:'GBP/USD',v:forex?.rates?.GBP?(1/forex.rates.GBP).toFixed(4):'...'},{l:'USD/CHF',v:forex?.rates?.CHF?forex.rates.CHF.toFixed(4):'...'},{l:'USD/CNY',v:forex?.rates?.CNY?forex.rates.CNY.toFixed(2):'...'}].map((p,i)=>(<div key={i}><div className="text-[9px] text-white/25">{p.l}</div><div className="text-[12px] font-bold text-white/70">{p.v}</div></div>))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-3">
                <div className="text-[9px] text-white/20 uppercase tracking-[.1em] font-bold mb-1.5">Markets</div>
                <div className="space-y-0.5 text-[10px]">
                  {[{l:'S&P',v:'5,847',d:'up'},{l:'NASDAQ',v:'18,932',d:'up'},{l:'VIX',v:'14.2',d:'down'},{l:'10Y',v:'4.32%',d:'up'},{l:'Gold',v:'$3,247',d:'up'},{l:'Oil',v:'$72.40',d:'down'}].map((m,i)=>(<div key={i} className="flex justify-between"><span className="text-white/35">{m.l}</span><span className={`tabular-nums ${m.d==='up'?'text-emerald-400':'text-red-400'}`}>{m.v}</span></div>))}
                </div>
                <div className="text-[7px] text-white/8 mt-1 text-right">⚡ needs API key</div>
              </div>
            </div>

            {/* Patent Panel — compact, precise */}
            {patents&&(
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
              <div className="px-4 py-2 border-b border-white/[0.04] bg-white/[0.015] flex items-center gap-2">
                <span className="text-[10px] text-white/20 uppercase tracking-[.15em] font-bold">Patents</span>
                <span className="text-[9px] text-white/15">{patents.header.uspto} grants · {patents.header.yoy}</span>
                <span className="text-[8px] text-white/10 ml-auto">USPTO</span>
              </div>
              <div className="p-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div><div className="text-[9px] text-white/15 uppercase tracking-[.1em] mb-1">Holders</div><div className="space-y-0">{patents.topHolders.map((h:any,i:number)=>(<div key={i} className="flex justify-between text-[10px] py-0.5"><span className="text-white/40 truncate mr-1">{h.name}</span><span className="tabular-nums text-white/55">{h.count} <span className="text-white/25">{h.mcap}</span></span></div>))}</div></div>
                <div><div className="text-[9px] text-white/15 uppercase tracking-[.1em] mb-1">Tech</div><div className="space-y-0">{patents.techAreas.map((t:any,i:number)=>(<div key={i} className="flex justify-between text-[10px] py-0.5"><span className="text-white/40 truncate mr-1">{t.name}</span><span className="text-white/25">{t.pct}</span></div>))}</div></div>
                <div><div className="text-[9px] text-white/15 uppercase tracking-[.1em] mb-1">Hot</div><div className="space-y-0">{patents.hotAreas.map((h:any,i:number)=>(<div key={i} className="flex justify-between text-[10px] py-0.5"><span className="text-white/40 truncate mr-1">{h.name}</span><span className="text-[8px] text-white/20">{h.trend}</span></div>))}</div></div>
                <div><div className="text-[9px] text-white/15 uppercase tracking-[.1em] mb-1">Sources</div><div className="space-y-0">{(()=>{const srcs=[...new Set(items.filter(i=>i.tag==='ai'||i.tag==='research'||i.tag==='hardware').map(i=>i.source))].slice(0,8);return srcs.map((s,i)=>(<div key={i} className="text-[10px] py-0.5 text-white/30 truncate">{s}</div>));})()}</div></div>
              </div>
            </div>
            )}

            {/* Cat boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {macroCats.map(cat=>(
                <div key={cat.id} className={`rounded-2xl border border-white/[0.06] ${cat.bg} border-l-2 ${cat.color} overflow-hidden`}>
                  <div className="px-4 py-3 border-b border-white/[0.04] bg-white/[0.015] flex items-center justify-between"><span className={`text-[13px] font-semibold ${cat.accent}`}>{cat.label}</span><span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/30 tabular-nums">{cat.count}</span></div>
                  <div className="divide-y divide-white/[0.02] max-h-[260px] overflow-y-auto scrollbar-hide">
                    {cat.items.length===0?<div className="px-4 py-6 text-[11px] text-white/10 italic text-center">no signals</div>:cat.items.map((it,j)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-white/[0.03] group"><div className="text-[11px] font-medium text-white/60 group-hover:text-white/85 line-clamp-1">{it.title}</div><div className="flex items-center gap-2 mt-1 text-[9px] text-white/20"><span className="truncate max-w-[80px]">{it.source}</span><span className="ml-auto tabular-nums">{ago(it.published_at)}</span></div></a>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ INFOSEC TAB ============ */}
        {active==='infosec'&&(
          <div className="space-y-5">
            {/* Red Notice — dynamic */}
            <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.03] p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-[11px] text-red-400 uppercase tracking-[.15em] font-bold">⚠ Active Threats</span><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
                {dd2?.kev?.length>0?<div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-3"><div className="font-semibold text-red-300 mb-1">🔐 {dd2.kev.length} KEV Active</div><div className="text-white/50">CISA Known Exploited. Apply patches within due dates.</div></div>:<div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-3"><div className="font-semibold text-red-300 mb-1">🔐 Revoke</div><div className="text-white/50">Check wallet approvals. Use revoke.cash</div></div>}
                {dd2?.cves?.filter((c:any)=>c.severity==='CRITICAL'||c.severity==='HIGH').length>0?<div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-3"><div className="font-semibold text-orange-300 mb-1">📦 {dd2.cves.filter((c:any)=>c.severity==='CRITICAL'||c.severity==='HIGH').length} Critical CVEs</div><div className="text-white/50">Update affected systems immediately.</div></div>:<div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-3"><div className="font-semibold text-orange-300 mb-1">📦 Update</div><div className="text-white/50">Run audit. Patch compromised packages.</div></div>}
                {dd2?.breaches?.length>0?<div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] p-3"><div className="font-semibold text-yellow-300 mb-1">🛡️ {dd2.breaches.length} Breaches</div><div className="text-white/50">Change passwords. Enable 2FA on exposed accounts.</div></div>:<div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] p-3"><div className="font-semibold text-yellow-300 mb-1">🛡️ Check</div><div className="text-white/50">Audit exposed ports. Rotate keys.</div></div>}
              </div>
            </div>

            {/* Infosec Data Tiles */}
            <div id="infosec-data" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* CISA Alerts — from RSS items */}
              <TileBox title="CISA Alerts" accent="text-emerald-400" color="border-l-emerald-400" count={items.filter(i=>i.source?.toLowerCase().includes('cisa')).length}>
                {items.filter(i=>i.source?.toLowerCase().includes('cisa')).slice(0,6).map((it,j)=>(
                  <TileRow key={j} it={it} ago={ago} />
                ))}
              </TileBox>

              {/* CISA KEV — from API */}
              <TileBox title="CISA KEV" accent="text-red-400" color="border-l-red-400" count={dd2?.kev?.length||0}>
                {(dd2?.kev||[]).map((v:any,j:number)=>(
                  <div key={j} className="px-4 py-2.5 border-b border-white/[0.02] last:border-0">
                    <div className="text-[12px] font-medium text-white/70">{v.cve}</div>
                    <div className="text-[10px] text-white/30 mt-0.5 line-clamp-2">{v.vendor} — {v.product}: {v.name}</div>
                    <div className="text-[9px] text-red-400/60 mt-1">Due: {v.dueDate?.slice(0,10)}</div>
                  </div>
                ))}
              </TileBox>

              {/* Latest CVEs */}
              <TileBox title="Latest CVEs" accent="text-orange-400" color="border-l-orange-400" count={dd2?.cves?.length||0}>
                {(dd2?.cves||[]).map((c:any,j:number)=>(
                  <div key={j} className="px-4 py-2.5 border-b border-white/[0.02] last:border-0">
                    <div className="flex items-center gap-2"><span className="text-[12px] font-medium text-white/70">{c.id}</span><SeverityBadge sev={c.severity} score={c.score}/></div>
                    <div className="text-[10px] text-white/30 mt-0.5 line-clamp-2">{c.description}</div>
                  </div>
                ))}
              </TileBox>

              {/* Breaches (HIBP) */}
              <TileBox title="Recent Breaches" accent="text-pink-400" color="border-l-pink-400" count={dd2?.breaches?.length||0}>
                {(dd2?.breaches||[]).map((b:any,j:number)=>(
                  <div key={j} className="px-4 py-2.5 border-b border-white/[0.02] last:border-0">
                    <div className="text-[12px] font-medium text-white/70">{b.name}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{b.domain} · {b.count?.toLocaleString()} accounts · {b.data}</div>
                    <div className="text-[9px] text-white/15 mt-0.5">{b.date}</div>
                  </div>
                ))}
              </TileBox>
            </div>
          </div>
        )}

        {/* ============ WEB3 TAB ============ */}
        {active==='web3'&&(
          <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* TVL Leaderboard */}
              <div className="lg:col-span-1 rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
                <div className="px-5 py-3 border-b border-white/[0.04] bg-white/[0.015]"><div className="text-[11px] text-purple-400 uppercase tracking-[.15em] font-bold">TVL by Chain</div></div>
                <div className="grid grid-cols-[28px_1fr_80px] gap-3 px-5 py-2.5 border-b border-white/[0.03] bg-white/[0.02] text-[10px] text-white/20 uppercase tracking-wider font-semibold"><div>#</div><div>Chain</div><div className="text-right">TVL</div></div>
                {dd?.defiLlama?.tvl?.slice(0,12).map((c:any,i:number)=>(<div key={i} className={`grid grid-cols-[28px_1fr_80px] gap-3 px-5 py-2.5 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] ${i%2===1?'bg-white/[0.005]':''}`}><div className="text-[11px] text-white/25 tabular-nums">{i+1}</div><div className="text-[12px] font-medium text-white/75 truncate">{c.name}</div><div className="text-[12px] font-semibold text-right tabular-nums text-purple-400/80">{fmt(c.tvl)}</div></div>))||<div className="p-5 text-white/15 text-xs italic text-center">Loading...</div>}
              </div>
              {/* Metrics */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5"><div className="text-[10px] text-cyan-400 uppercase tracking-[.15em] font-bold mb-2">Total Volume</div><div className="text-2xl font-bold tabular-nums text-white/80">{fmt(totalVol)}</div><div className="text-[10px] text-white/20 mt-1">24h DEX</div><div className="mt-3 space-y-1">{dd?.defiLlama?.volume?.slice(0,5).map((v:any,i:number)=>(<div key={i} className="flex justify-between text-[11px]"><span className="text-white/30 truncate">{v.name}</span><span className="text-white/50 tabular-nums">{fmt(v.volume24h)}</span></div>))}</div></div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5"><div className="text-[10px] text-emerald-400 uppercase tracking-[.15em] font-bold mb-3">Stablecoins</div><div className="space-y-2">{dd?.defiLlama?.stablecoins?.slice(0,6).map((s:any,i:number)=>(<div key={i} className="flex justify-between"><span className="text-[12px] text-white/50">{s.name}</span><span className="text-[11px] text-white/70 tabular-nums">{fmt(s.circulating)}</span></div>))||<div className="text-white/15 text-xs italic">Loading...</div>}</div></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5"><div className="text-[10px] text-amber-400 uppercase tracking-[.15em] font-bold mb-3">Fees (24h)</div><div className="space-y-2">{dd?.defiLlama?.fees?.slice(0,6).map((f:any,i:number)=>(<div key={i} className="flex justify-between"><span className="text-[12px] text-white/50 truncate">{f.name}</span><span className="text-[11px] text-white/70 tabular-nums">{fmt(f.fees24h)}</span></div>))||<div className="text-white/15 text-xs italic">Loading...</div>}</div></div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 flex flex-col items-center"><div className="text-[10px] text-amber-400 uppercase tracking-[.15em] font-bold mb-3">Fear & Greed</div><div className="relative h-32 w-6 bg-white/[0.04] rounded-full overflow-hidden mb-2"><div className={`absolute bottom-0 w-full rounded-full transition-all duration-700 ${fgVal>50?'bg-emerald-500/60':fgVal<30?'bg-red-500/60':'bg-amber-500/60'}`} style={{height:`${Math.max(3,fgVal)}%`}}/></div><div className={`text-xl font-bold mt-2 ${fgVal>50?'text-emerald-400':fgVal<30?'text-red-400':'text-amber-400'}`}>{fgVal||'--'}</div><div className="text-[10px] text-white/25 mt-0.5">{fgLabel||'...'}</div></div>
                </div>
                {/* Polymarket */}
                {dd?.polymarket?.length>0&&(<div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden"><div className="px-5 py-3 border-b border-white/[0.04] bg-white/[0.015]"><div className="text-[11px] text-pink-400 uppercase tracking-[.15em] font-bold">Polymarket</div></div><div className="grid grid-cols-[1fr_80px_80px] gap-3 px-5 py-2.5 border-b border-white/[0.03] bg-white/[0.02] text-[10px] text-white/20 uppercase tracking-wider font-semibold"><div>Market</div><div className="text-right">Vol</div><div className="text-right">Liq</div></div>{dd.polymarket.slice(0,5).map((m:any,i:number)=>(<a key={i} href={`https://polymarket.com/event/${m.slug}`} target="_blank" rel="noopener noreferrer" className={`grid grid-cols-[1fr_80px_80px] gap-3 px-5 py-2.5 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] ${i%2===1?'bg-white/[0.005]':''}`}><div className="text-[12px] text-white/60 hover:text-white/80 truncate">{m.title}</div><div className="text-[11px] text-right text-white/30 tabular-nums">{fmtN(m.volume)}</div><div className="text-[11px] text-right text-white/20 tabular-nums">{fmtN(m.liquidity)}</div></a>))}</div>)}
              </div>
            </div>
            {/* Cat boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {web3Cats.map(cat=>(
                <div key={cat.id} className={`rounded-2xl border border-white/[0.06] ${cat.bg} border-l-2 ${cat.color} overflow-hidden`}>
                  <div className="px-4 py-3 border-b border-white/[0.04] bg-white/[0.015] flex items-center justify-between"><span className={`text-[13px] font-semibold ${cat.accent}`}>{cat.label}</span><span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/30">{cat.count}</span></div>
                  <div className="divide-y divide-white/[0.02] max-h-[260px] overflow-y-auto scrollbar-hide">
                    {cat.items.length===0?<div className="px-4 py-6 text-[11px] text-white/10 italic text-center">no signals</div>:cat.items.map((it,j)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-white/[0.03] group"><div className="text-[11px] font-medium text-white/60 group-hover:text-white/85 line-clamp-1">{it.title}</div><div className="flex items-center gap-2 mt-1 text-[9px] text-white/20"><span className="truncate max-w-[80px]">{it.source}</span><span className="ml-auto">{ago(it.published_at)}</span></div></a>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
