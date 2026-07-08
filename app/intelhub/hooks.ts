/* ================================================================
   IntelHub — Data fetching hooks (5-min auto-refresh)
   ================================================================ */
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Item, PatentsData, IntelData } from './types';

const BASE = '/website-private';

/* ---- Helpers ---- */
const CATS: { id: string; label: string; color: string; accent: string; bg: string; kw: string[] }[] = [
  { id: 'ai', label: 'AI/ML', color: 'border-l-blue-400', accent: 'text-blue-400', bg: 'bg-blue-500/5', kw: ['gpt', 'llm', 'transformer', 'neural', 'deep learning', 'machine learning', 'hugging face', 'agent', 'inference', 'embedding', 'token', 'prompt', 'fine.tun', 'rag', 'vector database', 'multimodal', 'diffusion', 'gan', 'lora', 'qlora', 'rlhf', 'alignment', 'artificial intelligence', 'openai', 'anthropic', 'claude', 'deepseek', 'mistral', 'gemini', 'cohere', 'copilot', 'chatbot', 'reasoning', 'sora', 'attention mechanism', 'model card', 'frontier model', 'foundation model'] },
  { id: 'crypto', label: 'Crypto', color: 'border-l-yellow-400', accent: 'text-yellow-400', bg: 'bg-yellow-500/5', kw: ['btc', 'eth', 'ethereum', 'bitcoin', 'defi', 'web3', 'blockchain', 'crypto', 'algorithmic', 'l2', 'rollup', 'zk', 'zero.knowledge', 'evm', 'solidity', 'smart contract', 'dapp', 'nft', 'dao', 'dex', 'liquidity', 'staking', 'yield', 'hashrate', 'consensus', 'proof.of', 'self.custody', 'non.custodial', 'polymarket', 'perp', 'orderbook', 'validator', 'solana', 'airdrop', 'lending', 'borrow', 'swap', 'pool', 'farm', 'cex', 'multisig', 'tokenomics', 'tvl', 'mev', 'circulating supply', 'market cap'] },
  { id: 'cybersec', label: 'Cybersec', color: 'border-l-orange-400', accent: 'text-orange-400', bg: 'bg-orange-500/5', kw: ['cve', 'exploit', '0day', 'zero.day', 'patch', 'malware', 'ransomware', 'phishing', 'breach', 'vulnerability', 'opsec', 'privacy', 'encryption', 'backdoor', 'cisa', 'nvd', 'threat intelligence', 'intrusion', 'penetration test', 'red team', 'supply chain attack', 'sandbox', 'hardening', 'firewall', 'infosec', 'hibp', 'pwned', 'soc', 'incident response', 'c2', 'credential stuffing', 'social engineering'] },
  { id: 'macro', label: 'Macro', color: 'border-l-amber-400', accent: 'text-amber-400', bg: 'bg-amber-500/5', kw: ['fomc', 'inflation', 'gdp', 'central bank', 'federal reserve', 'fed', 'monetary policy', 'fiscal policy', 'treasury', 'bond', 'yield curve', 'commodit', 'gold', 'oil', 'forex', 'cpi', 'ppi', 'unemployment', 'econom', 'tariff', 'sanction', 'interest rate', 'recession', 'debt ceiling', 'geopolitic', 'trade war', 'policy', 'regulation', 'sovereign wealth', 'equity', 'stock market', 'dollar', 'yuan', 'euro', 'yen', 'cbdc', 'digital currency', 'war', 'conflict', 'military', 'defense', 'weapon', 'technology war', 'chip war', 'trade dispute', 'supply chain', 'reshoring', 'invention', 'breakthrough', 'discovery', 'innovation', 'r&d', 'patent', 'startup', 'fundraising', 'venture capital', 'ipo', 'merger', 'acquisition', 'big tech', 'apple', 'google', 'microsoft', 'amazon', 'meta', 'nvidia', 'ceo', 'executive', 'leadership', 'board', 'restructuring', 'layoff', 'energy market', 'copper', 'lithium', 'rare earth', 'imf', 'world bank', 'bis', 'ecb', 'pboc', 'bank of japan', 'stimulus', 'quantitative easing', 'balance sheet', 'credit', 'liquidity', 'sovereign debt'] },
  { id: 'hardware', label: 'Hardware', color: 'border-l-green-400', accent: 'text-green-400', bg: 'bg-green-500/5', kw: ['nvidia', 'intel', 'amd', 'tsmc', 'gpu', 'cpu', 'chip', 'semiconductor', 'transistor', 'foundry', 'node', 'nanometer', 'processor', 'fpga', 'asic', 'hpc', 'compute', 'datacenter', 'server', 'storage', 'memory', 'ddr', 'hbm', 'pcie', 'cuda', 'rocm', 'oneapi', 'soc', 'chiplet', 'packaging'] },
  { id: 'science', label: 'Science', color: 'border-l-violet-400', accent: 'text-violet-400', bg: 'bg-violet-500/5', kw: ['arxiv', 'nature', 'science', 'research', 'publication', 'study', 'biotech', 'genomics', 'crispr', 'quantum', 'fusion', 'nuclear', 'battery', 'solar', 'renewable', 'climate', 'protein', 'drug', 'clinical', 'trial', 'vaccine', 'biology', 'chemistry', 'physics', 'material'] },
];

