/* ================================================================
   IntelHub — Data fetching hooks (5-min auto-refresh)
   ================================================================ */
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SITE_URL } from '@/lib/site';
import { Item, PatentsData, IntelData } from './types';

// Canonical public origin (includes basePath). See site.config.json.
const BASE = SITE_URL;

/* ---- Helpers ---- */
const CATS: { id: string; label: string; color: string; accent: string; bg: string; kw: string[] }[] = [
  { id: 'ai', label: 'AI/ML', color: 'border-l-blue-400', accent: 'text-blue-400', bg: 'bg-blue-500/5', kw: ['gpt', 'llm', 'transformer', 'neural', 'deep learning', 'machine learning', 'hugging face', 'agent', 'inference', 'embedding', 'prompt engineering', 'fine.tun', 'rag', 'vector database', 'multimodal', 'diffusion model', 'gan', 'lora', 'qlora', 'rlhf', 'ai alignment', 'artificial intelligence', 'openai', 'anthropic', 'claude', 'deepseek', 'mistral', 'gemini', 'cohere', 'copilot', 'chatbot', 'reasoning model', 'sora', 'attention mechanism', 'model card', 'frontier model', 'foundation model', 'large language model', 'mixture of experts', 'moe', 'text-to-image', 'text-to-video', 'image generation', 'speech recognition', 'whisper', 'wav2vec', 'tokenizer', 'quantization', 'gguf', 'onnx', 'safetensors', 'modeltraining', 'neurips', 'icml', 'iclr', 'cvpr'] },
  { id: 'crypto', label: 'Crypto', color: 'border-l-yellow-400', accent: 'text-yellow-400', bg: 'bg-yellow-500/5', kw: ['btc', 'eth', 'ethereum', 'bitcoin', 'defi', 'web3', 'blockchain', 'crypto', 'algorithmic', 'l2', 'rollup', 'zk', 'zero.knowledge', 'evm', 'solidity', 'smart contract', 'dapp', 'nft', 'dao', 'dex', 'liquidity', 'staking', 'yield', 'hashrate', 'consensus', 'proof.of', 'self.custody', 'non.custodial', 'perp', 'orderbook', 'validator', 'solana', 'airdrop', 'lending', 'borrow', 'swap', 'pool', 'farm', 'cex', 'multisig', 'tokenomics', 'tvl', 'mev', 'circulating supply', 'market cap'] },
  { id: 'cybersec', label: 'Cybersec', color: 'border-l-orange-400', accent: 'text-orange-400', bg: 'bg-orange-500/5', kw: ['cve', 'exploit', '0day', 'zero.day', 'patch', 'malware', 'ransomware', 'phishing', 'breach', 'vulnerability', 'opsec', 'privacy', 'encryption', 'backdoor', 'cisa', 'nvd', 'threat intelligence', 'intrusion', 'penetration test', 'red team', 'supply chain attack', 'sandbox', 'hardening', 'firewall', 'infosec', 'hibp', 'pwned', 'soc', 'incident response', 'c2', 'credential stuffing', 'social engineering'] },
  { id: 'macro', label: 'Macro', color: 'border-l-amber-400', accent: 'text-amber-400', bg: 'bg-amber-500/5', kw: ['fomc', 'inflation', 'gdp', 'central bank', 'federal reserve', 'fed', 'monetary policy', 'fiscal policy', 'treasury', 'bond', 'yield curve', 'commodit', 'gold', 'oil', 'forex', 'cpi', 'ppi', 'unemployment', 'econom', 'tariff', 'sanction', 'interest rate', 'recession', 'debt ceiling', 'geopolitic', 'trade war', 'policy', 'regulation', 'sovereign wealth', 'equity', 'stock market', 'dollar', 'yuan', 'euro', 'yen', 'cbdc', 'digital currency', 'war', 'conflict', 'military', 'defense', 'weapon', 'technology war', 'chip war', 'trade dispute', 'supply chain', 'reshoring', 'invention', 'breakthrough', 'discovery', 'innovation', 'r&d', 'patent', 'startup', 'fundraising', 'venture capital', 'ipo', 'merger', 'acquisition', 'big tech', 'apple', 'google', 'microsoft', 'amazon', 'meta', 'nvidia', 'ceo', 'executive', 'leadership', 'board', 'restructuring', 'layoff', 'energy market', 'copper', 'lithium', 'rare earth', 'imf', 'world bank', 'bis', 'ecb', 'pboc', 'bank of japan', 'stimulus', 'quantitative easing', 'balance sheet', 'credit', 'liquidity', 'sovereign debt'] },
  { id: 'hardware', label: 'Hardware', color: 'border-l-green-400', accent: 'text-green-400', bg: 'bg-green-500/5', kw: ['nvidia', 'intel', 'amd', 'tsmc', 'samsung foundry', 'micron', 'asml', 'qualcomm', 'broadcom', 'arm chip', 'gpu', 'cpu', 'npu', 'tpu', 'fpga', 'asic', 'soc', 'h100', 'a100', 'b200', 'gh200', 'mi300', 'semiconductor', 'transistor', 'foundry', 'lithography', 'fabrication', 'wafer', 'finfet', 'gaa', 'nanometer', 'chiplet', 'packaging', 'interposer', 'hbm', 'ddr5', 'pcie gen', 'cxl', 'hpc', 'datacenter', 'supercomputer', 'server farm', 'processor architecture', 'chip design', 'next-gen chip', 'tape-out', 'silicon photonics', 'quantum computing', 'quantum processor', 'qubit', 'photonic chip', 'spintronic', 'neuromorphic', 'computing cluster'] },
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
  // ── Crypto / Web3 ──
  cryptoquant: ['crypto'], lookonchain: ['crypto'], glassnode: ['crypto'], l2beat: ['crypto'],
  defi: ['crypto'], coindesk: ['crypto'], cointelegraph: ['crypto'], theblock: ['crypto'],
  defillama: ['crypto'], santimentdata: ['crypto'], polymutex: ['crypto'],
  ki_young_ju: ['crypto'], nero_eth: ['crypto'], backthebunny: ['crypto'],
  zachxbt: ['crypto'], wublockchain: ['crypto'], messaricrypto: ['crypto'], spencernoon: ['crypto'],
  // ── Science / Research ──
  'y combinator': ['science', 'ai'], 'hacker news': ['science', 'ai'], arxiv: ['ai'],
  nature: ['science'], sciencedaily: ['science'],
  // ── Cybersec ──
  nist: ['cybersec'], cisa: ['cybersec'], haveibeenpwned: ['cybersec'], bleepingcomputer: ['cybersec'],
  krebs: ['cybersec'], threatpost: ['cybersec'],
  dinosn: ['cybersec'], pcaversaccio: ['cybersec'],
  // ── Macro ──
  'federal reserve': ['macro'], treasury: ['macro'], imf: ['macro'], 'world bank': ['macro'], bis: ['macro'],
  bloomberg: ['macro'], reuters: ['macro'],
  michaeljburry: ['macro'], delphi_digital: ['crypto', 'macro'],
  marketnews_feed: ['macro'],
  // ── Hardware / Chips / Physics ──
  nvidia: ['hardware'], intel: ['hardware'], amd: ['hardware'], tsmc: ['hardware'],
  samsung: ['hardware'], micron: ['hardware'], asml: ['hardware'], qualcomm: ['hardware'],
  broadcom: ['hardware'], 'arm holdings': ['hardware'], semiconductor: ['hardware'],
  // ── AI / ML ──
  'hugging face': ['ai'],
  anthropic: ['ai'], openai: ['ai'], deepmind: ['ai'], moonshot: ['ai'], baichuan: ['ai'], teknium: ['ai'], stepfun: ['ai'],
  'google research': ['ai'], 'meta ai': ['ai'], 'stanford hai': ['ai'], 'alignment forum': ['ai'],
  'gwern': ['ai'], 'the batch': ['ai'],
  // X/Twitter — AI leaders & labs
  sama: ['ai'], darioamodei: ['ai'], demishassabis: ['ai'],
  ylecun: ['ai'], karpathy: ['ai'], clementdelangue: ['ai'],
  arthurmensch: ['ai'], aidangomez: ['ai'], emostaque: ['ai'],
  drjimfan: ['ai'], elder_plinius: ['ai'], teknium1: ['ai'],
  xai: ['ai'], metaai: ['ai'], mistralai: ['ai'],
  lerobothf: ['ai'], alibaba_qwen: ['ai'], '01ai_yi': ['ai'],
};

