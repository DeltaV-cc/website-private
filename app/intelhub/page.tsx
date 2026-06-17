'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

/* ================================================================
   CATEGORIES
   ================================================================ */
const KW: Record<string, string> = {
  physics:'physics,quantum,particle,fusion',energy:'energy,nuclear,solar,wind,grid,battery,oil,gas',
  space:'space,spacex,nasa,rocket,satellite',cybersec:'cybersec,cve,vulnerability,breach,ransomware,outage,bgp,ddos,cisa,kev,zero-day,exploit,malware',
  opsec:'opsec,hardening,privacy,air-gapped',crypto:'bitcoin,ethereum,token,defi,yield,polymarket,orderbook,perp,stablecoin,staking,l2,rollup',
  web3:'web3,blockchain,evm,on-chain,dao,nft',macro:'macro,sanction,ofac,tariff,federal reserve,inflation,gdp,treasury,sec',
  ai:'llm,transformer,gpt,claude,deepseek,sovereign ai',ml:'machine learning,deep learning,training,benchmark',
  hardware:'chip,gpu,cpu,npu,tpu,h100,compute cluster',ip:'patent,uspto,trademark,copyright',research:'arxiv,paper,study',legal:'regulation,law,ftc,doj,gdpr',
};
function tag(t:string,s:string):string{const txt=`${t} ${s}`.toLowerCase();for(const[k,v]of Object.entries(KW))if(v.split(',').some(x=>txt.includes(x.trim())))return k;return'';}
const TC: Record<string,string>={ai:'bg-blue-500/15 text-blue-400',ml:'bg-sky-500/15 text-sky-400',opsec:'bg-red-500/15 text-red-400',cybersec:'bg-orange-500/15 text-orange-400',web3:'bg-purple-500/15 text-purple-400',crypto:'bg-yellow-500/15 text-yellow-400',hardware:'bg-green-500/15 text-green-400',macro:'bg-amber-500/15 text-amber-400',ip:'bg-pink-500/15 text-pink-400',research:'bg-indigo-500/15 text-indigo-400',legal:'bg-rose-500/15 text-rose-400',physics:'bg-violet-500/15 text-violet-400',energy:'bg-lime-500/15 text-lime-400',space:'bg-fuchsia-500/15 text-fuchsia-400'};

/* ================================================================
   SOURCE DEFINITIONS
   ================================================================ */
interface Src{name:string;color:string;match:string[]}
const MACRO_SRC:Src[]=[{name:'Reuters',color:'border-l-amber-400',match:['reuters']},{name:'Federal Reserve',color:'border-l-emerald-400',match:['federal reserve','feds']},{name:'IMF',color:'border-l-blue-400',match:['imf']},{name:'World Bank',color:'border-l-sky-400',match:['world bank']},{name:'Brookings',color:'border-l-purple-400',match:['brookings']},{name:'CFR',color:'border-l-red-400',match:['cfr']},{name:'OFAC',color:'border-l-orange-400',match:['ofac']},{name:'BIS',color:'border-l-rose-400',match:['bis']},{name:'UN',color:'border-l-cyan-400',match:['un sanctions']}];
const INFOSEC_SRC:Src[]=[{name:'CISA Advisories',color:'border-l-emerald-400',match:['cisa']},{name:'Krebs on Security',color:'border-l-red-400',match:['krebs']},{name:'The Hacker News',color:'border-l-amber-400',match:['hacker news']},{name:'BleepingComputer',color:'border-l-orange-400',match:['bleeping']},{name:'Dark Reading',color:'border-l-rose-400',match:['dark reading']},{name:'Schneier',color:'border-l-blue-400',match:['schneier']},{name:'NIST NVD',color:'border-l-purple-400',match:['nist','nvd']},{name:'ICS-CERT',color:'border-l-cyan-400',match:['ics-cert']},{name:'HIBP',color:'border-l-pink-400',match:['hibp','pwned']}];
const WEB3_SRC:Src[]=[{name:'CoinDesk',color:'border-l-orange-400',match:['coindesk']},{name:'The Block',color:'border-l-blue-400',match:['block']},{name:'Defiant',color:'border-l-purple-400',match:['defiant']},{name:'Decrypt',color:'border-l-emerald-400',match:['decrypt']},{name:'Bankless',color:'border-l-amber-400',match:['bankless']},{name:'DeFiLlama',color:'border-l-cyan-400',match:['defillama']},{name:'Polymarket',color:'border-l-pink-400',match:['polymarket']},{name:'Vitalik',color:'border-l-green-400',match:['vitalik']}];

