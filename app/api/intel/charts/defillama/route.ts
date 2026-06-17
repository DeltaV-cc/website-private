import { NextResponse } from 'next/server';

const ENDPOINTS = {
  tvl: 'https://api.llama.fi/v2/chains',
  fees: 'https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees',
  stablecoins: 'https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=1',
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'tvl';

  const url = ENDPOINTS[type as keyof typeof ENDPOINTS];
  if (!url) return NextResponse.json({ error: 'unknown type' }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'DeltaV-ZHC/1.0' },
      next: { revalidate: 300 }, // cache 5 min
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (type === 'tvl') {
      const top = (Array.isArray(data) ? data : []).slice(0, 12).map((c: any) => ({
        name: c.name || c.gecko_id,
        tvl: c.tvl || 0,
        symbol: c.tokenSymbol || '',
      }));
      return NextResponse.json(top);
    }

    if (type === 'fees') {
      const protocols = data?.protocols || [];
      const top = protocols.slice(0, 12).map((p: any) => ({
        name: p.name,
        fees24h: p.fees24h || p.dailyFees || 0,
        revenue24h: p.revenue24h || 0,
        category: p.category || '',
      }));
      return NextResponse.json(top);
    }

    if (type === 'stablecoins') {
      const top = (Array.isArray(data) ? data : []).slice(-12).map((s: any) => ({
        date: s.date,
        circulating: s.totalCirculating?.peggedUSD || 0,
      }));
      return NextResponse.json(top);
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error('[DeFiLlama API]', e);
    return NextResponse.json([]);
  }
}
