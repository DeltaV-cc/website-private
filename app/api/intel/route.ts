import { NextResponse } from 'next/server';
import fs from 'fs';

const DIGEST_PATH = 'C:\\Users\\Admin\\DeltaV\\wiki\\Memory\\Intel\\delta-intel-digest.md';

interface IntelItem {
  title: string;
  source: string;
  link: string;
  tags: string;
  time: string;
  score: number;
  summary: string;
  published?: string;
}

function parseDigest(content: string): IntelItem[] {
  const items: IntelItem[] = [];
  const lines = content.split('\n');

  let current: Partial<IntelItem> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Title line: **Title** (source) tags
    const titleMatch = line.match(/^\*\*(.+?)\*\*\s+\((.+?)\)\s*(.*)$/);
    if (titleMatch) {
      if (current.title) {
        items.push(current as IntelItem);
      }
      current = {
        title: titleMatch[1].trim(),
        source: titleMatch[2].trim(),
        tags: titleMatch[3].trim() || '',
        link: '',
        summary: '',
        time: 'recent',
        score: 0
      };
      continue;
    }

    // Link line
    const linkMatch = line.match(/^→\s+(https?:\/\/.+)$/);
    if (linkMatch && current.title) {
      current.link = linkMatch[1].trim();
      continue;
    }

    // Summary line (starts with _ )
    if (line.startsWith('_') && line.endsWith('_') && current.title) {
      current.summary = line.replace(/^_+|_+$/g, '').trim();
      continue;
    }
  }

  // Push the last item
  if (current.title) {
    items.push(current as IntelItem);
  }

  return items;
}

export async function GET() {
  try {
    if (!fs.existsSync(DIGEST_PATH)) {
      return NextResponse.json({ error: 'Digest file not found', path: DIGEST_PATH }, { status: 404 });
    }
    
    const content = fs.readFileSync(DIGEST_PATH, 'utf-8');
    const items = parseDigest(content);

    return NextResponse.json({
      items: items.slice(0, 300),
      count: items.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to read Intel digest:', error);
    return NextResponse.json(
      { error: 'Failed to load intel feed', details: String(error) },
      { status: 500 }
    );
  }
}
