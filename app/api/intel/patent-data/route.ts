import { NextResponse } from 'next/server';

// Cache patent data (static for now, API integration pending)
export async function GET() {
  const patentData = {
    header: {
      uspto: '364K',
      wipo: 'US Patents Granted (2024)',
      yoy: '+0.5% YoY',
      utility: '339K',
      design: '24K',
      filed: '650K',
    },
    topHolders: [
      { name: 'Samsung Electronics', count: '6K', change: '-3.2%', dir: 'down' },
      { name: 'IBM', count: '5K', change: '-12.5%', dir: 'down' },
      { name: 'TSMC', count: '4K', change: '+8.7%', dir: 'up' },
      { name: 'Qualcomm', count: '4K', change: '+2.1%', dir: 'up' },
      { name: 'Apple', count: '4K', change: '+5.3%', dir: 'up' },
      { name: 'Huawei', count: '4K', change: '-1.8%', dir: 'down' },
      { name: 'Intel', count: '3K', change: '-8.4%', dir: 'down' },
      { name: 'LG Electronics', count: '3K', change: '-5.2%', dir: 'down' },
      { name: 'Google', count: '3K', change: '+11.4%', dir: 'up' },
    ],
    techAreas: [
      { name: 'Computer Hardware & Software', pct: '14.3%' },
      { name: 'Semiconductor Devices', pct: '10.6%' },
      { name: 'Digital Communications', pct: '9.7%' },
      { name: 'Medical Devices & Instruments', pct: '7.8%' },
      { name: 'Drug & Pharmaceutical', pct: '6.6%' },
    ],
    originCountries: [
      { name: 'United States', pct: '45%', change: '-0.8%', dir: 'down' },
      { name: 'Japan', pct: '14.3%', change: '-3.1%', dir: 'down' },
      { name: 'South Korea', pct: '9.1%', change: '-1.5%', dir: 'down' },
      { name: 'China', pct: '8%', change: '+12.4%', dir: 'up' },
      { name: 'Germany', pct: '4.7%', change: '-2.3%', dir: 'down' },
      { name: 'Taiwan', pct: '4.5%', change: '+6.8%', dir: 'up' },
    ],
    hotAreas: [
      { name: 'Generative AI / LLMs', sector: 'Tech valuations, compute demand', trend: 'rapid' },
      { name: 'GLP-1 / Obesity drugs', sector: 'Pharma sector, Novo/Lilly advantage', trend: 'rapid' },
      { name: 'Solid-state batteries', sector: 'EV supply chain disruption', trend: 'moderate' },
      { name: 'Quantum computing', sector: 'Encryption, materials science', trend: 'moderate' },
      { name: 'Advanced chip packaging', sector: 'TSMC, Intel foundry positioning', trend: 'rapid' },
      { name: 'CRISPR therapeutics', sector: 'Biotech M&A targets', trend: 'moderate' },
    ],
  };

  return NextResponse.json(patentData);
}