const TC: Record<string, string> = {
  ai: 'bg-blue-500/15 text-blue-400',
  crypto: 'bg-yellow-500/15 text-yellow-400',
  cybersec: 'bg-orange-500/15 text-orange-400',
  macro: 'bg-amber-500/15 text-amber-400',
  hardware: 'bg-green-500/15 text-green-400',
  science: 'bg-violet-500/15 text-violet-400',
};
const BCOL: Record<string, string> = {
  ai: 'border-l-blue-500/40',
  crypto: 'border-l-yellow-500/40',
  cybersec: 'border-l-orange-500/40',
  macro: 'border-l-amber-500/40',
  hardware: 'border-l-green-500/40',
  science: 'border-l-violet-500/40',
};

const SOURCE_HINTS: Record<string, string[]> = {
  cryptoquant: ['crypto'], lookonchain: ['crypto'], glassnode: ['crypto'], l2beat: ['crypto'],
  defi: ['crypto'], polymarket: ['crypto'], coindesk: ['crypto'], cointelegraph: ['crypto'], theblock: ['crypto'],
  'y combinator': ['science', 'ai'], 'hacker news': ['science', 'ai'], arxiv: ['science', 'ai'],
  nature: ['science'], sciencedaily: ['science'],
  nist: ['cybersec'], cisa: ['cybersec'], haveibeenpwned: ['cybersec'], bleepingcomputer: ['cybersec'],
  krebs: ['cybersec'], threatpost: ['cybersec'],
  'federal reserve': ['macro'], treasury: ['macro'], imf: ['macro'], 'world bank': ['macro'], bis: ['macro'],
  bloomberg: ['macro'], reuters: ['macro'],
  nvidia: ['hardware'], intel: ['hardware'], amd: ['hardware'], tsmc: ['hardware'], semiconductor: ['hardware'],
  'hugging face': ['hardware'],
  anthropic: ['ai'], openai: ['ai'], deepmind: ['ai'], moonshot: ['ai'], baichuan: ['ai'], teknium: ['ai'], stepfun: ['ai'],
};

function cleanTitle(t: string) {
  return t.replace(/^RT\s+by\s+@\S+?:\s*/i, '').replace(/^RT\s+@\S+?:\s*/i, '');
}

