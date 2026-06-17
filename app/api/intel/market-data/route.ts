import { NextResponse } from 'next/server';

// ============================
//  DeFiLlama TVL — top chains
// ============================
export async function GET() {
  try {
    const [tvlRes, dexRes, polyRes] = await Promise.all([
      fetch('https://api.llama.fi/v2/chains', { next: { revalidate: 300 } }),
      fetch('https://api.llama.fi/overview/dexs?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume', { next: { revalidate: 300 } }),
      fetch('https://gamma-api.polymarket.com/events?limit=50&active=true&closed=false', { next: { revalidate: 300 } }),
    ]);

    const chains = tvlRes.ok ? await tvlRes.json() : [];
    const dexData = dexRes.ok ? await dexRes.json() : {};
    const polyEvents = polyRes.ok ? await polyEvents.json() : [];

    // Top 10 chains by TVL
    const topChains = (Array.isArray(chains) ? chains : [])
      .filter((c: any) => c.tvl > 0)
      .sort((a: any, b: any) => b.tvl - a.tvl)
      .slice(0, 10)
      .map((c: any) => ({
        name: c.name,
        tvl: c.tvl,
        symbol: c.tokenSymbol || c.name?.slice(0, 4).toUpperCase(),
      }));

    // Top 10 DEX by daily volume
    const allChains: string[] = dexData.allChains || [];
    const total24h = dexData.total24h || 0;
    const topDex = allChains.slice(0, 10).map((name: string) => {
      const vol = dexData.breakdown24h?.[name] || 0;
      return { name, volume24h: vol };
    }).sort((a: any, b: any) => b.volume24h - a.volume24h);

    // Polymarket — only crypto/macro relevant
    const cryptoKeywords = [
      'crypto', 'bitcoin', 'ethereum', 'solana', 'defi', 'macro', 'fed',
      'inflation', 'rate', 'gdp', 'tariff', 'sec', 'regulation', 'treasury',
      'election', 'war', 'oil', 'energy', 'ai',
    ];
    const junkKeywords = [
      'nba', 'nfl', 'mlb', 'ufc', 'soccer', 'formula', 'grammy', 'oscar',
      'celebrity', 'rihanna', 'kardashian', 'influencer', 'tiktok',
    ];

    const polyMarkets = polyEvents
      .filter((e: any) => {
        const t = (e.title || '').toLowerCase();
        const junk = junkKeywords.some(k => t.includes(k));
        const relevant = cryptoKeywords.some(k => t.includes(k));
        return !junk && relevant;
      })
      .slice(0, 10)
      .map((e: any) => ({
        title: e.title,
        slug: e.slug,
        volume: e.volume || 0,
        liquidity: e.liquidity || 0,
        url: `https://polymarket.com/event/${e.slug}`,
      }));

    return NextResponse.json({
      topChains,
      topDex,
      totalVolume24h: total24h,
      polyMarkets,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[market-data] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
  }
}
