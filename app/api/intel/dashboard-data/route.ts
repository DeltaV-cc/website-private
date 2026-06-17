import { NextResponse } from 'next/server';

export async function GET() {
  const result: any = {
    fearGreed: null,
    defiLlama: { tvl: [], volume: [], fees: [], stablecoins: [] },
    polymarket: [],
    updatedAt: new Date().toISOString(),
  };

  // Fear & Greed Index (free, no key)
  try {
    const fg = await fetch('https://api.alternative.me/fng/?limit=7');
    if (fg.ok) result.fearGreed = await fg.json();
  } catch (e) { console.error('F&G:', e); }

  // World Bank GDP (free, no key)
  try {
    const wb = await fetch('https://api.worldbank.org/v2/country/US/indicator/NY.GDP.MKTP.CD?format=json&per_page=3');
    if (wb.ok) result.worldBankGDP = await wb.json();
  } catch (e) {}

  // World Bank Inflation
  try {
    const inf = await fetch('https://api.worldbank.org/v2/country/US/indicator/FP.CPI.TOTL.ZG?format=json&per_page=3');
    if (inf.ok) result.worldBankInflation = await inf.json();
  } catch (e) {}

  // DeFiLlama TVL
  try {
    const r = await fetch('https://api.llama.fi/v2/chains');
    if (r.ok) {
      const chains = await r.json();
      result.defiLlama.tvl = (Array.isArray(chains) ? chains : [])
        .filter((c: any) => c.tvl > 0)
        .sort((a: any, b: any) => b.tvl - a.tvl)
        .slice(0, 12);
    }
  } catch (e) {}

  // DeFiLlama DEX volume
  try {
    const r = await fetch('https://api.llama.fi/overview/dexs?dataType=dailyVolume');
    if (r.ok) {
      const d = await r.json();
      result.defiLlama.volume = (d.allChains || []).slice(0, 10).map((name: string) => {
        let vol = 0;
        if (d.breakdown24h?.[name]) vol = d.breakdown24h[name];
        if (d.total24hBreakdown?.[name]) vol = d.total24hBreakdown[name];
        return { name, volume24h: vol || 0 };
      }).filter((x: any) => x.volume24h > 0).sort((a: any, b: any) => b.volume24h - a.volume24h);
      result.defiLlama.totalVolume24h = d.total24h || 0;
    }
  } catch (e) {}

  // DeFiLlama fees
  try {
    const r = await fetch('https://api.llama.fi/overview/fees?dataType=dailyFees');
    if (r.ok) {
      const d = await r.json();
      result.defiLlama.fees = (d.allChains || []).slice(0, 10).map((name: string) => ({
        name,
        fees24h: d.breakdown24h?.[name] || d.total24hBreakdown?.[name] || 0,
      })).filter((x: any) => x.fees24h > 0).sort((a: any, b: any) => b.fees24h - a.fees24h);
    }
  } catch (e) {}

  // DeFiLlama stablecoins
  try {
    const r = await fetch('https://stablecoins.llama.fi/stablecoins?includePrices=false');
    if (r.ok) {
      const d = await r.json();
      const pegged = d.peggedAssets || [];
      result.defiLlama.stablecoins = pegged
        .map((s: any) => ({ name: s.name || s.symbol, circulating: s.circulating?.peggedUSD || 0 }))
        .filter((s: any) => s.circulating > 0)
        .sort((a: any, b: any) => b.circulating - a.circulating)
        .slice(0, 6);
    }
  } catch (e) {}

  // Polymarket
  try {
    const r = await fetch('https://gamma-api.polymarket.com/events?limit=50&active=true&closed=false');
    if (r.ok) {
      const events = await r.json();
      const keep = ['crypto','bitcoin','ethereum','solana','defi','macro','fed','inflation','rate','gdp','tariff','sec','regulation','treasury','election','war','oil','energy','ai'];
      const junk = ['nba','nfl','mlb','ufc','soccer','formula','grammy','oscar','celebrity','rihanna'];
      result.polymarket = events
        .filter((e: any) => { const t = (e.title||'').toLowerCase(); return !junk.some(k => t.includes(k)) && keep.some(k => t.includes(k)); })
        .slice(0, 8);
    }
  } catch (e) {}

  return NextResponse.json(result);
}