function getTag(title: string, summary?: string, source?: string): string {
  const txt = (title + ' ' + (summary || '')).toLowerCase();
  const titleLow = title.toLowerCase();
  const scores: Record<string, number> = {};
  for (const c of CATS) {
    let score = 0;
    for (const kw of c.kw) {
      const kwl = kw.toLowerCase().replace(/\./g, '');
      const rx = new RegExp('\\b' + kwl.replace(/\*/g, '\\w*') + '\\b', 'i');
      const matches = txt.match(rx);
      if (matches) {
        score += titleLow.includes(kwl) ? 2 : 1;
      }
    }
    if (score > 0) scores[c.id] = score;
  }
  if (source) {
    const srcLow = source.toLowerCase();
    for (const [hint, cats] of Object.entries(SOURCE_HINTS)) {
      if (srcLow.includes(hint)) {
        for (const cid of cats) {
          scores[cid] = (scores[cid] || 0) + 2;
        }
      }
    }
  }
  const noiseRX = /\b(nba|nfl|mlb|ufc|soccer|football|basketball|grammy|oscar|celebrity|kardashian|rihanna|tiktok|super bowl|olympics)\b/i;
  const noiseMatch = txt.match(noiseRX);
  const penalty = noiseMatch ? -5 : 0;
  let best = '';
  let bestScore = 2;
  for (const [cid, score] of Object.entries(scores)) {
    const adjusted = score + penalty;
    if (adjusted >= bestScore && adjusted >= 2) {
      if (adjusted > bestScore || (adjusted === bestScore && ['macro', 'crypto', 'cybersec', 'ai'].indexOf(cid) < ['macro', 'crypto', 'cybersec', 'ai'].indexOf(best))) {
        best = cid; bestScore = adjusted;
      }
    }
  }
  return best;
}

const PJ = ['nba', 'nfl', 'mlb', 'ufc', 'soccer', 'formula', 'grammy', 'oscar', 'celebrity', 'kardashian', 'super bowl', 'olympics', 'tiktok'];
const JHN = [/^Ask HN:/i, /^Tell HN:/i, /^Show HN:/i, /Who is hiring/i];
const XSOURCES = ['x:', 'nitter', 'twitter'];
function rel(it: { title: string; source: string }) {
  if (it.source?.toLowerCase().includes('polymarket')) {
    const t = it.title.toLowerCase();
    if (PJ.some(k => t.includes(k))) return false;
    return true;
  }
  if (it.source?.toLowerCase().includes('hacker') || it.source?.toLowerCase().includes('y combinator'))
    return !JHN.some(p => p.test(it.title));
  return true;
}
function notTweet(it: { source: string }) { return !XSOURCES.some(s => it.source?.toLowerCase().includes(s)); }

const proxy = (url: string) => `https://proxy.hub.deltav.cc/?url=${encodeURIComponent(url)}`;

