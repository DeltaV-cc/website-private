'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

/* ================================================================
   CATEGORIES & COLORS
   ================================================================ */
const CATS=[{id:'ai',label:'AI/ML',color:'border-l-blue-400',accent:'text-blue-400',bg:'bg-blue-500/5',kw:['llm','transformer','gpt','claude','deepseek','lora','qlora','sovereign ai','rlhf','alignment','neural network','attention mechanism','fine-tuning','machine learning','deep learning','training','benchmark','embedding','token','prompt','model','inference','agent','ai','openai','anthropic','mistral','gemini','generative','rag','vector',' semantic','copilot','chatbot','reasoning','sora','diffusion','transformer']},{id:'crypto',label:'Crypto',color:'border-l-yellow-400',accent:'text-yellow-400',bg:'bg-yellow-500/5',kw:['wallet','defi','stablecoin','dex','amm','yield','token','staking','liquidity','privacy tech','zk','zero-knowledge','rollup','l2','on-chain','smart contract','dao','evm','solidity','polymarket','perp','orderbook','validator','bitcoin','ethereum','solana','crypto','blockchain','web3','nft','bridge',' oracles','mev','airdrop','lending','borrow','swap','pool','farm','cex','dapp','multisig','signature','ecdsa','bls','threshold','tss','mpc']},{id:'cybersec',label:'Cybersec',color:'border-l-orange-400',accent:'text-orange-400',bg:'bg-orange-500/5',kw:['vulnerability','cve','zero-day','breach','ransomware','malware','ddos','outage','bgp','cisa','kev','opsec','hardening','threat model','pentest','infosec','hibp','pwned','exploit','hack','phish','spoof','patch','firewall','encrypt','auth','credential','backdoor','trojan','worm','rootkit','sandbox','isolation','airgap','soc','incident response','forensic']},{id:'macro',label:'Macro',color:'border-l-amber-400',accent:'text-amber-400',bg:'bg-amber-500/5',kw:['sanction','tariff','ofac','federal reserve','inflation','gdp','rate hike','treasury','sec regulation','export control','trade war','geopolitic','bis','imf','world bank','fed','interest rate','cpi','recession','yield curve','debt ceiling','central bank','monetary','fiscal','dollar','reserve','bond','equity','stock','index','s&p','nasdaq','dow','etf','commodity','oil','gold']},{id:'hardware',label:'HW',color:'border-l-green-400',accent:'text-green-400',bg:'bg-green-500/5',kw:['gpu','cpu','npu','tpu','h100','a100','b200','compute cluster','semiconductor','fabrication','lithography','asic','fpga','meshtastic','iot','edge device','nvidia','amd','intel','tsmc','samsung','chip','processor','memory','ddr','ssd','storage','server','datacenter','quantum']},{id:'science',label:'Sci',color:'border-l-violet-400',accent:'text-violet-400',bg:'bg-violet-500/5',kw:['physics','quantum','fusion','fission','astrophysics','nuclear','renewable','solar','wind','battery','spacex','nasa','biology','genome','crispr','neuroscience','research','paper','study','experiment','lab','scientific','discovery','breakthrough','climate','environment']}];

// Helper: strip "RT by @username:" or "RT @username:" prefix from titles
const cleanTitle=(t:string)=>{
  return t.replace(/^RT\s+by\s+@\S+?:\s*/i,'').replace(/^RT\s+@\S+?:\s*/i,'');
};

// Helper: strip HTML tags from a string
const stripHtml=(s:string)=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();

const TC:Record<string,string>={ai:'bg-blue-500/15 text-blue-400',crypto:'bg-yellow-500/15 text-yellow-400',cybersec:'bg-orange-500/15 text-orange-400',macro:'bg-amber-500/15 text-amber-400',hardware:'bg-green-500/15 text-green-400',science:'bg-violet-500/15 text-violet-400'};
// Border color per tag for pulse cards
const BCOL:Record<string,string>={ai:'border-l-blue-500/40',crypto:'border-l-yellow-500/40',cybersec:'border-l-orange-500/40',macro:'border-l-amber-500/40',hardware:'border-l-green-500/40',science:'border-l-violet-500/40'};
function getTag(title:string,summary?:string):string{
  const txt=(title+' '+(summary||'')).toLowerCase();
  for(const c of CATS)if(c.kw.some(k=>txt.includes(k.trim())))return c.id;
  return '';
}

const PJ=['nba','nfl','mlb','ufc','soccer','formula','grammy','oscar','celebrity','rihanna','kardashian','super bowl','olympics','tiktok'];
const JHN=[/^Ask HN:/i,/^Tell HN:/i,/^Show HN:/i,/Who is hiring/i];
const XSOURCES=['x:','nitter','twitter'];
function rel(it:{title:string;source:string}){if(it.source?.toLowerCase().includes('polymarket')){const t=it.title.toLowerCase();if(PJ.some(k=>t.includes(k)))return false;return true;}if(it.source?.toLowerCase().includes('hacker')||it.source?.toLowerCase().includes('y combinator'))return!JHN.some(p=>p.test(it.title));return true;}
function notTweet(it:{source:string}){return !XSOURCES.some(s=>it.source?.toLowerCase().includes(s));}

