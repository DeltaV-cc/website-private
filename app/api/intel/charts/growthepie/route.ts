import { NextResponse } from 'next/server';

const GTP_URL = 'https://api.growthepie.xyz/v1/fundamentals_full.json';

export async function GET() {
  try {
    const res = await fetch(GTP_URL, {
      headers: { 'User-Agent': 'DeltaV-ZHC/1.0' },
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const all: any[] = await res.json();
    // Filter to latest date + top L2s by txcount
    const latestDate = all[all.length - 1]?.timestamp;
    const recent = all.filter((r: any) => r.timestamp === latestDate);

    const top = recent
      .sort((a: any, b: any) => (b.txcount || 0) - (a.txcount || 0))
      .slice(0, 12)
      .map((r: any) => ({
        chain: r.chain_name || r.origin_key,
        txcount: r.txcount || 0,
        daa: r.daa || 0,
        fees: r.fees || 0,
        value: r.value || 0,
      }));

    return NextResponse.json(top);
  } catch (e) {
    console.error('[GrowthePie API]', e);
    return NextResponse.json([]);
  }
}