export function useIntelData() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [picks, setPicks] = useState<any>(null);
  const [patents, setPatents] = useState<PatentsData | null>(null);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [dd, setDd] = useState<any>({});
  const [dd2, setDd2] = useState<any>(null);
  const [forex, setForex] = useState<any>(null);

  const loadAll = useCallback(async () => {
    try {
      const rawRes = await fetch(`${BASE}/data/raw-items.json`);
      if (rawRes.ok) {
        const d = await rawRes.json();
        if (Array.isArray(d))
          setItems(d.map((x: any) => ({ ...x, title: cleanTitle(x.title || ''), tag: getTag(x.title || '', x.summary || '', x.source || '') })).filter(rel));
      }
      const picksRes = await fetch(`${BASE}/data/picks.json`);
      if (picksRes.ok) setPicks(await picksRes.json());
      const wlRes = await fetch(`${BASE}/data/cybersec-watchlist.json`);
      if (wlRes.ok) {
        const wl = await wlRes.json();
        const now = Date.now();
        setWatchlist(wl.filter((x: any) => new Date(x.expires).getTime() > now));
      }
      const patRes = await fetch(`${BASE}/data/patents.json`);
      if (patRes.ok) setPatents(await patRes.json());
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  const loadLive = useCallback(async () => {
    try {
      const result: any = {};
      try {
        const r = await fetch('https://api.alternative.me/fng/?limit=7');
        if (r.ok) result.fearGreed = await r.json();
      } catch { /* */ }
      try {
        const r = await fetch('https://api.llama.fi/v2/chains');
        if (r.ok) {
          const chains = await r.json();
          const sorted = chains.filter((c: any) => c.tvl > 0).sort((a: any, b: any) => b.tvl - a.tvl);
          result.tvl = sorted.slice(0, 12);
          const total = sorted.reduce((s: number, c: any) => s + c.tvl, 0) || 1;
          result.dominance = sorted.slice(0, 5).map((c: any) => ({ name: c.name, pct: ((c.tvl / total) * 100).toFixed(1) + '%' }));
        }
      } catch { /* */ }
      try {
        const r = await fetch('https://api.llama.fi/overview/dexs?dataType=dailyVolume');
        if (r.ok) {
          const d = await r.json();
          result.volume = (d.allChains || []).slice(0, 10).map((n: string) => ({
            name: n, volume24h: d.breakdown24h?.[n] || d.total24hBreakdown?.[n] || 0,
          })).filter((x: any) => x.volume24h > 0).sort((a: any, b: any) => b.volume24h - a.volume24h);
          result.totalVolume24h = d.total24h || 0;
        }
      } catch { /* */ }
      try {
        const r = await fetch('https://api.llama.fi/overview/fees?dataType=dailyFees');
        if (r.ok) {
          const d = await r.json();
          result.fees = (d.allChains || []).slice(0, 10).map((n: string) => ({
            name: n, fees24h: d.breakdown24h?.[n] || d.total24hBreakdown?.[n] || 0,
          })).filter((x: any) => x.fees24h > 0).sort((a: any, b: any) => b.fees24h - a.fees24h);
        }
      } catch { /* */ }
      try {
        const r = await fetch('https://stablecoins.llama.fi/stablecoins?includePrices=false');
        if (r.ok) {
          const d = await r.json();
          result.stablecoins = (d.peggedAssets || []).map((s: any) => ({
            name: s.name || s.symbol, circulating: s.circulating?.peggedUSD || 0,
          })).filter((s: any) => s.circulating > 0).sort((a: any, b: any) => b.circulating - a.circulating).slice(0, 6);
        }
      } catch { /* */ }
      try {
        const r = await fetch('https://gamma-api.polymarket.com/events?limit=50&active=true&closed=false');
        if (r.ok) {
          const events = await r.json();
          const keep = ['crypto', 'bitcoin', 'ethereum', 'solana', 'defi', 'macro', 'fed', 'inflation', 'rate', 'gdp', 'tariff', 'sec', 'regulation', 'treasury', 'election', 'war', 'oil', 'energy', 'ai'];
          const junk = ['nba', 'nfl', 'mlb', 'ufc', 'soccer', 'formula', 'grammy', 'oscar', 'celebrity', 'rihanna'];
          result.polymarket = events.filter((e: any) => {
            const t = (e.title || '').toLowerCase();
            return !junk.some(k => t.includes(k)) && keep.some(k => t.includes(k));
          }).slice(0, 8);
        }
      } catch { /* */ }
      // Load indices + forex from pre-fetched static JSON (no CORS)
      try {
        const idxRes = await fetch(`${BASE}/data/indices.json`);
        if (idxRes.ok) {
          const idx = await idxRes.json();
          if (idx.spx || idx.csi) result.indices = idx;
        }
      } catch { /* */ }
      // Load pre-fetched forex data
      try {
        const fxRes = await fetch(`${BASE}/data/forex.json`);
        if (fxRes.ok) setForex(await fxRes.json());
      } catch { /* */ }
      // Load HF from static JSON (no CORS)
      try {
        const hfRes = await fetch(`${BASE}/data/hf.json`);
        if (hfRes.ok) {
          const hf = await hfRes.json();
          if (hf.models) result.hfModels = hf.models;
          if (hf.spaces) result.hfSpaces = hf.spaces;
        }
      } catch { /* */ }
      // Load crypto market cap from static JSON
      try {
        const cRes = await fetch(`${BASE}/data/crypto.json`);
        if (cRes.ok) result.crypto = await cRes.json();
      } catch { /* */ }
      // Load BTC trend (sparkline)
      try {
        const btcRes = await fetch(`${BASE}/data/btc-trend.json`);
        if (btcRes.ok) result.btcTrend = await btcRes.json();
      } catch { /* */ }
      // Load exchange volume ranking
      try {
        const exRes = await fetch(`${BASE}/data/exchange-vol.json`);
        if (exRes.ok) result.exchangeVol = await exRes.json();
      } catch { /* */ }
      setDd(result);
    } catch { /* */ }
  }, []);

  const loadInfosec = useCallback(async () => {
    try {
      let result: any = { kev: [], cves: [], breaches: [] };
      try {
        const r = await fetch(proxy('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'));
        if (r.ok) {
          const d = await r.json();
          result.kev = (d.vulnerabilities || []).slice(0, 6).map((v: any) => ({
            cve: v.cveID, product: v.product, vendor: v.vendorProject, name: v.vulnerabilityName, dateAdded: v.dateAdded, dueDate: v.dueDate,
          }));
        }
      } catch { /* */ }
      try {
        const r = await fetch(proxy('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=6'));
        if (r.ok) {
          const d = await r.json();
          result.cves = (d.vulnerabilities || []).map((v: any) => {
            const cve = v.cve || {};
            const m = cve.metrics?.cvssMetricV31?.[0]?.cvssData || cve.metrics?.cvssMetricV30?.[0]?.cvssData || {};
            const desc = (cve.descriptions || []).find((x: any) => x.lang === 'en');
            return { id: cve.id, severity: m.baseSeverity || 'N/A', score: m.baseScore || 0, description: (desc?.value || '').slice(0, 140), published: cve.published };
          });
        }
      } catch { /* */ }
      try {
        const r = await fetch(proxy('https://haveibeenpwned.com/api/v3/breaches'));
        if (r.ok) {
          const d = await r.json();
          result.breaches = (Array.isArray(d) ? d : []).slice(0, 8).map((b: any) => ({
            name: b.Name || b.Title, domain: b.Domain, date: b.BreachDate, count: b.PwnCount, data: (b.DataClasses || []).slice(0, 5).join(', '),
          }));
        }
      } catch { /* */ }
      if (!result.kev.length || !result.cves.length || !result.breaches.length) {
        try {
          const r = await fetch(`${BASE}/data/infosec.json`);
          if (r.ok) {
            const c = await r.json();
            if (!result.kev.length) result.kev = c.kev || [];
            if (!result.cves.length) result.cves = c.cves || [];
            if (!result.breaches.length) result.breaches = c.breaches || [];
          }
        } catch { /* */ }
      }
      setDd2(result);
    } catch { /* */ }
  }, []);

  const loadForex = useCallback(async () => {
    const pairs = [
      { symbol: 'EURUSD=X', label: 'EUR', usdLeft: true },
      { symbol: 'USDJPY=X', label: 'JPY' },
      { symbol: 'GBPUSD=X', label: 'GBP', usdLeft: true },
      { symbol: 'USDCHF=X', label: 'CHF' },
      { symbol: 'USDCNY=X', label: 'CNY' },
    ];
    try {
      const results: any = {};
      for (const p of pairs) {
        try {
          const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${p.symbol}?interval=1d&range=10y`);
          if (r.ok) {
            const d = await r.json();
            const meta = d?.chart?.result?.[0]?.meta;
            const quotes = d?.chart?.result?.[0]?.indicators?.quote?.[0];
            const timestamps = d?.chart?.result?.[0]?.timestamp;
            if (meta && quotes && timestamps) {
              const now = meta.regularMarketPrice;
              const closes = quotes.close.filter((c: any) => c !== null);
              const ts = timestamps.filter((_: any, i: number) => quotes.close[i] !== null);
              const findClose = (daysBack: number) => {
                const cutoff = (Date.now() / 1000) - (daysBack * 86400);
                for (let i = ts.length - 1; i >= 0; i--) {
                  if (ts[i] <= cutoff) return closes[i];
                }
                return closes[0];
              };
              const m1 = findClose(22);
              const y1 = findClose(252);
              const y10 = closes[0];
              const pct = (prev: number) => prev ? ((now - prev) / prev * 100) : null;
              results[p.label] = {
                rate: p.usdLeft ? (1 / now) : now,
                rateStr: p.usdLeft ? (1 / now).toFixed(4) : now.toFixed(2),
                chg: meta.regularMarketPrice - meta.previousClose,
                chgPct: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100).toFixed(2) + '%',
                p1M: pct(m1), p1Y: pct(y1), p10Y: pct(y10),
              };
            }
          }
        } catch { /* */ }
      }
      if (Object.keys(results).length > 0) setForex(results);
    } catch { /* */ }
  }, []);

  useEffect(() => {
    loadAll(); loadLive(); loadInfosec(); loadForex();
    const i = setInterval(() => { loadAll(); loadLive(); loadInfosec(); loadForex(); }, 5 * 60_000);
    return () => clearInterval(i);
  }, [loadAll, loadLive, loadInfosec, loadForex]);

  /* ---- Derived ---- */
  // Category → tags that don't belong (e.g. macro box shouldn't show crypto-tagged items)
  const CAT_TAG_BLOCK: Record<string, string[]> = {
    macro: ['crypto', 'cybersec'],
    science: ['crypto', 'cybersec'],
    ai: ['crypto', 'cybersec'],
    hardware: ['crypto', 'cybersec'],
    crypto: ['cybersec', 'science'],
    cybersec: ['crypto', 'macro', 'science', 'hardware'],
  };
  const catBoxes = CATS.map(cat => ({
    ...cat,
    items: items.filter(i => {
      const blockTags = CAT_TAG_BLOCK[cat.id] || [];
      if (i.tag && blockTags.includes(i.tag)) return false;
      return cat.kw.some(k => (i.title + ' ' + i.summary).toLowerCase().includes(k));
    }).slice(0, 15),
    count: 0,
  }));
  catBoxes.forEach(c => { c.count = c.items.length; });

  const top3 = [...items].sort((a: any, b: any) => {
    const da = new Date(a.pubDate || a.date || 0).getTime();
    const db = new Date(b.pubDate || b.date || 0).getTime();
    return db - da;
  }).slice(0, 3).map((it: any) => ({
    ...it,
    title: (it.title || '').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim(),
  }));
  const fgVal = dd?.fearGreed?.data?.[0] ? Number(dd.fearGreed.data[0].value) || 0 : 0;
  const fgLabel = dd?.fearGreed?.data?.[0]?.value_classification || '';
  const totalVol = dd?.totalVolume24h || 0;

  const macroCats = catBoxes.filter(c => ['macro', 'science'].includes(c.id));
  const infosecCats = catBoxes.filter(c => ['cybersec'].includes(c.id));
  const web3Cats = catBoxes.filter(c => ['crypto'].includes(c.id));
  const aiCats = catBoxes.filter(c => ['ai', 'hardware'].includes(c.id));

  const tabLabel = (t: string) => t === 'macro' ? 'Macro' : t === 'infosec' ? 'Infosec' : t === 'web3' ? 'Web3' : 'AI';
  const tabAccent = (t: string) => t === 'macro' ? 'text-amber-400' : t === 'infosec' ? 'text-orange-400' : t === 'web3' ? 'text-purple-400' : 'text-blue-400';
  const SOCMED_SOURCES = ['x: @dinosn', 'x: @pcaversaccio', 'x: @hypernativelabs'];

  const ts = (iso: string) => {
    try { return new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return ''; }
  };
  const ago = (iso: string) => {
    try {
      const m = (Date.now() - new Date(iso).getTime()) / 60000;
      return m < 1 ? 'now' : m < 60 ? `${Math.round(m)}m` : m < 1440 ? `${Math.round(m / 60)}h` : `${Math.round(m / 1440)}d`;
    } catch { return ''; }
  };
  const isNew = (iso: string) => {
    try { return Date.now() - new Date(iso).getTime() < 3_600_000; } catch { return false; }
  };
  const fmt = (n: number) => {
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
    return `$${n.toFixed(2)}`;
  };
  const fmtN = (n: number) => {
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    return `${n}`;
  };

  return {
    items, loading, picks, patents, dd, dd2, forex, watchlist,
    catBoxes, macroCats, infosecCats, web3Cats, aiCats, top3, fgVal, fgLabel, totalVol,
    tabAccent, tabLabel, ts, ago, isNew, fmt, fmtN, TC, BCOL, SOCMED_SOURCES,
  };
}

export { CATS, TC, BCOL };
