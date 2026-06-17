'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

/* ================================================================
   CATEGORIES & COLORS
   ================================================================ */
const CATEGORIES = [
  {id:'ai',label:'AI',color:'border-l-blue-400',accent:'text-blue-400',bg:'bg-blue-500/5',kw:['ai','llm','transformer','gpt','claude','deepseek','agent','model','inference','training','fine-tuning','neural','dataset','benchmark','machine learning','deep learning','lora','qlora','sovereign','local-first']},
  {id:'crypto',label:'Crypto',color:'border-l-yellow-400',accent:'text-yellow-400',bg:'bg-yellow-500/5',kw:['bitcoin','ethereum','blockchain','defi','token','yield','dex','amm','stablecoin','staking','validator','rollup','l2','on-chain','polymarket','orderbook','perp','nft','dao','evm']},
  {id:'cybersec',label:'Sec',color:'border-l-orange-400',accent:'text-orange-400',bg:'bg-orange-500/5',kw:['vulnerability','exploit','cve','zero-day','breach','ransomware','malware','ddos','outage','bgp','cisa','kev','opsec','privacy','hardening','threat','infosec']},
  {id:'macro',label:'Macro',color:'border-l-amber-400',accent:'text-amber-400',bg:'bg-amber-500/5',kw:['sanction','tariff','ofac','federal reserve','inflation','gdp','rate hike','treasury','sec','regulation','export control','trade war','geopolitic']},
  {id:'hardware',label:'HW',color:'border-l-green-400',accent:'text-green-400',bg:'bg-green-500/5',kw:['chip','gpu','cpu','npu','tpu','h100','a100','b200','compute cluster','semiconductor','fabrication','meshtastic','iot']},
  {id:'science',label:'Sci',color:'border-l-violet-400',accent:'text-violet-400',bg:'bg-violet-500/5',kw:['physics','quantum','fusion','astrophysics','energy','nuclear','solar','space','spacex','nasa','biology','genome','crispr','medical','fda']},
];

const KW:Record<string,string>={ai:'ai,llm,transformer,gpt,claude,deepseek,agent,model,inference,training,fine-tuning',crypto:'bitcoin,ethereum,blockchain,defi,token,yield,dex,amm,stablecoin,staking,polymarket',cybersec:'vulnerability,cve,zero-day,breach,ransomware,malware,opsec,privacy',macro:'sanction,tariff,ofac,federal reserve,inflation,gdp,treasury,sec,regulation',hardware:'chip,gpu,cpu,npu,tpu,h100,semiconductor,iot',science:'physics,quantum,fusion,astrophysics,energy,nuclear,solar,space,biology,genome',ip:'patent,uspto,trademark,copyright',research:'arxiv,paper,study,benchmark',legal:'regulation,law,ftc,doj,gdpr',};
const TC:Record<string,string>={ai:'bg-blue-500/15 text-blue-400',crypto:'bg-yellow-500/15 text-yellow-400',cybersec:'bg-orange-500/15 text-orange-400',macro:'bg-amber-500/15 text-amber-400',hardware:'bg-green-500/15 text-green-400',science:'bg-violet-500/15 text-violet-400',ip:'bg-pink-500/15 text-pink-400',research:'bg-indigo-500/15 text-indigo-400',legal:'bg-rose-500/15 text-rose-400',};
function getTag(t:string):string{const txt=t.toLowerCase();for(const[k,v]of Object.entries(KW))if(v.split(',').some(x=>txt.includes(x.trim())))return k;return'';}

/* ================================================================
   FILTERS
   ================================================================ */
const PJ=['nba','nfl','mlb','ufc','soccer','formula','grammy','oscar','celebrity','rihanna','kardashian','super bowl','olympics','tiktok'];
const JHN=[/^Ask HN:/i,/^Tell HN:/i,/^Show HN:/i,/Who is hiring/i];
function rel(it:{title:string;source:string}){if(it.source?.toLowerCase().includes('polymarket')){const t=it.title.toLowerCase();if(PJ.some(k=>t.includes(k)))return false;return true;}if(it.source?.toLowerCase().includes('hacker')||it.source?.toLowerCase().includes('y combinator'))return!JHN.some(p=>p.test(it.title));return true;}