// Hardware exclusion — items matching these patterns should never appear in Hardware box
const HW_EXCLUDE = ['anti-fraud', 'fraud detection', 'biology', 'biotech', 'dna sequenc', 'genome',
  'protein fold', 'cell therapy', 'gene therapy', 'neuron', 'brain scan', 'medical device',
  'drug discover', 'clinical trial', 'social media', 'font render', 'text-to-speech', 'tts',
  'language model', 'takeoff', 'deny ai', 'capital spent', 'overlooked corner of ai'];

function cleanTitle(t: string) {
  let cleaned = t.replace(/^RT\s+by\s+@\S+?:\s*/i, '').replace(/^RT\s+@\S+?:\s*/i, '');
  // Aggressively strip HTML tags, entities, and encoded content that leaks from RSS feeds
  cleaned = cleaned
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&[a-z]{2,6};/g, '')
    .replace(/&#?[a-z0-9]+;/gi, '');
  // MarketNews_Feed: strip $MACRO / $CRYPTO ticker hashtags from display
  cleaned = cleaned.replace(/\$[A-Z]{2,}/g, '').replace(/\s{2,}/g, ' ').trim();
  // Fix truncated <p> prefix from RSS feed stripping (e.g. "pPAYPAL:" → "PAYPAL:")
  cleaned = cleaned.replace(/^p([A-Z])/, '$1');
  return cleaned;
}