/* ================================================================
   SOCIAL ACCOUNTS (will grow as you add links)
   ================================================================ */
const SOCIAL_ACCOUNTS = [
  {name:'Vitalik Buterin',handle:'@VitalikButerin',color:'border-l-blue-400'},
  {name:'Polymarket',handle:'@Polymarket',color:'border-l-pink-400'},
  {name:'DeFiLlama',handle:'@DefiLlama',color:'border-l-cyan-400'},
  {name:'L2Beat',handle:'@l2beat',color:'border-l-purple-400'},
  {name:'brian_armstrong',handle:'@brian_armstrong',color:'border-l-blue-400'},
  {name:'balajis',handle:'@balajis',color:'border-l-amber-400'},
];

/* ================================================================
   FILTERS
   ================================================================ */
const PK=['crypto','bitcoin','ethereum','macro','election','fed','tariff','ai','gdp','inflation','rate','treasury','sec','regulation','war','oil','energy','space'];
const PJ=['rihanna','kardashian','taylor swift','grammy','oscar','nfl','nba','super bowl','olympics','celebrity','influencer'];
const JHN=[/^Ask HN:/i,/^Tell HN:/i,/^Show HN:/i,/Who is hiring/i];
function rel(it:{title:string;source:string}){if(it.source?.toLowerCase().includes('polymarket')){const t=it.title.toLowerCase();if(PJ.some(k=>t.includes(k)))return false;return PK.some(k=>t.includes(k));}if(it.source?.toLowerCase().includes('hacker news')||it.source?.toLowerCase().includes('y combinator'))return!JHN.some(p=>p.test(it.title));return true;}

/* ================================================================ */
interface Item{title:string;url:string;source:string;published_at:string;summary:string;tag?:string}
interface DashData{fearGreed:any;defiLlama:{tvl:any[];volume:any[];fees:any[];stablecoins:any[];totalVolume24h?:number};polymarket:any[]}

