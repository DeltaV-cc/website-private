import { NextResponse } from 'next/server';

const DEFILLAMA_TVL = 'https://api.llama.fi/protocols';
const DEFILLAMA_CHAINS = 'https://api.llama.fi/chains';
const L2BEAT_TVL = 'https://api.l2beat.com/api/scaling/tvl';
const POLYMARKET = 'https://gamma-api.polymarket.com/markets';

async function fetchJson(url: string) {
  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }, // cache 5 min
    });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export async function GET() {
  // Fetch all in parallel
  const [tvl, chains, l2beat, polymarket] = await Promise.all([
    fetchJson(DEFILLAMA_TVL),
    fetchJson(DEFILLAMA_CHAINS),
    fetchJson(L2BEAT_TVL),
    fetchJson(POLYMARKET),
  ]);

  // Top protocols by TVL (top 5)
  const topProtocols = Array.isArray(tvl)
    ? tvl.slice(0, 8).map((p: any) => ({
        name: p.name,
        tvl: p.tvl,
        change_1h: p.change_1h,
        change_1d: p.change_1d,
        chain: p.chain,
        slug: p.slug,
      }))
    : [];

  // Chain TVL data
  const chainData = Array.isArray(chains)
    ? chains.slice(0, 8).map((c: any) => ({
        name: c.name,
        tvl: c.tvl,
        tokenSymbol: c.tokenSymbol,
        chainId: c.chainId,
      }))
    : [];

  // L2Beat data
  const l2Data = l2beat
    ? { tvl: l2beat, updated: new Date().toISOString() }
    : null;

  // Polymarket top markets
  const topMarkets = Array.isArray(polymarket)
    ? polymarket.slice(0, 6).map((m: any) => ({
        question: m.question,
        volume: m.volume,
        volume24hr: m.volume24hr,
        slug: m.slug,
        outcomes: JSON.parse(m.outcomes || '[]').slice(0, 2),
      }))
    : [];

  return NextResponse.json({
    defillama: {
      topProtocols,
      chainData,
    },
    l2beat: l2Data,
    polymarket: topMarkets,
    updated: new Date().toISOString(),
  });
}
