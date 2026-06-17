import { NextResponse } from 'next/server';

const DEFILLAMA_PROTOCOLS = 'https://api.llama.fi/protocols';
const DEFILLAMA_CHAINS = 'https://api.llama.fi/chains';
const DEFILLAMA_DEXS = 'https://api.llama.fi/overview/dexs?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true';
const DEFILLAMA_STABLECOINS = 'https://stablecoins.llama.fi/stablecoins?includePrices=false';
const DEFILLAMA_FEES = 'https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true';

async function fetchJson(url: string) {
  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 300 },
    });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export async function GET() {
  const [protocols, chains, dexs, stablecoins, fees] = await Promise.all([
    fetchJson(DEFILLAMA_PROTOCOLS),
    fetchJson(DEFILLAMA_CHAINS),
    fetchJson(DEFILLAMA_DEXS),
    fetchJson(DEFILLAMA_STABLECOINS),
    fetchJson(DEFILLAMA_FEES),
  ]);

  // Top protocols by TVL
  const topProtocols = Array.isArray(protocols)
    ? protocols.slice(0, 10).map((p: any) => ({
        name: p.name,
        tvl: p.tvl,
        change_1h: p.change_1h,
        change_1d: p.change_1d,
        change_7d: p.change_7d,
        chain: p.chain,
        category: p.category,
        slug: p.slug,
      }))
    : [];

  // Chain data
  const chainData = Array.isArray(chains)
    ? chains.slice(0, 8).map((c: any) => ({
        name: c.name,
        tvl: c.tvl,
        tokenSymbol: c.tokenSymbol,
      }))
    : [];

  // DEX volumes (24h)
  const dexData = dexs?.total24h
    ? { volume24h: dexs.total24h, change_1d: dexs.change_1d }
    : null;

  // Stablecoin data
  const stablecoinData = stablecoins?.peggedAssets
    ? stablecoins.peggedAssets.slice(0, 6).map((s: any) => ({
        name: s.name,
        symbol: s.symbol,
        circulating: s.circulating?.peggedUSD,
        change_1d: s.circulating?.change_1d,
      }))
    : [];

  // Fee data
  const feeData = fees?.total24h
    ? { fees24h: fees.total24h, change_1d: fees.change_1d }
    : null;

  // Total DeFi TVL
  const totalTVL = chainData.reduce((sum: number, c: any) => sum + (c.tvl || 0), 0);

  return NextResponse.json({
    totalTVL,
    dexVolume24h: dexData?.volume24h || 0,
    fees24h: feeData?.fees24h || 0,
    topProtocols,
    chainData,
    stablecoinData,
    updated: new Date().toISOString(),
  });
}
