import { NextResponse } from 'next/server';

export async function GET() {
  const result: any = { topChains: [], topDex: [], polyMarkets: [], updatedAt: new Date().toISOString() };

  try {
    const tvlRes = await fetch('https://api.llama.fi/v2/chains');
    if (tvlRes.ok) {
      const chains = await tvlRes.json();
      result.topChains = (Array.isArray(chains) ? chains : [])
        .filter((c: any) => c.tvl > 0)
        .sort((a: any, b: any) => b.tvl - a.tvl)
        .slice(0, 10)
        .map((c: any) => ({ name: c.name, tvl: c.tvl, symbol: c.tokenSymbol || c.name?.slice(0, 4).toUpperCase() }));
    }
  } catch (e) { console.error('TVL:', e); }

  try {
    const dexRes = await fetch('https://api.llama.fi/overview/dexs?dataType=dailyVolume');
    if (dexRes.ok) {
      const d = await dexRes.json();
      result.totalVolume24h = d.total24h || 0;
      result.topDex = (d.allChains || [])
        .slice(0, 10)
        .map((name: string) => {
          let vol = 0;
          if (d.breakdown24h && typeof d.breakdown24h === 'object') vol = d.breakdown24h[name] || 0;
          if (d.total24hBreakdown && typeof d.total24hBreakdown === 'object') vol = d.total24hBreakdown[name] || vol;
          return { name, volume24h: vol || 0 };
        })
        .filter((x: any) => x.volume24h > 0)
        .sort((a: any, b: any) => b.volume24h - a.volume24h);
    }
  } catch (e) { console.error('DEX:', e); }

  try {
    const polyRes = await fetch('https://gamma-api.polymarket.com/events?limit=50&active=true&closed=false');
    if (polyRes.ok) {
      const events = await polyRes.json();
      const keep = ['crypto','bitcoin','ethereum','solana','defi','macro','fed','inflation','rate','gdp','tariff','sec','regulation','treasury','election','war','oil','energy','ai'];
      const junk = ['nba','nfl','mlb','ufc','soccer','formula','grammy','oscar','celebrity','rihanna','kardashian'];
      result.polyMarkets = events
        .filter((e: any) => { const t = (e.title||'').toLowerCase(); return !junk.some(k => t.includes(k)) && keep.some(k => t.includes(k)); })
        .slice(0, 10)
        .map((e: any) => ({ title: e.title, volume: e.volume||0, liquidity: e.liquidity||0, url: `https://polymarket.com/event/${e.slug}` }));
    }
  } catch (e) { console.error('Poly:', e); }

  return NextResponse.json(result);
}