/* ================================================================ */
interface Item{title:string;url:string;source:string;published_at:string;summary:string;tag?:string}
interface DashData{fearGreed:any;defiLlama:{tvl:any[];volume:any[];fees:any[];stablecoins:any[]};polymarket:any[]}

export default function IntelHubPage(){
  const [items,setItems]=useState<Item[]>([]);
  const [loading,setLoading]=useState(true);
  const [active,setActive]=useState<'macro'|'infosec'|'web3'>('web3');
  const [dd,setDd]=useState<DashData|null>(null);
  const scrollRef=useRef<HTMLDivElement>(null);
  const speed=useRef(1.2);
  const af=useRef(0);

  const load=async()=>{try{const r=await fetch('/api/intel/raw-items');if(r.ok){const d=await r.json();if(Array.isArray(d))setItems(d.map((x:any)=>({...x,tag:getTag(x.title||'')})).filter(rel));}}catch(e){}finally{setLoading(false);}};
  const loadDash=async()=>{try{const r=await fetch('/api/intel/dashboard-data');if(r.ok)setDd(await r.json());}catch(e){}};
  useEffect(()=>{setLoading(true);Promise.all([load(),loadDash()]).finally(()=>setLoading(false));const i=setInterval(()=>{load();loadDash();},5*60_000);return()=>clearInterval(i);},[]);

  useEffect(()=>{const el=scrollRef.current;if(!el)return;const mv=(e:MouseEvent)=>{const rx=(e.clientX-el.getBoundingClientRect().left)/el.offsetWidth;if(rx<.15)speed.current=-0.6;else if(rx<.35)speed.current=0.25;else if(rx<.65)speed.current=1.0;else if(rx<.85)speed.current=2.8;else speed.current=4.5;};el.addEventListener('mousemove',mv);el.addEventListener('mouseleave',()=>{speed.current=1.2;});const tick=()=>{if(el)el.scrollLeft+=speed.current;af.current=requestAnimationFrame(tick);};af.current=requestAnimationFrame(tick);return()=>{el.removeEventListener('mousemove',mv);cancelAnimationFrame(af.current);};},[]);

  const ts=(iso:string)=>{try{return new Date(iso).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return'';}};
  const ago=(iso:string)=>{try{const m=(Date.now()-new Date(iso).getTime())/60000;return m<1?'now':m<60?`${Math.round(m)}m`:m<1440?`${Math.round(m/60)}h`:`${Math.round(m/1440)}d`;}catch{return'';}};
  const isNew=(iso:string)=>{try{return Date.now()-new Date(iso).getTime()<3_600_000;}catch{return false;}};
  const fmt=(n:number)=>{if(n>=1e9)return`$${(n/1e9).toFixed(2)}B`;if(n>=1e6)return`$${(n/1e6).toFixed(2)}M`;if(n>=1e3)return`$${(n/1e3).toFixed(1)}K`;return`$${n.toFixed(2)}`;};
  const barW=(v:number,max:number)=>max>0?`${Math.round((v/max)*100)}%`:'0%';

  // Category boxes - each gets max 15 items
  const catBoxes=CATEGORIES.map(cat=>{
    const catItems=items.filter(i=>cat.kw.some(k=>(i.title+' '+i.summary).toLowerCase().includes(k))).slice(0,15);
    return{...cat,items:catItems,count:catItems.length};
  });

  // Fear & Greed value for thermometer
  const fgVal=dd?.fearGreed?.data?.[0]?Number(dd.fearGreed.data[0].value)||0:0;
  const fgLabel=dd?.fearGreed?.data?.[0]?.value_classification||'';

  const top3=items.slice(0,3);

  /* ============================================================== */
  return(
    <div className="min-h-screen bg-[#040407] text-white"><Navbar/>
      {/* Hero */}
      <div className="border-b border-white/[0.04] bg-black/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-end justify-between">
          <div><h1 className="text-[42px] font-bold tracking-[-1.5px] bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">Intel Hub</h1><p className="text-white/30 mt-1.5 text-[15px] font-light tracking-wide">High‑signal intelligence for Delta V ZHC</p></div>
          <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]"/><span className="text-[11px] text-white/30 uppercase tracking-[.15em]">Live</span></div>
        </div>
      </div>

      {/* Raw Pulse */}
      <div className="border-b border-white/[0.04] py-4 bg-[#080810]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-3"><span className="text-[11px] text-white/20 uppercase tracking-[.2em] font-semibold">Raw Pulse</span><span className="w-px h-3 bg-white/5"/><span className="text-[11px] text-white/15 tabular-nums">{items.length} items</span></div>
          <div ref={scrollRef} className="flex gap-3" style={{overflowX:'scroll',scrollbarWidth:'none',WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',maskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)'}}>
            {loading&&Array.from({length:6}).map((_,i)=>(<div key={i} className="flex-shrink-0 w-[260px] rounded-2xl p-4 bg-white/[0.02] border border-white/[0.04] animate-pulse"><div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3"/><div className="h-3 bg-white/[0.05] rounded w-1/2"/></div>))}
            {!loading&&items.length===0&&<div className="text-white/15 text-sm italic py-6 px-2">Awaiting first signals</div>}
            {items.slice(0,40).map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-[260px] rounded-2xl p-4 border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group"><div className="flex items-start gap-2"><div className="flex-1 min-w-0"><div className="text-[13px] font-medium leading-snug line-clamp-2 text-white/85 group-hover:text-white">{it.title}</div></div>{isNew(it.published_at)&&<span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400"/>}</div><div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">{it.tag&&<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>}<span className="truncate max-w-[90px]">{it.source}</span><span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span></div></a>))}
          </div>
        </div>
      </div>

      {/* Top 3 */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-5"><span className="text-[11px] text-white/20 uppercase tracking-[.25em] font-bold">Today's Top Picks</span><span className="w-px h-3 bg-white/[0.06]"/><span className="text-[11px] text-white/10">chiefstaff</span></div>
        {top3.length===0?<div className="text-white/15 text-sm italic">Top picks will appear after chiefintel triage.</div>:
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{top3.map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="group rounded-2xl p-5 border border-white/[0.06] hover:border-white/15 bg-gradient-to-b from-white/[0.03] to-white/[0.005] hover:from-white/[0.06] transition-all duration-300"><div className="text-[16px] font-semibold leading-snug text-white/90 group-hover:text-white group-hover:underline decoration-white/20 underline-offset-4">{it.title}</div><p className="text-white/35 text-sm mt-2 line-clamp-2 leading-relaxed">{it.summary}</p><div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">{it.tag&&<span className={`px-2 py-0.5 rounded-lg font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>}<span>{it.source}</span><span className="ml-auto tabular-nums">{ts(it.published_at)}</span></div></a>))}</div>}
      </div>

      {/* ==================== CHARTS ROW ==================== */}
      <div className="max-w-[1440px] mx-auto px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Fear & Greed Thermometer */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 flex flex-col items-center">
            <div className="text-[10px] text-amber-400 uppercase tracking-[.15em] font-bold mb-4">Fear & Greed</div>
            <div className="relative h-40 w-8 bg-white/[0.04] rounded-full overflow-hidden mb-3">
              <div className={`absolute bottom-0 w-full rounded-full transition-all duration-700 ${fgVal>50?'bg-emerald-500/60':fgVal<30?'bg-red-500/60':'bg-amber-500/60'}`}
                   style={{height:`${Math.max(2,fgVal)}%`}}/>
            </div>
            <div className={`text-2xl font-bold tabular-nums ${fgVal>50?'text-emerald-400':fgVal<30?'text-red-400':'text-amber-400'}`}>{fgVal||'--'}</div>
            <div className="text-[10px] text-white/30 mt-0.5">{fgLabel||'Loading...'}</div>
          </div>

          {/* Stablecoins (Pharos-style) */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
            <div className="text-[10px] text-emerald-400 uppercase tracking-[.15em] font-bold mb-3">Stablecoins</div>
            <div className="space-y-1.5">
              {dd?.defiLlama?.stablecoins?.slice(0,6).map((s:any,i:number)=>{const max=dd.defiLlama.stablecoins[0]?.circulating||1;return(<div key={i} className="flex items-center gap-2"><span className="text-[10px] text-white/40 w-12 truncate">{s.name}</span><div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-emerald-500/40 rounded-full" style={{width:barW(s.circulating,max)}}/></div><span className="text-[9px] text-white/25 w-14 text-right tabular-nums">{fmt(s.circulating)}</span></div>);})}
            </div>
          </div>

          {/* Volume (CoinGecko-style) */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
            <div className="text-[10px] text-cyan-400 uppercase tracking-[.15em] font-bold mb-3">24h Volume</div>
            <div className="space-y-1.5">
              {dd?.defiLlama?.volume?.slice(0,6).map((s:any,i:number)=>{const max=dd.defiLlama.volume[0]?.volume24h||1;return(<div key={i} className="flex items-center gap-2"><span className="text-[10px] text-white/40 w-14 truncate">{s.name}</span><div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-cyan-500/40 rounded-full" style={{width:barW(s.volume24h,max)}}/></div><span className="text-[9px] text-white/25 w-14 text-right tabular-nums">{fmt(s.volume24h)}</span></div>);})}
            </div>
            {dd?.defiLlama?.totalVolume24h?<div className="mt-2 pt-2 border-t border-white/[0.04] text-[9px] text-white/20 flex justify-between"><span>Total</span><span className="text-cyan-400">{fmt(dd.defiLlama.totalVolume24h)}</span></div>:null}
          </div>

          {/* TVL (DeFiLlama-style) */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
            <div className="text-[10px] text-purple-400 uppercase tracking-[.15em] font-bold mb-3">Total TVL</div>
            <div className="space-y-1.5">
              {dd?.defiLlama?.tvl?.slice(0,6).map((c:any,i:number)=>{const max=dd.defiLlama.tvl[0]?.tvl||1;return(<div key={i} className="flex items-center gap-2"><span className="text-[10px] text-white/40 w-14 truncate">{c.name}</span><div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-purple-500/40 rounded-full" style={{width:barW(c.tvl,max)}}/></div><span className="text-[9px] text-white/25 w-14 text-right tabular-nums">{fmt(c.tvl)}</span></div>);})}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== CATEGORY BOXES with RSS ==================== */}
      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        <div className="flex items-center gap-2 mb-5"><span className="text-[10px] text-white/15 uppercase tracking-[.15em]">Category Feed</span><span className="text-[9px] text-white/10">max 15 items · updates 5min</span></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {catBoxes.map(cat=>(
            <div key={cat.id} className={`rounded-2xl border border-white/[0.06] ${cat.bg} border-l-2 ${cat.color} overflow-hidden`}>
              <div className="px-4 py-3 border-b border-white/[0.04] bg-white/[0.015] flex items-center justify-between">
                <span className={`text-[13px] font-semibold ${cat.accent}`}>{cat.label}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/30 tabular-nums">{cat.count}</span>
              </div>
              <div className="divide-y divide-white/[0.02] max-h-[280px] overflow-y-auto scrollbar-hide">
                {cat.items.length===0?<div className="px-4 py-6 text-[11px] text-white/10 italic text-center">no items</div>:
                  cat.items.map((it,j)=>(
                    <a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-white/[0.03] transition-all group">
                      <div className="text-[11px] font-medium text-white/60 group-hover:text-white/85 line-clamp-1 leading-snug">{it.title}</div>
                      <div className="flex items-center gap-2 mt-1 text-[9px] text-white/20">
                        <span className="truncate max-w-[80px]">{it.source}</span>
                        <span className="ml-auto">{ago(it.published_at)}</span>
                      </div>
                    </a>
                  ))
                }
              </div>
            </div>
          ))}
        </div>

        {/* Polymarket quick view */}
        {dd?.polymarket?.length>0&&(
          <div className="mt-8">
            <div className="text-[10px] text-pink-400 uppercase tracking-[.15em] font-bold mb-3">Polymarket</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {dd.polymarket.slice(0,4).map((m:any,i:number)=>(
                <a key={i} href={`https://polymarket.com/event/${m.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/[0.05] bg-white/[0.01] hover:border-white/15 p-3 transition-all">
                  <div className="text-[11px] font-medium text-white/70 line-clamp-2 leading-snug">{m.title}</div>
                  <div className="flex items-center gap-3 mt-2 text-[10px]"><span className="text-white/30">Vol {fmt(m.volume)}</span><span className="text-white/20">Liq {fmt(m.liquidity)}</span></div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
