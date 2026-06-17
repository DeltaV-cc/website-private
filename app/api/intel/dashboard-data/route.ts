import { NextResponse } from 'next/server';

export async function GET() {
  const result: any = {
    fearGreed: null,
    defiLlama: { tvl: [], volume: [], fees: [], stablecoins: [] },
    polymarket: [],
    worldBankGDP: null,
    worldBankInflation: null,
    worldBankTrade: null,
    worldBankInterest: null,
    updatedAt: new Date().toISOString(),
  };

  // Fear & Greed Index
  try { const fg = await fetch('https://api.alternative.me/fng/?limit=7'); if (fg.ok) result.fearGreed = await fg.json(); } catch (e) {}

  // CoinGecko global (dominance + market cap)
  try { const cg = await fetch('https://api.coingecko.com/api/v3/global'); if (cg.ok) { const g = await cg.json(); result.coinGeckoGlobal = g.data; } } catch (e) {}


  // World Bank: GDP
  try { const wb = await fetch('https://api.worldbank.org/v2/country/US/indicator/NY.GDP.MKTP.CD?format=json&per_page=3'); if (wb.ok) result.worldBankGDP = await wb.json(); } catch (e) {}
  // World Bank: Inflation
  try { const inf = await fetch('https://api.worldbank.org/v2/country/US/indicator/FP.CPI.TOTL.ZG?format=json&per_page=2'); if (inf.ok) result.worldBankInflation = await inf.json(); } catch (e) {}
  // World Bank: Trade
  try { const trade = await fetch('https://api.worldbank.org/v2/country/US/indicator/NE.TRD.GNFS.ZS?format=json&per_page=2'); if (trade.ok) result.worldBankTrade = await trade.json(); } catch (e) {}
  // World Bank: Real Interest Rate
  try { const ir = await fetch('https://api.worldbank.org/v2/country/US/indicator/FR.INR.RINR?format=json&per_page=2'); if (ir.ok) result.worldBankInterest = await ir.json(); } catch (e) {}

  // DeFiLlama TVL
  try { const r = await fetch('https://api.llama.fi/v2/chains'); if (r.ok) { const chains = await r.json(); result.defiLlama.tvl = chains.filter((c:any)=>c.tvl>0).sort((a:any,b:any)=>b.tvl-a.tvl).slice(0,12); } } catch (e) {}

  // DeFiLlama DEX volume
  try { const r = await fetch('https://api.llama.fi/overview/dexs?dataType=dailyVolume'); if (r.ok) { const d = await r.json(); result.defiLlama.volume = (d.allChains||[]).slice(0,10).map((n:string)=>({name:n,volume24h:d.breakdown24h?.[n]||d.total24hBreakdown?.[n]||0})).filter((x:any)=>x.volume24h>0).sort((a:any,b:any)=>b.volume24h-a.volume24h); result.defiLlama.totalVolume24h=d.total24h||0; } } catch (e) {}

  // DeFiLlama fees
  try { const r = await fetch('https://api.llama.fi/overview/fees?dataType=dailyFees'); if (r.ok) { const d = await r.json(); result.defiLlama.fees = (d.allChains||[]).slice(0,10).map((n:string)=>({name:n,fees24h:d.breakdown24h?.[n]||d.total24hBreakdown?.[n]||0})).filter((x:any)=>x.fees24h>0).sort((a:any,b:any)=>b.fees24h-a.fees24h); } } catch (e) {}

  // DeFiLlama stablecoins
  try { const r = await fetch('https://stablecoins.llama.fi/stablecoins?includePrices=false'); if (r.ok) { const d = await r.json(); result.defiLlama.stablecoins = (d.peggedAssets||[]).map((s:any)=>({name:s.name||s.symbol,circulating:s.circulating?.peggedUSD||0})).filter((s:any)=>s.circulating>0).sort((a:any,b:any)=>b.circulating-a.circulating).slice(0,6); } } catch (e) {}

  // Polymarket
  try { const r = await fetch('https://gamma-api.polymarket.com/events?limit=50&active=true&closed=false'); if (r.ok) { const events = await r.json(); const keep = ['crypto','bitcoin','ethereum','solana','defi','macro','fed','inflation','rate','gdp','tariff','sec','regulation','treasury','election','war','oil','energy','ai']; const junk = ['nba','nfl','mlb','ufc','soccer','formula','grammy','oscar','celebrity','rihanna']; result.polymarket = events.filter((e:any)=>{const t=(e.title||'').toLowerCase();return!junk.some(k=>t.includes(k))&&keep.some(k=>t.includes(k));}).slice(0,8); } } catch (e) {}

  return NextResponse.json(result);
}