function cleanSummary(s: string) {
  if (!s) return s;
  // Aggressively strip all HTML/XML tags, entities, and encoded content
  return s
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&[a-z]{2,6};/g, '')
    .replace(/&#?[a-z0-9]+;/gi, '')
    // Fix common RSS truncation artifacts
    .replace(/^p([A-Z])/, '$1')
    .replace(/\s+/g, ' ')
    .trim();
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
  let bestScore = 1;  // lowered from 2 so SOURCE_HINTS-only items (score=2) get tagged
  for (const [cid, score] of Object.entries(scores)) {
    const adjusted = score + penalty;
    if (adjusted >= bestScore && adjusted >= 2) {
      if (best === '' || adjusted > bestScore || (adjusted === bestScore && ['macro', 'crypto', 'cybersec', 'ai'].indexOf(cid) < ['macro', 'crypto', 'cybersec', 'ai'].indexOf(best))) {
        best = cid; bestScore = adjusted;
      }
    }
  }
  return best;
}

const JHN = [/^Ask HN:/i, /^Tell HN:/i, /^Show HN:/i, /Who is hiring/i];
const XSOURCES = ['x:', 'nitter', 'twitter'];
function rel(it: { title: string; source: string }) {
  // Prediction markets deliberately excluded from IntelHub surfaces for now
  const src = (it.source || '').toLowerCase();
  if (src.includes('polymarket') || src.includes('kalshi') || src.includes('predictit')) return false;
  if (src.includes('hacker') || src.includes('y combinator'))
    return !JHN.some(p => p.test(it.title));
  return true;
}
function notTweet(it: { source: string }) { return !XSOURCES.some(s => it.source?.toLowerCase().includes(s)); }

const proxy = (url: string) => `https://proxy.hub.deltav.cc/?url=${encodeURIComponent(url)}`;

