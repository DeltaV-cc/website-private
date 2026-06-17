import { NextResponse } from 'next/server';

export async function GET() {
  const patentData = {
    header: { uspto: '364K', wipo: 'US Patents Granted (2024)', yoy: '+0.5% YoY', utility: '339K', design: '24K', filed: '650K' },
    topHolders: [
      { name: 'Samsung', count: '6,165', change: '-3.2%', dir: 'down', mcap: '$340B' },
      { name: 'IBM', count: '4,752', change: '-12.5%', dir: 'down', mcap: '$210B' },
      { name: 'TSMC', count: '3,987', change: '+8.7%', dir: 'up', mcap: '$920B' },
      { name: 'Qualcomm', count: '3,854', change: '+2.1%', dir: 'up', mcap: '$180B' },
      { name: 'Apple', count: '3,692', change: '+5.3%', dir: 'up', mcap: '$3.2T' },
      { name: 'Huawei', count: '3,558', change: '-1.8%', dir: 'down', mcap: 'private' },
      { name: 'Intel', count: '2,847', change: '-8.4%', dir: 'down', mcap: '$85B' },
      { name: 'LG', count: '2,631', change: '-5.2%', dir: 'down', mcap: '$12B' },
      { name: 'Google', count: '2,589', change: '+11.4%', dir: 'up', mcap: '$2.1T' },
    ],
    techAreas: [
      { name: 'Computer HW & SW', pct: '14.3%' },
      { name: 'Semiconductors', pct: '10.6%' },
      { name: 'Digital Comms', pct: '9.7%' },
      { name: 'Medical Devices', pct: '7.8%' },
      { name: 'Pharma', pct: '6.6%' },
    ],
    hotAreas: [
      { name: 'GenAI / LLMs', trend: 'rapid' },
      { name: 'GLP-1 Drugs', trend: 'rapid' },
      { name: 'Solid-state batteries', trend: 'moderate' },
      { name: 'Quantum computing', trend: 'moderate' },
      { name: 'Chip packaging', trend: 'rapid' },
      { name: 'CRISPR therapeutics', trend: 'moderate' },
    ],
  };

  return NextResponse.json(patentData);
}