interface Item{title:string;url:string;source:string;published_at:string;summary:string;tag?:string}

export default function IntelHubPage(){
  const [items,setItems]=useState<Item[]>([]);
  const [loading,setLoading]=useState(true);
  const [active,setActive]=useState<'macro'|'infosec'|'web3'>('macro');
  const [dd,setDd]=useState<any>(null);
  const [dd2,setDd2]=useState<any>(null);
  const [forex,setForex]=useState<any>(null);
  const [patents,setPatents]=useState<any>(null);
  const [picks,setPicks]=useState<any>(null);
  const scrollRef=useRef<HTMLDivElement>(null);
  const speed=useRef(1.2);
  const af=useRef(0);

  /* ---- CLIENT-SIDE FETCHES ---- */
  const loadAll=async()=>{
    try{
      const rawRes=await fetch('/data/raw-items.json');
      if(rawRes.ok){const d=await rawRes.json();if(Array.isArray(d))setItems(d.map((x:any)=>({...x,title:cleanTitle(x.title||''),tag:getTag(x.title||'',x.summary||'')})).filter(rel));}
      const picksRes=await fetch('/data/picks.json');
      if(picksRes.ok)setPicks(await picksRes.json());
      const patRes=await fetch('/data/patents.json');
      if(patRes.ok)setPatents(await patRes.json());
    }catch(e){}
    setLoading(false);
  };

  const loadLive=async()=>{
    try{
      const result:any={};
      try{const r=await fetch('https://api.alternative.me/fng/?limit=7');if(r.ok)result.fearGreed=await r.json();}catch(e){}
      try{const r=await fetch('https://api.llama.fi/v2/chains');if(r.ok){const chains=await r.json();const sorted=chains.filter((c:any)=>c.tvl>0).sort((a:any,b:any)=>b.tvl-a.tvl);result.tvl=sorted.slice(0,12);const total=sorted.reduce((s:number,c:any)=>s+c.tvl,0)||1;result.dominance=sorted.slice(0,5).map((c:any)=>({name:c.name,pct:((c.tvl/total)*100).toFixed(1)+'%'}));}}catch(e){}
      try{const r=await fetch('https://api.llama.fi/overview/dexs?dataType=dailyVolume');if(r.ok){const d=await r.json();result.volume=(d.allChains||[]).slice(0,10).map((n:string)=>({name:n,volume24h:d.breakdown24h?.[n]||d.total24hBreakdown?.[n]||0})).filter((x:any)=>x.volume24h>0).sort((a:any,b:any)=>b.volume24h-a.volume24h);result.totalVolume24h=d.total24h||0;}}catch(e){}
      try{const r=await fetch('https://api.llama.fi/overview/fees?dataType=dailyFees');if(r.ok){const d=await r.json();result.fees=(d.allChains||[]).slice(0,10).map((n:string)=>({name:n,fees24h:d.breakdown24h?.[n]||d.total24hBreakdown?.[n]||0})).filter((x:any)=>x.fees24h>0).sort((a:any,b:any)=>b.fees24h-a.fees24h);}}catch(e){}
      try{const r=await fetch('https://stablecoins.llama.fi/stablecoins?includePrices=false');if(r.ok){const d=await r.json();result.stablecoins=(d.peggedAssets||[]).map((s:any)=>({name:s.name||s.symbol,circulating:s.circulating?.peggedUSD||0})).filter((s:any)=>s.circulating>0).sort((a:any,b:any)=>b.circulating-a.circulating).slice(0,6);}}catch(e){}
      try{const r=await fetch('https://gamma-api.polymarket.com/events?limit=50&active=true&closed=false');if(r.ok){const events=await r.json();const keep=['crypto','bitcoin','ethereum','solana','defi','macro','fed','inflation','rate','gdp','tariff','sec','regulation','treasury','election','war','oil','energy','ai'];const junk=['nba','nfl','mlb','ufc','soccer','formula','grammy','oscar','celebrity','rihanna'];result.polymarket=events.filter((e:any)=>{const t=(e.title||'').toLowerCase();return!junk.some(k=>t.includes(k))&&keep.some(k=>t.includes(k));}).slice(0,8);}}catch(e){}
      setDd(result);
    }catch(e){}
  };

  const proxy=(url:string)=>`https://proxy.hub.deltav.cc/?url=${encodeURIComponent(url)}`;

  const loadInfosec=async()=>{
    try{
      let result:any={kev:[],cves:[],breaches:[]};
      try{const r=await fetch(proxy('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'));if(r.ok){const d=await r.json();result.kev=(d.vulnerabilities||[]).slice(0,6).map((v:any)=>({cve:v.cveID,product:v.product,vendor:v.vendorProject,name:v.vulnerabilityName,dateAdded:v.dateAdded,dueDate:v.dueDate}));}}catch(e){}
      try{const r=await fetch(proxy('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=6'));if(r.ok){const d=await r.json();result.cves=(d.vulnerabilities||[]).map((v:any)=>{const cve=v.cve||{};const m=cve.metrics?.cvssMetricV31?.[0]?.cvssData||cve.metrics?.cvssMetricV30?.[0]?.cvssData||{};const desc=(cve.descriptions||[]).find((x:any)=>x.lang==='en');return{id:cve.id,severity:m.baseSeverity||'N/A',score:m.baseScore||0,description:(desc?.value||'').slice(0,140),published:cve.published};});}}catch(e){}
      try{const r=await fetch(proxy('https://haveibeenpwned.com/api/v3/breaches'));if(r.ok){const d=await r.json();result.breaches=(Array.isArray(d)?d:[]).slice(0,8).map((b:any)=>({name:b.Name||b.Title,domain:b.Domain,date:b.BreachDate,count:b.PwnCount,data:(b.DataClasses||[]).slice(0,5).join(', ')}));}}catch(e){}
      if(!result.kev.length||!result.cves.length||!result.breaches.length){
        try{const r=await fetch('/data/infosec.json');if(r.ok){const c=await r.json();if(!result.kev.length)result.kev=c.kev||[];if(!result.cves.length)result.cves=c.cves||[];if(!result.breaches.length)result.breaches=c.breaches||[];}}catch(e){}
      }
      setDd2(result);
    }catch(e){}
  };

  const loadForex=async()=>{
    try{const r=await fetch('https://api.exchangerate-api.com/v4/latest/USD');if(r.ok)setForex(await r.json());}catch(e){}
  };

  useEffect(()=>{loadAll();loadLive();loadInfosec();loadForex();const i=setInterval(()=>{loadAll();loadLive();loadInfosec();loadForex();},5*60_000);return()=>clearInterval(i);},[]);

  useEffect(()=>{const el=scrollRef.current;if(!el)return;const mv=(e:MouseEvent)=>{const rx=(e.clientX-el.getBoundingClientRect().left)/el.offsetWidth;if(rx<.15)speed.current=-0.6;else if(rx<.35)speed.current=0.25;else if(rx<.65)speed.current=1.0;else if(rx<.85)speed.current=2.8;else speed.current=4.5;};el.addEventListener('mousemove',mv);el.addEventListener('mouseleave',()=>{speed.current=1.2;});const tick=()=>{if(el)el.scrollLeft+=speed.current;af.current=requestAnimationFrame(tick);};af.current=requestAnimationFrame(tick);return()=>{el.removeEventListener('mousemove',mv);cancelAnimationFrame(af.current);};},[]);

  const ts=(iso:string)=>{try{return new Date(iso).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return'';}};
  const ago=(iso:string)=>{try{const m=(Date.now()-new Date(iso).getTime())/60000;return m<1?'now':m<60?`${Math.round(m)}m`:m<1440?`${Math.round(m/60)}h`:`${Math.round(m/1440)}d`;}catch{return'';}};
  const isNew=(iso:string)=>{try{return Date.now()-new Date(iso).getTime()<3_600_000;}catch{return false;}};
  const fmt=(n:number)=>{if(n>=1e9)return`$${(n/1e9).toFixed(2)}B`;if(n>=1e6)return`$${(n/1e6).toFixed(2)}M`;if(n>=1e3)return`$${(n/1e3).toFixed(1)}K`;return`$${n.toFixed(2)}`;};
  const fmtN=(n:number)=>{if(n>=1e9)return`${(n/1e9).toFixed(1)}B`;if(n>=1e6)return`${(n/1e6).toFixed(1)}M`;return`${n}`;};

  const top3=(picks?.picks?.length>0?picks.picks:items).slice(0,3);
  const fgVal=dd?.fearGreed?.data?.[0]?Number(dd.fearGreed.data[0].value)||0:0;
  const fgLabel=dd?.fearGreed?.data?.[0]?.value_classification||'';
  const totalVol=dd?.totalVolume24h||0;

  const catBoxes=CATS.map(cat=>({...cat,items:items.filter(i=>cat.kw.some(k=>(i.title+' '+i.summary).toLowerCase().includes(k))).slice(0,15),count:0}));
  catBoxes.forEach(c=>c.count=c.items.length);
  const macroCats=catBoxes.filter(c=>['macro','science'].includes(c.id));
  const infosecCats=catBoxes.filter(c=>['cybersec'].includes(c.id));
  const web3Cats=catBoxes.filter(c=>['crypto'].includes(c.id));

  const tabs=['macro','infosec','web3']as const;
  const tabLabel=(t:string)=>t==='macro'?'Macro':t==='infosec'?'Infosec':'Web3';
  const tabAccent=(t:string)=>t==='macro'?'text-amber-400':t==='infosec'?'text-orange-400':'text-purple-400';
  const SOCMED_SOURCES=['x: @dinosn','x: @pcaversaccio','x: @hypernativelabs'];

  function SeverityBadge({sev,score}:{sev:string;score:number}){const c=sev==='CRITICAL'?'bg-red-500/20 text-red-400':sev==='HIGH'?'bg-orange-500/20 text-orange-400':sev==='MEDIUM'?'bg-yellow-500/20 text-yellow-400':'bg-blue-500/20 text-blue-400';return<span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${c}`}>{score||sev}</span>;}
  function TileBox({title,accent,color,count,children}:{title:string;accent:string;color:string;count:number;children:React.ReactNode}){return<div className={`rounded-2xl border border-[#222] bg-white/[0.01] border-l-2 ${color} overflow-hidden`}><div className="px-4 py-3 border-b border-[#222] bg-[#111] flex items-center justify-between"><span className={`text-[13px] font-semibold ${accent}`}>{title}</span><span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-[#ededed]/30">{count}</span></div><div className="divide-y divide-white/[0.02] max-h-[320px] overflow-y-auto scrollbar-hide">{children}</div></div>;}
  function TileRow({it}:{it:Item}){return<a href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-white/[0.03] group"><div className="text-[11px] font-medium text-[#ededed]/60 group-hover:text-[#ededed]/85 line-clamp-2 leading-snug">{it.title}</div><div className="text-[9px] text-[#ededed]/20 mt-1">{ago(it.published_at)}</div></a>;}

  /* ============================================================== */
  return(
    <div className="min-h-screen bg-[#0a0a0a] text-white"><Navbar/>
      <div className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur-xl sticky top-0 z-40">
        {/* Animated gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#f59e0b] to-[#C2410C] bg-[length:400%_100%] animate-[gradient_6s_ease_infinite]"/>
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-end justify-between relative">
          <div>
            <h1 className="text-[42px] font-bold tracking-[-1.5px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#f59e0b] to-[#C2410C] bg-clip-text text-transparent">IntelHub</h1>
            <p className="text-[#ededed]/30 mt-1.5 text-[15px] font-light tracking-wide">Live threat surface · Market intel · Signal triage</p>
            {/* Color-coded stat pills */}
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-[10px] text-[#ededed]/20"><span className="w-1.5 h-1.5 rounded-full bg-amber-400/60"/>Macro</span>
              <span className="flex items-center gap-1.5 text-[10px] text-[#ededed]/20"><span className="w-1.5 h-1.5 rounded-full bg-orange-400/60"/>Infosec</span>
              <span className="flex items-center gap-1.5 text-[10px] text-[#ededed]/20"><span className="w-1.5 h-1.5 rounded-full bg-purple-400/60"/>Web3</span>
            </div>
          </div>
          <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]"/><span className="text-[11px] text-[#ededed]/30 uppercase tracking-[.15em]">Live</span></div>
        </div>
      </div>
      <style>{`@keyframes gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>

      {/* Pulse */}
      <div className="border-b border-[#222] py-4 bg-[#080810]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-3 mb-3"><span className="text-[11px] text-[#ededed]/20 uppercase tracking-[.2em] font-semibold">Pulse</span><span className="w-px h-3 bg-white/5"/><span className="text-[11px] text-[#ededed]/15 tabular-nums">{items.length} signals</span></div>
          <div ref={scrollRef} className="flex gap-3" style={{overflowX:'scroll',scrollbarWidth:'none',WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',maskImage:'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)'}}>
            {loading&&Array.from({length:6}).map((_,i)=>(<div key={i} className="flex-shrink-0 w-[260px] rounded-2xl p-4 bg-[#111] border border-[#222] animate-pulse"><div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3"/><div className="h-3 bg-white/[0.05] rounded w-1/2"/></div>))}
            {!loading&&items.length===0&&<div className="text-[#ededed]/15 text-sm italic py-6 px-2">Awaiting first signals</div>}
            {items.slice(0,60).map((it,i)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className={`flex-shrink-0 w-[260px] rounded-2xl p-4 border border-white/[0.05] bg-[#111] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group ${it.tag?(BCOL[it.tag]||'border-l-white/5'):'border-l-white/5'} border-l-2`}><div className="flex items-start gap-2"><div className="flex-1 min-w-0"><div className="text-[13px] font-medium leading-snug line-clamp-2 text-[#ededed]/85 group-hover:text-white">{it.title}</div></div>{isNew(it.published_at)&&<span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400"/>}</div><div className="flex items-center gap-2 mt-3 text-[11px] text-[#ededed]/25">{it.tag?<span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>:<span className="px-2 py-0.5 rounded-md text-[10px] bg-white/[0.04] text-[#ededed]/20">#unranked</span>}<span className="truncate max-w-[85px]">{it.source}</span><span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span></div></a>))}
          </div>
        </div>
      </div>

      {/* Top 3 */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-5"><span className="text-[11px] text-[#ededed]/20 uppercase tracking-[.25em] font-bold">Top Picks</span><span className="w-px h-3 bg-white/[0.06]"/><span className="text-[11px] text-[#ededed]/10">chiefstaff</span></div>
        {top3.length===0?<div className="text-[#ededed]/15 text-sm italic">Top picks after triage.</div>:
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{top3.map((it:any,i:number)=>(<a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className="group rounded-2xl p-5 border border-[#222] hover:border-white/15 bg-gradient-to-b from-white/[0.03] to-white/[0.005] hover:from-white/[0.06] transition-all duration-300"><div className="text-[16px] font-semibold leading-snug text-[#ededed]/90 group-hover:text-white group-hover:underline decoration-white/20 underline-offset-4">{it.title}</div><p className="text-[#ededed]/35 text-sm mt-2 line-clamp-2 leading-relaxed">{it.summary}</p><div className="flex items-center gap-2 mt-3 text-[11px] text-[#ededed]/25">{it.tag&&<span className={`px-2 py-0.5 rounded-lg font-semibold text-[10px] ${TC[it.tag]||''}`}>#{it.tag}</span>}<span>{it.source}</span><span className="ml-auto tabular-nums">{ts(it.published_at)}</span></div></a>))}</div>}
      </div>

      {/* ==================== TABS ==================== */}
      <div className="max-w-[1440px] mx-auto px-8 pb-24">
        <div className="flex gap-1 bg-[#111] p-1 rounded-2xl w-fit mb-5 border border-[#222]">
          {tabs.map(d=>(<button key={d} onClick={()=>setActive(d)} className={`px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${active===d?`${tabAccent(d)} bg-white/[0.08] shadow-sm`:'text-[#ededed]/25 hover:text-[#ededed]/50'}`}>{tabLabel(d)}</button>))}
        </div>

        {/* ============ MACRO TAB ============ */}
        {active==='macro'&&(<div className="space-y-4">
          {/* Top row: F&G + Forex chart + Market Movers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4 flex flex-col items-center"><div className="text-[9px] text-amber-400 uppercase tracking-[.15em] font-bold mb-2">F&G</div><div className="relative h-24 w-5 bg-white/[0.04] rounded-full overflow-hidden mb-1"><div className={`absolute bottom-0 w-full rounded-full ${fgVal>50?'bg-emerald-500/60':fgVal<30?'bg-red-500/60':'bg-amber-500/60'}`} style={{height:`${Math.max(3,fgVal)}%`}}/></div><div className={`text-lg font-bold ${fgVal>50?'text-emerald-400':fgVal<30?'text-red-400':'text-amber-400'}`}>{fgVal||'--'}</div><div className="text-[9px] text-[#ededed]/25">{fgLabel||'...'}</div></div>
            {/* Forex as compact chart */}
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4"><div className="text-[9px] text-sky-400 uppercase tracking-[.1em] font-bold mb-2">Forex (USD)</div><div className="space-y-2">{[{l:'EUR/USD',v:forex?.rates?.EUR?(1/forex.rates.EUR).toFixed(4):'...',c:'text-sky-400'},{l:'USD/JPY',v:forex?.rates?.JPY?forex.rates.JPY.toFixed(2):'...',c:'text-orange-400'},{l:'GBP/USD',v:forex?.rates?.GBP?(1/forex.rates.GBP).toFixed(4):'...',c:'text-cyan-400'},{l:'USD/CHF',v:forex?.rates?.CHF?forex.rates.CHF.toFixed(4):'...',c:'text-emerald-400'},{l:'USD/CNY',v:forex?.rates?.CNY?forex.rates.CNY.toFixed(2):'...',c:'text-rose-400'}].map((p,i)=>(<div key={i} className="flex items-center gap-2 text-[10px]"><span className="w-16 text-[#ededed]/30 truncate">{p.l}</span><div className="flex-1 h-3 rounded-full bg-white/[0.04] overflow-hidden"><div className={`h-full rounded-full ${p.c} opacity-60`} style={{width:`${Math.min(100,Math.abs(Number(p.v)||1)*20)}%`}}/></div><span className={`w-14 text-right font-bold tabular-nums ${p.c}`}>{p.v}</span></div>))}</div></div>
            {/* Market Movers */}
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden"><div className="px-4 py-2.5 border-b border-[#222] bg-[#111]"><span className="text-[10px] text-cyan-400 uppercase tracking-[.15em] font-bold">Market Movers</span></div><div className="divide-y divide-white/[0.02]">{patents?.marketMovers?.length?patents.marketMovers.map((m:any,i:number)=>(<div key={i} className="px-4 py-2 flex justify-between text-[10px]"><span className="text-[#ededed]/50 truncate mr-2">{m.name}</span><span className="flex gap-2 flex-shrink-0"><span className="text-[#ededed]/60 tabular-nums">{m.value}</span><span className={m.dir==='up'?'text-emerald-400':'text-red-400'}>{m.change}</span></span></div>)):<div className="px-4 py-6 text-[10px] text-[#ededed]/15 italic text-center">Loading...</div>}</div></div>
          </div>
          {/* Patent Panel — merged Top Holders + Valuation, no repeating names */}
          {patents&&(<div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden"><div className="px-4 py-2.5 border-b border-[#222] bg-[#111] flex items-center gap-2"><span className="text-[10px] text-pink-400 uppercase tracking-[.15em] font-bold">Patents</span><span className="text-[9px] text-[#ededed]/20">{patents.header.uspto} grants · {patents.header.yoy}</span></div><div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4"><div><div className="text-[9px] text-[#ededed]/15 uppercase tracking-[.1em] mb-1.5">Top Firms</div><div className="space-y-1">{patents.topHolders.map((h:any,i:number)=>(<div key={i} className="flex items-center gap-1 text-[10px]"><span className="text-white/75 w-14 truncate font-medium">{h.name}</span><span className="text-[#ededed]/50 tabular-nums">{h.count}</span><span className="text-[#ededed]/30">·</span><span className="text-[#ededed]/40 tabular-nums">{h.mcap}</span></div>))}</div></div><div><div className="text-[9px] text-[#ededed]/15 uppercase tracking-[.1em] mb-1.5">Tech Areas</div><div className="space-y-1">{patents.techAreas.map((t:any,i:number)=>(<div key={i} className="flex justify-between text-[10px]"><span className="text-white/45 truncate mr-2">{t.name}</span><span className="text-[#ededed]/30">{t.pct}</span></div>))}</div></div><div><div className="text-[9px] text-[#ededed]/15 uppercase tracking-[.1em] mb-1.5">Hot Areas</div><div className="space-y-1">{patents.hotAreas.map((h:any,i:number)=>(<div key={i} className="flex justify-between text-[10px]"><span className="text-[#ededed]/50 truncate mr-2">{h.name}</span><span className={`text-[8px] px-1 rounded ${h.trend==='rapid'?'bg-emerald-500/15 text-emerald-400':h.trend==='growing'?'bg-amber-500/15 text-amber-400':'bg-white/5 text-[#ededed]/30'}`}>{h.trend}</span></div>))}</div></div></div></div>)}
          {/* Key Labs & Institutions — RSS feed of latest posts */}
          {patents&&(()=>{const kw=patents.keyLabs.flatMap((l:any)=>[l.name,...l.name.split(/[\s-]+/).filter((s:string)=>s.length>2)]).map((s:string)=>s.toLowerCase());const labItems=items.filter((it:any)=>{const t=(it.title+' '+it.source).toLowerCase();return kw.some((k:string)=>t.includes(k));}).slice(0,12);return(<div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden"><div className="px-4 py-2.5 border-b border-[#222] bg-[#111] flex items-center justify-between"><span className="text-[10px] text-violet-400 uppercase tracking-[.15em] font-bold">Key Labs & Institutions</span><span className="text-[9px] text-[#ededed]/20">{labItems.length} posts</span></div><div className="divide-y divide-white/[0.02] max-h-[220px] overflow-y-auto scrollbar-hide">{labItems.length===0?<div className="px-4 py-6 text-[10px] text-[#ededed]/15 italic text-center">Awaiting signal matching...</div>:labItems.map((it:any,j:number)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-white/[0.03] group"><div className="text-[11px] font-medium text-[#ededed]/60 group-hover:text-[#ededed]/85 line-clamp-2 leading-snug">{it.title}</div><div className="flex items-center gap-2 mt-1 text-[9px] text-[#ededed]/20"><span className="truncate max-w-[100px]">{it.source}</span><span className="ml-auto tabular-nums">{ago(it.published_at)}</span></div></a>))}</div></div>)})()}
          {/* Category boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{macroCats.map(cat=>(<div key={cat.id} className={`rounded-2xl border border-[#222] ${cat.bg} border-l-2 ${cat.color} overflow-hidden`}><div className="px-4 py-3 border-b border-[#222] bg-[#111] flex items-center justify-between"><span className={`text-[13px] font-semibold ${cat.accent}`}>{cat.label}</span><span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-[#ededed]/30 tabular-nums">{cat.count}</span></div><div className="divide-y divide-white/[0.02] max-h-[260px] overflow-y-auto scrollbar-hide">{cat.items.length===0?<div className="px-4 py-6 text-[11px] text-[#ededed]/10 italic text-center">no signals</div>:cat.items.map((it,j)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-white/[0.03] group"><div className="text-[11px] font-medium text-[#ededed]/60 group-hover:text-[#ededed]/85 line-clamp-1">{it.title}</div><div className="flex items-center gap-2 mt-1 text-[9px] text-[#ededed]/20"><span className="truncate max-w-[80px]">{it.source}</span><span className="ml-auto tabular-nums">{ago(it.published_at)}</span></div></a>))}</div></div>))}</div>
        </div>)}

        {/* ============ INFOSEC TAB ============ */}
        {active==='infosec'&&(<div className="space-y-5">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.03] p-5"><div className="flex items-center gap-2 mb-3"><span className="text-[11px] text-red-400 uppercase tracking-[.15em] font-bold">⚠ Active Threats</span><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">{dd2?.kev?.length>0?<div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-3"><div className="font-semibold text-red-300 mb-1">🔐 {dd2.kev.length} KEV Active</div><div className="text-[#ededed]/50">CISA Known Exploited. Apply patches within due dates.</div></div>:<div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-3"><div className="font-semibold text-red-300 mb-1">🔐 Revoke</div><div className="text-[#ededed]/50">Check wallet approvals. Use revoke.cash</div></div>}{dd2?.cves?.filter((c:any)=>c.severity==='CRITICAL'||c.severity==='HIGH').length>0?<div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-3"><div className="font-semibold text-orange-300 mb-1">📦 {dd2.cves.filter((c:any)=>c.severity==='CRITICAL'||c.severity==='HIGH').length} Critical CVEs</div><div className="text-[#ededed]/50">Update affected systems immediately.</div></div>:<div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-3"><div className="font-semibold text-orange-300 mb-1">📦 Update</div><div className="text-[#ededed]/50">Run audit. Patch compromised packages.</div></div>}{dd2?.breaches?.length>0?<div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] p-3"><div className="font-semibold text-yellow-300 mb-1">🛡️ {dd2.breaches.length} Breaches</div><div className="text-[#ededed]/50">Change passwords. Enable 2FA on exposed accounts.</div></div>:<div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] p-3"><div className="font-semibold text-yellow-300 mb-1">🛡️ Check</div><div className="text-[#ededed]/50">Audit exposed ports. Rotate keys...</div></div>}</div></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TileBox title="CISA Alerts" accent="text-emerald-400" color="border-l-emerald-400" count={items.filter(i=>i.source?.toLowerCase().includes('cisa')).length}>{items.filter(i=>i.source?.toLowerCase().includes('cisa')).slice(0,6).map((it,j)=>(<TileRow key={j} it={it}/>))}</TileBox>
            <TileBox title="CISA KEV" accent="text-red-400" color="border-l-red-400" count={dd2?.kev?.length||0}>{(dd2?.kev||[]).map((v:any,j:number)=>(<div key={j} className="px-4 py-2.5 border-b border-[#222] last:border-0"><div className="text-[12px] font-medium text-[#ededed]/70">{v.cve}</div><div className="text-[10px] text-[#ededed]/30 mt-0.5 line-clamp-2">{v.vendor} — {v.product}: {v.name}</div><div className="text-[9px] text-red-400/60 mt-1">Due: {v.dueDate?.slice(0,10)}</div></div>))}</TileBox>
            <TileBox title="Latest CVEs" accent="text-orange-400" color="border-l-orange-400" count={dd2?.cves?.length||0}>{(dd2?.cves||[]).map((c:any,j:number)=>(<div key={j} className="px-4 py-2.5 border-b border-[#222] last:border-0"><div className="flex items-center gap-2"><span className="text-[12px] font-medium text-[#ededed]/70">{c.id}</span><SeverityBadge sev={c.severity} score={c.score}/></div><div className="text-[10px] text-[#ededed]/30 mt-0.5 line-clamp-2">{c.description}</div></div>))}</TileBox>
            <TileBox title="Recent Breaches" accent="text-pink-400" color="border-l-pink-400" count={dd2?.breaches?.length||0}>{(dd2?.breaches||[]).map((b:any,j:number)=>(<div key={j} className="px-4 py-2.5 border-b border-[#222] last:border-0"><div className="text-[12px] font-medium text-[#ededed]/70">{b.name}</div><div className="text-[10px] text-[#ededed]/30 mt-0.5">{b.domain} · {b.count?.toLocaleString()} accounts · {b.data}</div><div className="text-[9px] text-[#ededed]/15 mt-0.5">{b.date}</div></div>))}</TileBox>
          </div>
          {/* Social Media */}
          <div className="grid grid-cols-1 gap-4">
            <TileBox title="Social Media" accent="text-sky-400" color="border-l-sky-400" count={items.filter(i=>SOCMED_SOURCES.some(s=>i.source?.toLowerCase().includes(s))).length}>{items.filter(i=>SOCMED_SOURCES.some(s=>i.source?.toLowerCase().includes(s))).slice(0,12).map((it,j)=>(<TileRow key={j} it={it}/>))}</TileBox>
          </div>
        </div>)}

        {/* ============ WEB3 TAB ============ */}
        {active==='web3'&&(<div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1 rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden"><div className="px-5 py-3 border-b border-[#222] bg-[#111]"><div className="text-[11px] text-purple-400 uppercase tracking-[.15em] font-bold">TVL by Chain</div></div><div className="grid grid-cols-[28px_1fr_70px] gap-3 px-5 py-2.5 border-b border-white/[0.03] bg-[#111] text-[10px] text-[#ededed]/20 uppercase tracking-wider font-semibold"><div>#</div><div>Chain</div><div className="text-right">TVL</div></div>{(dd?.tvl||[]).slice(0,12).map((c:any,i:number)=>(<div key={i} className={`grid grid-cols-[28px_1fr_70px] gap-3 px-5 py-2.5 border-b border-[#222] last:border-0 hover:bg-[#111] ${i%2===1?'bg-[#0a0a0a]':''}`}><div className="text-[11px] text-[#ededed]/25 tabular-nums">{i+1}</div><div className="text-[12px] font-medium text-white/75 truncate">{c.name}</div><div className="text-[12px] font-semibold text-right tabular-nums text-purple-400/80">{fmt(c.tvl)}</div></div>))||<div className="p-5 text-[#ededed]/15 text-xs italic text-center">Loading...</div>}</div>
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5"><div className="text-[10px] text-cyan-400 uppercase tracking-[.15em] font-bold mb-2">Total Volume</div><div className="text-2xl font-bold tabular-nums text-[#ededed]/80">{fmt(totalVol)}</div><div className="text-[10px] text-[#ededed]/20 mt-1">24h DEX</div><div className="mt-3 space-y-1">{(dd?.volume||[]).slice(0,5).map((v:any,i:number)=>(<div key={i} className="flex justify-between text-[11px]"><span className="text-[#ededed]/30 truncate">{v.name}</span><span className="text-[#ededed]/50 tabular-nums">{fmt(v.volume24h)}</span></div>))}</div></div>
                <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5"><div className="text-[10px] text-emerald-400 uppercase tracking-[.15em] font-bold mb-3">Stablecoins</div><div className="space-y-2">{(dd?.stablecoins||[]).map((s:any,i:number)=>(<div key={i} className="flex justify-between"><span className="text-[12px] text-[#ededed]/50">{s.name}</span><span className="text-[11px] text-[#ededed]/70 tabular-nums">{fmt(s.circulating)}</span></div>))||<div className="text-[#ededed]/15 text-xs italic">Loading...</div>}</div></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5"><div className="text-[10px] text-amber-400 uppercase tracking-[.15em] font-bold mb-3">Fees (24h)</div><div className="space-y-2">{(dd?.fees||[]).slice(0,6).map((f:any,i:number)=>(<div key={i} className="flex justify-between"><span className="text-[12px] text-[#ededed]/50 truncate">{f.name}</span><span className="text-[11px] text-[#ededed]/70 tabular-nums">{fmt(f.fees24h)}</span></div>))||<div className="text-[#ededed]/15 text-xs italic">Loading...</div>}</div></div>
                <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-5 flex flex-col items-center"><div className="text-[10px] text-amber-400 uppercase tracking-[.15em] font-bold mb-3">F&G</div><div className="relative h-32 w-6 bg-white/[0.04] rounded-full overflow-hidden mb-2"><div className={`absolute bottom-0 w-full rounded-full ${fgVal>50?'bg-emerald-500/60':fgVal<30?'bg-red-500/60':'bg-amber-500/60'}`} style={{height:`${Math.max(3,fgVal)}%`}}/></div><div className={`text-xl font-bold mt-2 ${fgVal>50?'text-emerald-400':fgVal<30?'text-red-400':'text-amber-400'}`}>{fgVal||'--'}</div><div className="text-[10px] text-[#ededed]/25 mt-0.5">{fgLabel||'...'}</div></div>
              </div>
              {dd?.polymarket?.length>0&&(<div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden"><div className="px-5 py-3 border-b border-[#222] bg-[#111]"><div className="text-[11px] text-pink-400 uppercase tracking-[.15em] font-bold">Polymarket</div></div><div className="grid grid-cols-[1fr_70px_70px] gap-3 px-5 py-2.5 border-b border-white/[0.03] bg-[#111] text-[10px] text-[#ededed]/20 uppercase tracking-wider font-semibold"><div>Market</div><div className="text-right">Vol</div><div className="text-right">Liq</div></div>{dd.polymarket.slice(0,5).map((m:any,i:number)=>(<a key={i} href={`https://polymarket.com/event/${m.slug}`} target="_blank" rel="noopener noreferrer" className={`grid grid-cols-[1fr_70px_70px] gap-3 px-5 py-2.5 border-b border-[#222] last:border-0 hover:bg-[#111] ${i%2===1?'bg-[#0a0a0a]':''}`}><div className="text-[12px] text-[#ededed]/60 hover:text-[#ededed]/80 truncate">{m.title}</div><div className="text-[11px] text-right text-[#ededed]/30 tabular-nums">{fmtN(m.volume)}</div><div className="text-[11px] text-right text-[#ededed]/20 tabular-nums">{fmtN(m.liquidity)}</div></a>))}</div>)}
            </div>
          </div>
          {/* Category boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{web3Cats.map(cat=>(<div key={cat.id} className={`rounded-2xl border border-[#222] ${cat.bg} border-l-2 ${cat.color} overflow-hidden`}><div className="px-4 py-3 border-b border-[#222] bg-[#111] flex items-center justify-between"><span className={`text-[13px] font-semibold ${cat.accent}`}>{cat.label}</span><span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-[#ededed]/30 tabular-nums">{cat.count}</span></div><div className="divide-y divide-white/[0.02] max-h-[260px] overflow-y-auto scrollbar-hide">{cat.items.length===0?<div className="px-4 py-6 text-[11px] text-[#ededed]/10 italic text-center">no signals</div>:cat.items.map((it,j)=>(<a key={j} href={it.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-white/[0.03] group"><div className="text-[11px] font-medium text-[#ededed]/60 group-hover:text-[#ededed]/85 line-clamp-1">{it.title}</div><div className="flex items-center gap-2 mt-1 text-[9px] text-[#ededed]/20"><span className="truncate max-w-[80px]">{it.source}</span><span className="ml-auto tabular-nums">{ago(it.published_at)}</span></div></a>))}</div></div>))}</div>
        </div>)}
      </div>
    </div>
  );
}
