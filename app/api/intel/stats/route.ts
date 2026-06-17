import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(
  process.cwd(),
  '..',
  '..',
  'DeltaV-persistent-workspace',
  'intel',
  'intel.db'
);

const SIGNAL_LEVELS: Record<string, 'high' | 'medium' | 'low'> = {
  'arXiv cs.AI': 'high',
  'arXiv cs.LG': 'high',
  'The Batch': 'high',
  'Gwern Branwen': 'high',
  'Alignment Forum': 'high',
  'Vitalik Buterin': 'high',
  'Hugging Face Blog': 'high',
  'OpenAI Blog': 'high',
  'Anthropic Blog': 'high',
  'Y Combinator Blog': 'medium',
  'Hacker News Frontpage': 'medium',
  'Hacker News Best': 'medium',
  'NVIDIA Research': 'medium',
  'DeFiLlama Research': 'medium',
  'IPFS Blog': 'medium',
  'Protocol Labs Blog': 'medium',
  'Ollama Blog': 'medium',
  'Meta AI Blog': 'medium',
  'Y Combinator News': 'low',
  'Filecoin Blog': 'low',
};

export async function GET() {
  try {
    const db = new Database(DB_PATH, { readonly: true });

    const stmt = db.prepare(`
      SELECT source, last_run, items_added FROM source_stats
    `);

    const rows = stmt.all();

    const result = rows.map((row: any) => ({
      source: row.source,
      category: '',
      items_added: row.items_added || 0,
      last_run: row.last_run,
      signal_level: SIGNAL_LEVELS[row.source] || 'medium',
    }));

    db.close();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch intel stats' }, { status: 500 });
  }
}