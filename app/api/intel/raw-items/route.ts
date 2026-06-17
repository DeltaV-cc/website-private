import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const isWindows = process.platform === 'win32';
const RAW_DIR = isWindows
  ? 'C:\\Users\\Admin\\DeltaV-persistent-workspace\\intel\\raw'
  : path.join(process.cwd(), '..', '..', '..', 'DeltaV-persistent-workspace', 'intel', 'raw');

export async function GET() {
  try {
    if (!fs.existsSync(RAW_DIR)) {
      console.error('[raw-items] Directory not found:', RAW_DIR);
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
    const seen = new Set<string>();
    let allItems: any[] = [];

    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(RAW_DIR, file), 'utf-8');
        const items = JSON.parse(content);
        if (!Array.isArray(items)) continue;

        for (const item of items) {
          let entry: any;
          if (Array.isArray(item)) {
            entry = {
              title: item[0] || '',
              url:  item[1] || '',
              source: item[2] || file.replace('.json', ''),
              published_at: item[3] || '',
              summary: item[4] || '',
            };
          } else {
            entry = {
              title: item.title || item.name || '',
              url:  item.url || item.link || '',
              source: item.source || file.replace('.json', ''),
              published_at: item.published_at || item.published || item.date || '',
              summary: item.summary || item.description || '',
            };
          }
          const key = entry.url || entry.title;
          if (key && !seen.has(key)) {
            seen.add(key);
            allItems.push(entry);
          }
        }
      } catch (e) {
        console.error('[raw-items] Error reading file:', file, e);
      }
    }

    allItems.sort((a, b) =>
      new Date(b.published_at || 0).getTime() -
      new Date(a.published_at || 0).getTime()
    );

    return NextResponse.json(allItems.slice(0, 100));
  } catch (error) {
    console.error('[raw-items] Fatal error:', error);
    return NextResponse.json([]);
  }
}