export default function IntelHubPage(){
  const [items,setItems]=useState<Item[]>([]);
  const [loading,setLoading]=useState(true);
  const [active,setActive]=useState<'macro'|'infosec'|'web3'>('web3');
  const [dd,setDd]=useState<DashData|null>(null);
  const scrollRef=useRef<HTMLDivElement>(null);
  const socialRef=useRef<HTMLDivElement>(null);
  const speed=useRef(1.2);
  const af=useRef(0);

  const load=async()=>{try{const r=await fetch('/api/intel/raw-items');if(r.ok){const d=await r.json();if(Array.isArray(d))setItems(d.map((x:any)=>({...x,tag:tag(x.title||'',x.summary||'')})).filter(rel));}}catch(e){}finally{setLoading(false);}};
  const loadDash=async()=>{try{const r=await fetch('/api/intel/dashboard-data');if(r.ok)setDd(await r.json());}catch(e){}};
  useEffect(()=>{setLoading(true);Promise.all([load(),loadDash()]).finally(()=>setLoading(false));const i=setInterval(()=>{load();loadDash();},5*60_000);return()=>clearInterval(i);},[]);

  useEffect(()=>{const el=scrollRef.current;if(!el)return;const mv=(e:MouseEvent)=>{const rx=(e.clientX-el.getBoundingClientRect().left)/el.offsetWidth;if(rx<.15)speed.current=-0.6;else if(rx<.35)speed.current=0.25;else if(rx<.65)speed.current=1.0;else if(rx<.85)speed.current=2.8;else speed.current=4.5;};el.addEventListener('mousemove',mv);el.addEventListener('mouseleave',()=>{speed.current=1.2;});const tick=()=>{if(el)el.scrollLeft+=speed.current;af.current=requestAnimationFrame(tick);};af.current=requestAnimationFrame(tick);return()=>{el.removeEventListener('mousemove',mv);cancelAnimationFrame(af.current);};},[]);

  // Auto-scroll social box
  useEffect(()=>{const el=socialRef.current;if(!el)return;let pos=0;const tick=()=>{if(el){pos+=0.3;if(pos>=el.scrollWidth/2)pos=0;el.scrollLeft=pos;}af.current=requestAnimationFrame(tick);};af.current=requestAnimationFrame(tick);return()=>cancelAnimationFrame(af.current);},[]);

  const ts=(iso:string)=>{try{return new Date(iso).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return'';}};
  const ago=(iso:string)=>{try{const m=(Date.now()-new Date(iso).getTime())/60000;return m<1?'now':m<60?`${Math.round(m)}m`:m<1440?`${Math.round(m/60)}h`:`${Math.round(m/1440)}d`;}catch{return'';}};
  const isNew=(iso:string)=>{try{return Date.now()-new Date(iso).getTime()<3_600_000;}catch{return false;}};
  const fmt=(n:number)=>{if(n>=1e9)return`$${(n/1e9).toFixed(2)}B`;if(n>=1e6)return`$${(n/1e6).toFixed(2)}M`;if(n>=1e3)return`$${(n/1e3).toFixed(1)}K`;return`$${n.toFixed(2)}`;};
  const barW=(v:number,max:number)=>max>0?`${Math.round((v/max)*100)}%`:'0%';

  const top3=items.slice(0,3);

  const srcTiles=(srcs:Src[])=>srcs.map(s=>{const m=items.filter(i=>s.match.some(k=>i.source?.toLowerCase().includes(k)));return{...s,latest:m[0],count:m.length,items:m.slice(0,2)};});

  const macroTiles=srcTiles(MACRO_SRC);
  const infosecTiles=srcTiles(INFOSEC_SRC);
  const web3Tiles=srcTiles(WEB3_SRC);

  const totalItems=(tiles:any[])=>tiles.reduce((s:number,t:any)=>s+t.count,0);
  const activeSources=(tiles:any[])=>tiles.filter((t:any)=>t.count>0).length;

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

      {/* ==================== SOCIAL MEDIA BOX ==================== */}
      <div className="border-b border-white/[0.04] py-3 bg-[#0a0a12]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-2 mb-2"><span className="text-[10px] text-white/20 uppercase tracking-[.15em]">Key Accounts</span><span className="text-[9px] text-white/10">scroll</span></div>
          <div ref={socialRef} className="flex gap-3" style={{overflowX:'scroll',scrollbarWidth:'none',WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'}}>
            {SOCIAL_ACCOUNTS.map((ac,i)=>(
              <div key={i} className={`flex-shrink-0 rounded-xl border border-white/[0.05] bg-white/[0.01] border-l-2 ${ac.color} px-4 py-2.5 min-w-[160px]`}>
                <div className="text-[12px] font-medium text-white/70">{ac.name}</div>
                <div className="text-[10px] text-white/25 mt-0.5">{ac.handle}</div>
                <div className="text-[9px] text-white/15 mt-1 italic">No recent posts</div>
              </div>
            ))}
            <div className="flex-shrink-0 rounded-xl border border-white/[0.05] bg-white/[0.005] px-4 py-2.5 min-w-[140px] flex items-center justify-center">
              <span className="text-[10px] text-white/15">+ add more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Pulse */}
      <div className="border-b border-white/[0.04] py-5 bg-[#080810]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-4"><span className="text-[11px] text-white/20 uppercase tracking-[.2em] font-semibold">Raw Pulse</span><span className="w-px h-3 bg-white/5"/><span className="text-[11px] text-white/15 tabular-nums">{items.length} items</span></div>
          <div ref={scrollRef} className="flex gap-3" style={{overflowX:'scroll',scrollbarWidth:'none',WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',maskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)'}}>
            {loading&&Array.from({length:6}).map((_,i)=>(<div key={i} className="flex-shrink-0 w-[280px] rounded-2xl p-4 bg-white/[0.02] border border-white/[0.04] animate-pulse"><div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3"/><div className="h-3 bg-white/[0.05] rounded w-1/2"/></div>))}
            {!loading&&items.length===0&&<div className="text-white/15 text-sm italic py-6 px-2">Awaiting first signals</div>}
            {items.slice(0,50).map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-[280px] rounded-2xl p-4 border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group"><div className="flex items-start gap-2"><div className="flex-1 min-w-0"><div className="text-[13px] font-medium leading-snug line-clamp-2 text-white/85 group-hover:text-white">{it.title}</div></div>{isNew(it.published_at)&&<span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400"/>}</div><div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">{it.tag&&<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>}<span className="truncate max-w-[90px]">{it.source}</span><span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span></div></a>))}
          </div>
        </div>
      </div>

      {/* Top 3 */}
      <div className="max-w-[1440px] mx-auto px-8 py-10">
        <div className="flex items-center gap-3 mb-6"><span className="text-[11px] text-white/20 uppercase tracking-[.25em] font-bold">Today's Top Picks</span><span className="w-px h-3 bg-white/[0.06]"/><span className="text-[11px] text-white/10">chiefstaff</span></div>
        {top3.length===0?<div className="text-white/15 text-sm italic py-4">Top picks will appear after chiefintel triage.</div>:
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{top3.map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="group rounded-3xl p-6 border border-white/[0.06] hover:border-white/15 bg-gradient-to-b from-white/[0.03] to-white/[0.005] hover:from-white/[0.06] hover:to-white/[0.015] transition-all duration-300"><div className="text-[17px] font-semibold leading-snug text-white/90 group-hover:text-white group-hover:underline decoration-white/20 underline-offset-4">{it.title}</div><p className="text-white/35 text-sm mt-3 line-clamp-3 leading-relaxed">{it.summary}</p><div className="flex items-center gap-2 mt-5 text-[12px] text-white/25">{it.tag&&<span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${TC[it.tag]||''}`}>#{it.tag}</span>}<span>{it.source}</span><span className="ml-auto tabular-nums">{ts(it.published_at)}</span></div></a>))}</div>}
      </div>

      {/* ==================== DASHBOARDS ==================== */}
      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        {/* Tabs */}
        <div className="flex gap-1 bg-white/[0.02] p-1 rounded-2xl w-fit mb-8 border border-white/[0.04]">
          {(['macro','infosec','web3']as const).map(d=>{const a=d==='macro'?'text-amber-400':d==='infosec'?'text-orange-400':'text-purple-400';return(<button key={d} onClick={()=>setActive(d)} className={`px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${active===d?`${a} bg-white/[0.08] shadow-sm`:'text-white/25 hover:text-white/50'}`}>{d==='macro'?'Macro':d==='infosec'?'Infosec':'Web3'}</button>);})}
        </div>

        {/* ================================================================
             MACRO DASHBOARD
             ================================================================ */}
        {active==='macro'&&(<div className="space-y-8">
          {/* Fear & Greed + World Bank */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Fear & Greed with history */}
            <div className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] text-amber-400 uppercase tracking-[.15em] font-bold">Fear & Greed Index</div>
                <span className="text-[10px] text-white/20">7-day</span>
              </div>
              {dd?.fearGreed?.data?(
                <div className="flex items-end gap-2 h-24">
                  {dd.fearGreed.data.slice().reverse().map((d:any,i:number)=>{
                    const v=Number(d.value);
                    const h=Math.max(4,(v/100)*80);
                    const color=v>50?'bg-emerald-500/60':v<30?'bg-red-500/60':'bg-amber-500/60';
                    return(<div key={i} className="flex-1 flex flex-col items-center gap-1"><span className="text-[9px] text-white/30">{v}</span><div className={`w-full ${color} rounded-t transition-all duration-500`} style={{height:`${h}px`}}/><div className="text-[8px] text-white/15">{new Date(Number(d.timestamp)*1000).toLocaleString([],{month:'short',day:'numeric'})}</div></div>);
                  })}
                </div>
              ):<div className="text-white/15 text-sm italic">Loading...</div>}
              {dd?.fearGreed?.data?.[0]&&<div className="mt-3 text-[11px] text-white/30">Current: <span className="font-semibold text-white/60">{dd.fearGreed.data[0].value} — {dd.fearGreed.data[0].value_classification}</span></div>}
            </div>
            {/* World Bank snapshot */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 flex flex-col justify-between">
              <div className="text-[11px] text-sky-400 uppercase tracking-[.15em] font-bold mb-3">World Bank</div>
              {dd?.worldBankGDP?.[1]?.[0]?(
                <div className="space-y-2">
                  <div><div className="text-[10px] text-white/25">US GDP</div><div className="text-lg font-bold text-white/70">{dd.worldBankGDP[1][0].value?`$${(Number(dd.worldBankGDP[1][0].value)/1e12).toFixed(1)}T`:'N/A'}</div><div className="text-[9px] text-white/15">{dd.worldBankGDP[1][0].date}</div></div>
                </div>
              ):<div className="text-white/15 text-sm italic">Loading...</div>}
              <div className="text-[9px] text-white/10 mt-2">Source: data.worldbank.org</div>
            </div>
          </div>
          {/* AI / Hardware / Energy / Patent boxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[{label:'AI',color:'text-blue-400',icon:'🤖',kw:['ai','machine learning','llm']},{label:'Hardware',color:'text-green-400',icon:'💻',kw:['chip','gpu','cpu','compute']},{label:'Energy',color:'text-lime-400',icon:'⚡',kw:['energy','nuclear','solar','grid','oil']},{label:'Patents',color:'text-pink-400',icon:'📜',kw:['patent','uspto','trademark','ip']}].map(box=>{
              const count=items.filter(i=>box.kw.some(k=>(i.title+' '+i.summary).toLowerCase().includes(k))).length;
              return(<div key={box.label} className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 hover:border-white/15 transition-all"><div className="text-lg mb-1">{box.icon}</div><div className={`text-[12px] font-semibold ${box.color}`}>{box.label}</div><div className="text-2xl font-bold tabular-nums mt-1 text-white/60">{count}</div><div className="text-[10px] text-white/20 mt-0.5">items</div></div>);
            })}
          </div>
          {/* Source Tiles */}
          <div><div className="flex items-center gap-2 mb-4"><span className="text-[11px] text-white/20 uppercase tracking-[.15em] font-bold">Sources</span><span className="text-[10px] text-white/15">{activeSources(macroTiles)} active</span></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {macroTiles.map((s,i)=>(<div key={i} className={`rounded-2xl border border-white/[0.06] bg-white/[0.01] border-l-2 ${s.color} overflow-hidden hover:border-white/15 transition-all`}><div className="px-4 py-3 border-b border-white/[0.04] bg-white/[0.015] flex items-center justify-between"><span className="text-[13px] font-semibold text-white/80">{s.name}</span>{s.latest?<span className="text-[10px] text-white/25 flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${isNew(s.latest.published_at)?'bg-emerald-400':'bg-white/20'}`}/>{ago(s.latest.published_at)} ago</span>:<span className="text-white/15 text-[10px] italic">no data</span>}</div><div className="divide-y divide-white/[0.03]">{s.items.length===0?<div className="px-4 py-4 text-[12px] text-white/15 italic text-center">Awaiting data</div>:s.items.map((it:any,j:number)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-white/[0.03] transition-all group"><div className="text-[12px] font-medium text-white/70 group-hover:text-white/90 line-clamp-1">{it.title}</div><div className="text-[10px] text-white/25 mt-1">{ago(it.published_at)}</div></a>))}</div></div>))}
            </div>
          </div>
        </div>)}

        {/* ================================================================
             INFOSEC DASHBOARD
             ================================================================ */}
        {active==='infosec'&&(<div className="space-y-8">
          {/* Red Notice Box */}
          <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.03] p-5">
            <div className="flex items-center gap-2 mb-3"><span className="text-[11px] text-red-400 uppercase tracking-[.15em] font-bold">⚠ Active Threats</span><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
              <div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-3"><div className="font-semibold text-red-300 mb-1">🔐 Revoke Permissions</div><div className="text-white/50 leading-relaxed">Check wallet approvals. Revoke unused token allowances. Use revoke.cash</div></div>
              <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-3"><div className="font-semibold text-orange-300 mb-1">📦 Update Dependencies</div><div className="text-white/50 leading-relaxed">Run npm audit / pip audit. Check for compromised packages. Apply patches.</div></div>
              <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] p-3"><div className="font-semibold text-yellow-300 mb-1">🛡️ Check Exposure</div><div className="text-white/50 leading-relaxed">Audit exposed ports. Review firewall rules. Rotate compromised keys.</div></div>
            </div>
          </div>
          {/* Sitdeck Source Boxes */}
          <div><div className="flex items-center gap-2 mb-4"><span className="text-[11px] text-white/20 uppercase tracking-[.15em] font-bold">Data Providers</span><span className="text-[10px] text-white/15">{activeSources(infosecTiles)} active</span></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {infosecTiles.map((s,i)=>(<div key={i} className={`rounded-2xl border border-white/[0.06] bg-white/[0.01] border-l-2 ${s.color} overflow-hidden hover:border-white/15 transition-all`}><div className="px-4 py-3 border-b border-white/[0.04] bg-white/[0.015] flex items-center justify-between"><span className="text-[13px] font-semibold text-white/80">{s.name}</span><span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/30">{s.count}</span></div><div className="divide-y divide-white/[0.03]">{s.items.length===0?<div className="px-4 py-6 text-center"><div className="text-[12px] text-white/15 italic">No vulnerabilities reported</div><div className="text-[10px] text-white/10 mt-1">checking source</div></div>:s.items.map((it:any,j:number)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-white/[0.03] transition-all group"><div className="text-[12px] font-medium text-white/70 group-hover:text-white/90 line-clamp-2 leading-snug">{it.title}</div>{it.summary&&<div className="text-[10px] text-white/25 mt-1 line-clamp-1">{it.summary.slice(0,80)}</div>}<div className="text-[10px] text-white/20 mt-1.5">{ago(it.published_at)}</div></a>))}</div></div>))}
            </div>
          </div>
        </div>)}

        {/* ================================================================
             WEB3 DASHBOARD
             ================================================================ */}
        {active==='web3'&&dd&&(<div className="space-y-8">
          {/* 4 Graph Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* TVL */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
              <div className="text-[11px] text-purple-400 uppercase tracking-[.15em] font-bold mb-4">Total Value Locked</div>
              <div className="space-y-2">
                {dd.defiLlama.tvl.slice(0,8).map((c:any,i:number)=>{const max=dd.defiLlama.tvl[0]?.tvl||1;return(<div key={i} className="flex items-center gap-3"><span className="text-[12px] text-white/50 w-20 truncate">{c.name}</span><div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-purple-500/40 rounded-full transition-all duration-500" style={{width:barW(c.tvl,max)}}/></div><span className="text-[11px] text-white/30 w-16 text-right tabular-nums">{fmt(c.tvl)}</span></div>);})}
              </div>
            </div>
            {/* Volume */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
              <div className="text-[11px] text-cyan-400 uppercase tracking-[.15em] font-bold mb-4">DEX Daily Volume</div>
              <div className="space-y-2">
                {dd.defiLlama.volume.slice(0,8).map((c:any,i:number)=>{const max=dd.defiLlama.volume[0]?.volume24h||1;return(<div key={i} className="flex items-center gap-3"><span className="text-[12px] text-white/50 w-20 truncate">{c.name}</span><div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-cyan-500/40 rounded-full transition-all duration-500" style={{width:barW(c.volume24h,max)}}/></div><span className="text-[11px] text-white/30 w-16 text-right tabular-nums">{fmt(c.volume24h)}</span></div>);})}
              </div>
              {dd.defiLlama.totalVolume24h?<div className="mt-3 pt-3 border-t border-white/[0.04] flex justify-between text-[11px]"><span className="text-white/20">Total 24h</span><span className="text-cyan-400 font-semibold">{fmt(dd.defiLlama.totalVolume24h)}</span></div>:null}
            </div>
            {/* Fees */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
              <div className="text-[11px] text-amber-400 uppercase tracking-[.15em] font-bold mb-4">Fees (24h)</div>
              <div className="space-y-2">
                {dd.defiLlama.fees.slice(0,8).map((c:any,i:number)=>{const max=dd.defiLlama.fees[0]?.fees24h||1;return(<div key={i} className="flex items-center gap-3"><span className="text-[12px] text-white/50 w-20 truncate">{c.name}</span><div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-amber-500/40 rounded-full transition-all duration-500" style={{width:barW(c.fees24h,max)}}/></div><span className="text-[11px] text-white/30 w-16 text-right tabular-nums">{fmt(c.fees24h)}</span></div>);})}
              </div>
            </div>
            {/* Stablecoins */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
              <div className="text-[11px] text-emerald-400 uppercase tracking-[.15em] font-bold mb-4">Stablecoins</div>
              <div className="space-y-2">
                {dd.defiLlama.stablecoins.slice(0,6).map((c:any,i:number)=>{const max=dd.defiLlama.stablecoins[0]?.circulating||1;return(<div key={i} className="flex items-center gap-3"><span className="text-[12px] text-white/50 w-20 truncate">{c.name}</span><div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-emerald-500/40 rounded-full transition-all duration-500" style={{width:barW(c.circulating,max)}}/></div><span className="text-[11px] text-white/30 w-16 text-right tabular-nums">{fmt(c.circulating)}</span></div>);})}
              </div>
            </div>
          </div>
          {/* Polymarket */}
          <div>
            <div className="flex items-center gap-2 mb-4"><span className="text-[11px] text-pink-400 uppercase tracking-[.15em] font-bold">Polymarket</span><span className="text-[10px] text-white/20">filtered markets</span></div>
            <div className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.01]">
              <div className="grid grid-cols-[1fr_90px_90px] gap-3 px-5 py-3 border-b border-white/[0.04] bg-white/[0.015] text-[11px] text-white/20 uppercase font-semibold"><div>Market</div><div className="text-right">Volume</div><div className="text-right">Liquidity</div></div>
              {dd.polymarket.map((m:any,i:number)=>(<a key={i} href={`https://polymarket.com/event/${m.slug}`} target="_blank" rel="noopener noreferrer" className={`grid grid-cols-[1fr_90px_90px] gap-3 px-5 py-3 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.03] transition-all ${i%2===1?'bg-white/[0.008]':''}`}><div className="text-[13px] font-medium text-white/70 hover:text-white/90 truncate">{m.title}</div><div className="text-[12px] text-right tabular-nums text-white/40">{fmt(m.volume)}</div><div className="text-[12px] text-right tabular-nums text-white/25">{fmt(m.liquidity)}</div></a>))}
            </div>
          </div>
          {/* Source Tiles */}
          <div>
            <div className="flex items-center gap-2 mb-4"><span className="text-[11px] text-white/20 uppercase tracking-[.15em] font-bold">Sources</span><span className="text-[10px] text-white/15">{activeSources(web3Tiles)} active</span></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {web3Tiles.map((s,i)=>(<div key={i} className={`rounded-2xl border border-white/[0.06] bg-white/[0.01] border-l-2 ${s.color} overflow-hidden hover:border-white/15 transition-all`}><div className="px-4 py-3 border-b border-white/[0.04] bg-white/[0.015] flex items-center justify-between"><span className="text-[13px] font-semibold text-white/80">{s.name}</span>{s.latest?<span className="text-[10px] text-white/25 flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${isNew(s.latest.published_at)?'bg-emerald-400':'bg-white/20'}`}/>{ago(s.latest.published_at)} ago</span>:<span className="text-white/15 text-[10px] italic">no data</span>}</div><div className="divide-y divide-white/[0.03]">{s.items.length===0?<div className="px-4 py-4 text-[12px] text-white/15 italic text-center">Awaiting data</div>:s.items.map((it:any,j:number)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-white/[0.03] transition-all group"><div className="text-[12px] font-medium text-white/70 group-hover:text-white/90 line-clamp-1">{it.title}</div><div className="text-[10px] text-white/25 mt-1">{ago(it.published_at)}</div></a>))}</div></div>))}
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
}