// Fetch JSON with a hard timeout so a hanging host can never stall the dashboard.
// Returns null on any failure (timeout, network, non-2xx, bad JSON).
const fetchJson = async (url: string, ms = 8000): Promise<any | null> => {
  try {
    // Cache bust: GitHub Pages CDN caches aggressively (max-age=600).
    // Append ?_t=<5-min bucket> so data refreshes within 5 min of push.
    const sep = url.includes('?') ? '&' : '?';
    const bucket = Math.floor(Date.now() / 300000); // 5-min cache-window
    const r = await fetch(`${url}${sep}_t=${bucket}`, { signal: AbortSignal.timeout(ms) });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
};

export function useIntelData(activeTab: string = 'macro') {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [patents, setPatents] = useState<PatentsData | null>(null);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [dd, setDd] = useState<any>({});
  const [dd2, setDd2] = useState<any>(null);
  const [forex, setForex] = useState<any>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [infosecMeta, setInfosecMeta] = useState<{ source: 'live' | 'snapshot' | 'mixed' | 'empty'; updatedAt: string | null }>({
    source: 'empty',
    updatedAt: null,
  });
  const infosecLiveOnce = useRef(false);
  const web3LiveOnce = useRef(false);

  const loadAll = useCallback(async () => {
    try {
      await Promise.allSettled([
        fetchJson(`${BASE}/data/raw-items.json`).then((d) => {
          if (Array.isArray(d)) {
            const tagged = d.map((x: any) => ({ ...x, title: cleanTitle(x.title || ''), summary: cleanSummary(x.summary || ''), tag: getTag(x.title || '', x.summary || '', x.source || '') })).filter(rel);
            // Deduplicate: same source + similar normalized title → keep first
            const seen = new Set<string>();
            const deduped = tagged.filter((it: any) => {
              const norm = (it.title || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
              const key = `${(it.source || '').toLowerCase()}|${norm}`;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
            setItems(deduped);
            setLastFetch(new Date());
          }
        }),
        fetchJson(`${BASE}/data/cybersec-watchlist.json`).then((wl) => {
          if (Array.isArray(wl)) {
            // Prefer non-expired; if all expired, still surface items so the panel is useful
            const now = Date.now();
            const active = wl.filter((x: any) => !x.expires || new Date(x.expires).getTime() > now);
            setWatchlist(active.length ? active : wl.slice(0, 8));
          }
        }),
        fetchJson(`${BASE}/data/patents.json`).then((d) => { if (d) setPatents(d); }),
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadLive = useCallback(async () => {
    // Each task fetches, transforms, and merges its own patch into `dd` the moment
    // it lands. Everything runs in parallel with per-fetch timeouts, so one slow or
    // hanging host can never keep the rest of the dashboard in a skeleton state.
    const merge = (patch: any) => {
      if (patch && Object.keys(patch).length > 0) setDd((prev: any) => ({ ...prev, ...patch }));
    };

    // ── Static JSON (same-origin mirror, reliable — BTC/ETH, gold, indices…) ──
    const staticTasks: Array<Promise<void>> = [
      fetchJson(`${BASE}/data/crypto.json`).then((d) => { if (d) merge({ crypto: d }); }),
      fetchJson(`${BASE}/data/gold.json`).then((d) => { if (d) merge({ gold: d }); }),
      fetchJson(`${BASE}/data/oil.json`).then((d) => { if (d) merge({ oil: d }); }),
      fetchJson(`${BASE}/data/us10y.json`).then((d) => { if (d) merge({ us10y: d }); }),
      fetchJson(`${BASE}/data/indices.json`).then((d) => { if (d && (d.spx || d.csi)) merge({ indices: d }); }),
      fetchJson(`${BASE}/data/hf.json`).then((d) => {
        if (d) {
          merge({
            ...(d.models ? { hfModels: d.models } : {}),
            ...(d.spaces ? { hfSpaces: d.spaces } : {}),
            hfUpdated: d.updated || null,
          });
        }
      }),
      fetchJson(`${BASE}/data/net-flows.json`).then((d) => {
        if (d) merge({ netFlows: d });
      }),
      fetchJson(`${BASE}/data/bold-yields.json`).then((d) => {
        if (d) merge({ boldYields: d });
      }),
      fetchJson(`${BASE}/data/arena-leaderboard.json`).then((d) => {
        if (!d) return;
        // Normalize { models, updated } or raw array for ArenaLeaderboard
        const models = Array.isArray(d) ? d : (Array.isArray(d.models) ? d.models : []);
        merge({ arenaLB: models, arenaUpdated: d.updated || null });
      }),
      fetchJson(`${BASE}/data/btc-trend.json`).then((d) => { if (d) merge({ btcTrend: d }); }),
      fetchJson(`${BASE}/data/exchange-vol.json`).then((d) => { if (d) merge({ exchangeVol: d }); }),
      fetchJson(`${BASE}/data/artemis-newsletter.json`).then((d) => { if (d) merge({ artemisNewsletter: d }); }),
      fetchJson(`${BASE}/data/dex-matrix.json`).then((d) => { if (d) merge({ dexMatrix: d }); }),
      fetchJson(`${BASE}/data/dex-metrics.json`).then((d) => { if (d) merge({ dexMetrics: d }); }),
      fetchJson(`${BASE}/data/etf-flows.json`).then((d) => { if (d) merge({ etfFlows: d }); }),
      fetchJson(`${BASE}/data/chain-movers.json`).then((d) => { if (d) merge({ chainMovers: d }); }),
      // Pre-fetched forex baseline (loadForex may override with live Yahoo data)
      fetchJson(`${BASE}/data/forex.json`).then((d) => { if (d) setForex((prev: any) => prev || d); }),
      // Infosec snapshot for fast first paint (live refresh on Infosec tab)
      fetchJson(`${BASE}/data/infosec.json`).then((d) => {
        if (!d) return;
        setDd2((prev: any) => {
          if (prev && (prev.kev?.length || prev.cves?.length || prev.breaches?.length)) return prev;
          return { kev: d.kev || [], cves: d.cves || [], breaches: d.breaches || [] };
        });
        setInfosecMeta((m) => m.source === 'live' || m.source === 'mixed' ? m : { source: 'snapshot', updatedAt: d.updatedAt || null });
      }),
    ];

    // ── Core live APIs useful across Macro / AI / Web3 banners ──
    const coreLive: Array<Promise<void>> = [
      fetchJson('https://feargreedchart.com/api/?action=history').then((history) => {
        if (Array.isArray(history) && history.length > 0) {
          const latest = history[history.length - 1];
          const score = latest.score || 0;
          const rating = score <= 20 ? 'Extreme Fear' : score <= 40 ? 'Fear' : score <= 60 ? 'Neutral' : score <= 80 ? 'Greed' : 'Extreme Greed';
          merge({ fearGreed: { score, rating, date: latest.date } });
        }
      }),
      fetchJson('https://api.alternative.me/fng/?limit=1').then((d) => { if (d) merge({ cryptoFG: d }); }),
    ];

    await Promise.allSettled([...staticTasks, ...coreLive]);
  }, []);

  /** Heavy DeFi Llama suite — first visit to Web3 (or Macro movers that share TVL). */
  const loadWeb3Live = useCallback(async () => {
    const merge = (patch: any) => {
      if (patch && Object.keys(patch).length > 0) setDd((prev: any) => ({ ...prev, ...patch }));
    };
    const liveTasks: Array<Promise<void>> = [
      fetchJson('https://api.llama.fi/v2/chains').then((chains) => {
        if (!Array.isArray(chains)) return;
        const sorted = chains.filter((c: any) => c.tvl > 0).sort((a: any, b: any) => b.tvl - a.tvl);
        const total = sorted.reduce((s: number, c: any) => s + c.tvl, 0) || 1;
        merge({
          tvl: sorted.slice(0, 12).map((c: any) => ({ name: c.name, tvl: c.tvl, change_1d: c.change_1d || 0, change_7d: c.change_7d || 0 })),
          dominance: sorted.slice(0, 5).map((c: any) => ({ name: c.name, pct: ((c.tvl / total) * 100).toFixed(1) + '%' })),
        });
      }),
      fetchJson('https://api.llama.fi/overview/dexs?dataType=dailyVolume').then((d) => {
        if (!d) return;
        const chart = d.totalDataChartBreakdown;
        const last = Array.isArray(chart) && chart.length > 0 ? chart[chart.length - 1] : null;
        const bd = (last && last[1]) || d.breakdown24h || d.total24hBreakdown || {};
        let volume = (d.allChains || []).slice(0, 10).map((n: string) => ({
          name: n, volume24h: bd[n] || 0,
        })).filter((x: any) => x.volume24h > 0).sort((a: any, b: any) => b.volume24h - a.volume24h);
        if (volume.length === 0) {
          volume = (d.allChains || []).slice(0, 5).map((n: string) => ({ name: n, volume24h: 0 }));
        }
        const total24h = d.total24h || 0;
        const dexDominance = total24h > 0
          ? volume.map((v: any) => ({ ...v, dominance: (v.volume24h / total24h * 100) }))
          : volume.map((v: any) => ({ ...v, dominance: 0 }));
        merge({ totalVolume24h: total24h, volume, dexDominance });
      }),
      fetchJson('https://api.llama.fi/overview/fees?dataType=dailyFees').then((d) => {
        if (!d) return;
        const chart = d.totalDataChartBreakdown;
        const last = Array.isArray(chart) && chart.length > 0 ? chart[chart.length - 1] : null;
        const bd = (last && last[1]) || d.breakdown24h || d.total24hBreakdown || {};
        let fees = (d.allChains || []).slice(0, 10).map((n: string) => ({
          name: n, fees24h: bd[n] || 0,
        })).filter((x: any) => x.fees24h > 0).sort((a: any, b: any) => b.fees24h - a.fees24h);
        if (fees.length === 0) {
          fees = (d.allChains || []).slice(0, 6).map((n: string) => ({ name: n, fees24h: 0 }));
        }
        merge({ fees });
      }),
      fetchJson('https://api.llama.fi/overview/fees?dataType=dailyRevenue').then((d) => {
        if (!d) return;
        const chart = d.totalDataChartBreakdown;
        const last = Array.isArray(chart) && chart.length > 0 ? chart[chart.length - 1] : null;
        const bd = (last && last[1]) || d.breakdown24h || d.total24hBreakdown || {};
        let revenue = (d.allChains || []).slice(0, 10).map((n: string) => ({
          name: n, revenue24h: bd[n] || 0,
        })).filter((x: any) => x.revenue24h > 0).sort((a: any, b: any) => b.revenue24h - a.revenue24h).slice(0, 6);
        if (revenue.length === 0) {
          revenue = (d.allChains || []).slice(0, 6).map((n: string) => ({ name: n, revenue24h: 0 }));
        }
        merge({ revenue });
      }),
      fetchJson('https://stablecoins.llama.fi/stablecoins?includePrices=false').then((d) => {
        if (!d) return;
        const peggedAssets = d.peggedAssets || [];
        const chainMap: Record<string, number> = {};
        for (const s of peggedAssets) {
          const cc = s.chainCirculating || {};
          for (const [chain, data] of Object.entries(cc)) {
            const circ = (data as any)?.circulating?.peggedUSD || 0;
            chainMap[chain] = (chainMap[chain] || 0) + circ;
          }
        }
        const stablecoinChains = Object.entries(chainMap)
          .map(([chain, circulating]) => ({ chain, circulating }))
          .filter((x: any) => x.circulating > 0)
          .sort((a: any, b: any) => b.circulating - a.circulating);
        merge({
          stablecoins: peggedAssets.map((s: any) => ({
            name: s.name || s.symbol, circulating: s.circulating?.peggedUSD || 0,
          })).filter((s: any) => s.circulating > 0).sort((a: any, b: any) => b.circulating - a.circulating).slice(0, 6),
          stablecoinChains,
        });
      }),
      // BOLD Stability Pool APYs — small chart endpoints (avoid full 11MB pools dump in browser)
      // Mirrors Liquity Dune board: https://dune.com/liquity/bold-yields
      (async () => {
        const SP: { id: string; collateral: string }[] = [
          { id: 'dac71f4f-7b97-463a-b19f-9796c56c21f1', collateral: 'wstETH' },
          { id: '326739f2-4650-4992-a8eb-a400e7790499', collateral: 'rETH' },
          { id: 'a635df9a-4cfc-4d17-86d0-934ea441e79f', collateral: 'WETH' },
        ];
        const EXTRA: { id: string; symbol: string; project: string }[] = [
          { id: '4c29f645-12db-461f-a1d7-16900d624271', symbol: 'YBOLD', project: 'yearn-finance' },
          { id: '755529b5-fcf4-4ef0-a7c7-e4f49376706f', symbol: 'BOLD-USDC', project: 'curve-dex' },
        ];
        const fetchLatest = async (poolId: string) => {
          const d = await fetchJson(`https://yields.llama.fi/chart/${poolId}`, 10000);
          const series = d?.data;
          if (!Array.isArray(series) || !series.length) return null;
          const last = series[series.length - 1];
          return {
            apy: typeof last.apy === 'number' ? last.apy : null,
            tvlUsd: typeof last.tvlUsd === 'number' ? last.tvlUsd : null,
          };
        };
        const spRows = await Promise.all(
          SP.map(async (s) => {
            const live = await fetchLatest(s.id);
            if (!live) return null;
            return {
              poolId: s.id,
              project: 'liquity-v2',
              symbol: 'BOLD',
              chain: 'Ethereum',
              collateral: s.collateral,
              kind: 'stability_pool',
              apy: live.apy,
              tvlUsd: live.tvlUsd,
              meta: `BOLD deposited in the ${s.collateral} Stability Pool`,
              url: `https://defillama.com/yields/pool/${s.id}`,
            };
          }),
        );
        const stability_pools = spRows.filter(Boolean) as any[];
        const venueRows = await Promise.all(
          EXTRA.map(async (s) => {
            const live = await fetchLatest(s.id);
            if (!live || !(live.apy && live.apy > 0)) return null;
            return {
              poolId: s.id,
              project: s.project,
              symbol: s.symbol,
              chain: 'Ethereum',
              kind: 'venue',
              apy: live.apy,
              tvlUsd: live.tvlUsd,
              url: `https://defillama.com/yields/pool/${s.id}`,
            };
          }),
        );
        const venues = venueRows.filter(Boolean) as any[];
        if (!stability_pools.length) return;
        const sp_tvl = stability_pools.reduce((s, r) => s + (r.tvlUsd || 0), 0);
        const weighted =
          sp_tvl > 0
            ? stability_pools.reduce((s, r) => s + (r.apy || 0) * (r.tvlUsd || 0), 0) / sp_tvl
            : null;
        merge({
          boldYields: {
            updated_at: new Date().toISOString(),
            source: 'DefiLlama Yields (Liquity V2 BOLD)',
            dune_dashboard: 'https://dune.com/liquity/bold-yields',
            docs: 'https://docs.liquity.org/v2-faq/bold-and-earn',
            headline: {
              weighted_stability_apy: weighted,
              stability_tvl_usd: sp_tvl,
              pool_count: stability_pools.length,
            },
            stability_pools,
            venues,
            live: true,
          },
        });
      })(),
    ];
    await Promise.allSettled(liveTasks);
  }, []);

  const loadInfosec = useCallback(async () => {
    const result: any = { kev: [], cves: [], breaches: [] };
    let liveHits = 0;
    await Promise.allSettled([
      fetchJson(proxy('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json')).then((d) => {
        if (d) {
          // Prefer recently added KEV; keep 12 for filtering in UI
          const sorted = [...(d.vulnerabilities || [])].sort((a: any, b: any) =>
            String(b.dateAdded || '').localeCompare(String(a.dateAdded || ''))
          );
          result.kev = sorted.slice(0, 12).map((v: any) => ({
            cve: v.cveID,
            product: v.product,
            vendor: v.vendorProject,
            name: v.vulnerabilityName,
            dateAdded: v.dateAdded,
            dueDate: v.dueDate,
            knownRansomware: v.knownRansomwareCampaignUse || '',
          }));
          if (result.kev.length) liveHits += 1;
        }
      }),
      fetchJson(proxy('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=12')).then((d) => {
        if (d) {
          result.cves = (d.vulnerabilities || []).map((v: any) => {
            const cve = v.cve || {};
            const m = cve.metrics?.cvssMetricV31?.[0]?.cvssData || cve.metrics?.cvssMetricV30?.[0]?.cvssData || {};
            const desc = (cve.descriptions || []).find((x: any) => x.lang === 'en');
            return { id: cve.id, severity: m.baseSeverity || 'N/A', score: m.baseScore || 0, description: (desc?.value || '').slice(0, 140), published: cve.published };
          });
          if (result.cves.length) liveHits += 1;
        }
      }),
      fetchJson(proxy('https://haveibeenpwned.com/api/v3/breaches')).then((d) => {
        if (d) {
          const list = (Array.isArray(d) ? d : [])
            .slice()
            .sort((a: any, b: any) => String(b.BreachDate || '').localeCompare(String(a.BreachDate || '')))
            .slice(0, 12)
            .map((b: any) => ({
              name: b.Name || b.Title, domain: b.Domain, date: b.BreachDate, count: b.PwnCount, data: (b.DataClasses || []).slice(0, 5).join(', '),
            }));
          result.breaches = list;
          if (result.breaches.length) liveHits += 1;
        }
      }),
    ]);
    let snapUpdated: string | null = null;
    if (!result.kev.length || !result.cves.length || !result.breaches.length) {
      const c = await fetchJson(`${BASE}/data/infosec.json`);
      if (c) {
        snapUpdated = c.updatedAt || null;
        if (!result.kev.length) result.kev = c.kev || [];
        if (!result.cves.length) result.cves = c.cves || [];
        if (!result.breaches.length) result.breaches = c.breaches || [];
      }
    }
    setDd2(result);
    const source =
      liveHits === 3 ? 'live' :
      liveHits === 0 ? (result.kev.length || result.cves.length || result.breaches.length ? 'snapshot' : 'empty') :
      'mixed';
    setInfosecMeta({ source, updatedAt: snapUpdated || new Date().toISOString() });
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
      await Promise.allSettled(pairs.map(async (p) => {
        {
          const d = await fetchJson(`https://query1.finance.yahoo.com/v8/finance/chart/${p.symbol}?interval=1d&range=10y`);
          if (d) {
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
        }
      }));
      if (Object.keys(results).length > 0) setForex(results);
    } catch { /* */ }
  }, []);

  // Core data always
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== 'visible') return;
      loadAll();
      loadLive();
      loadForex();
      // Keep heavy tabs warm once visited
      if (web3LiveOnce.current) loadWeb3Live();
      if (infosecLiveOnce.current) loadInfosec();
    };
    refresh();
    const i = window.setInterval(refresh, 5 * 60_000);
    document.addEventListener('visibilitychange', refresh);
    return () => { window.clearInterval(i); document.removeEventListener('visibilitychange', refresh); };
  }, [loadAll, loadLive, loadForex, loadWeb3Live, loadInfosec]);

  // Lazy: first open of Web3 (or Macro for TVL movers) loads Llama suite
  useEffect(() => {
    if (activeTab === 'web3' || activeTab === 'macro') {
      if (!web3LiveOnce.current) {
        web3LiveOnce.current = true;
        loadWeb3Live();
      }
    }
    if (activeTab === 'infosec') {
      if (!infosecLiveOnce.current) {
        infosecLiveOnce.current = true;
        loadInfosec();
      }
    }
  }, [activeTab, loadWeb3Live, loadInfosec]);

  /* ---- Derived ---- */
  // Category → tags that don't belong (e.g. macro box shouldn't show crypto-tagged items)
  const CAT_TAG_BLOCK: Record<string, string[]> = {
    macro: ['crypto', 'cybersec'],
    science: ['crypto', 'cybersec'],
    ai: ['crypto', 'cybersec'],
    hardware: ['crypto', 'cybersec', 'macro', 'science', 'ai'],
    crypto: ['cybersec', 'science'],
    cybersec: ['crypto', 'macro', 'science', 'hardware'],
  };
  // Word-boundary keyword matcher — prevents "asic" matching "basic"
  const kwMatch = (text: string, kw: string): boolean => {
    const kl = kw.toLowerCase().replace(/\./g, '');
    return new RegExp('\\b' + kl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(text);
  };
  // ── 7-day window ────────────────────────────────────────────────
  // News items must only surface the last 7 days. Dates arrive in mixed
  // formats (RFC-2822 "Tue, 14 Jul 2026 …" and ISO with a spaced offset
  // "2026-07-14T14:31:44 +0000"), so parse defensively.
  const RECENT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
  const parseItemDate = (i: any): number => {
    const s = i.published_at || i.pubDate || i.date;
    if (!s) return 0;
    let t = new Date(s).getTime();
    if (!isNaN(t)) return t;
    t = new Date(String(s).replace(/ ([+-]\d{4})$/, '$1')).getTime();
    return isNaN(t) ? 0 : t;
  };
  const recentItems = items.filter((i: any) => {
    const t = parseItemDate(i);
    return t > 0 && Date.now() - t <= RECENT_WINDOW_MS;
  });

  const catBoxes = CATS.map(cat => ({
    ...cat,
    items: recentItems.filter(i => {
      const blockTags = CAT_TAG_BLOCK[cat.id] || [];
      if (i.tag && blockTags.includes(i.tag)) return false;
      // Hardware-specific exclusion: block items matching noise patterns
      if (cat.id === 'hardware') {
        const txt = (i.title + ' ' + (i.summary || '')).toLowerCase();
        if (HW_EXCLUDE.some(k => txt.includes(k))) return false;
      }
      // Exclude MarketNews_Feed from macro box — has its own dedicated ticker
      if (cat.id === 'macro') {
        const src = (i.source || '').toLowerCase();
        if (src.includes('marketnews_feed')) return false;
      }
      const txt = (i.title + ' ' + (i.summary || '')).toLowerCase();
      // Include if tagged as this category (catches AI leader tweets etc.)
      if (i.tag === cat.id) return true;
      // Include if content matches category keywords (word-boundary)
      return cat.kw.some(k => kwMatch(txt, k));
    }).slice(0, 15),
    count: 0,
  }));
  catBoxes.forEach(c => { c.count = c.items.length; });

  // TradFi F&G: {score, rating, date}
  const fgVal = (typeof dd?.fearGreed?.score === 'number') ? dd.fearGreed.score : 0;
  const fgLabel = dd?.fearGreed?.rating || '';
  // Crypto F&G: alternative.me format
  const cryptoFG = dd?.cryptoFG || {};
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
    items: recentItems, loading, patents, dd, dd2, forex, watchlist,
    catBoxes, macroCats, infosecCats, web3Cats, aiCats, fgVal, fgLabel, totalVol,
    tabAccent, tabLabel, ts, ago, isNew, fmt, fmtN, TC, BCOL, SOCMED_SOURCES, lastFetch,
    infosecMeta,
  };
}

export { CATS, TC, BCOL };
