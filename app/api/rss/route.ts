import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  try {
    // Example: DeFiLlama Research feed
    const feed = await parser.parseURL('https://defillama.com/research/feed.xml');

    const items = feed.items.slice(0, 6).map((item: any) => ({
      title: item.title,
      date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      }) : 'Recent',
      category: 'Research',
      summary: item.contentSnippet || item.content?.substring(0, 120) || '',
      link: item.link || '#'
    }));

    return NextResponse.json(items);
  } catch (error) {
    console.error('RSS fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}
