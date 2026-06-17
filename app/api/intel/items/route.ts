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

function ensureSchema(db: any) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS intel_items (
      id TEXT PRIMARY KEY,
      title TEXT,
      url TEXT,
      source TEXT,
      category TEXT,
      published_at TEXT,
      summary TEXT,
      status TEXT DEFAULT 'raw',
      quality_score INTEGER DEFAULT 0,
      ingested_at TEXT
    )
  `);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source');

  try {
    const db = new Database(DB_PATH, { readonly: true });
    ensureSchema(db);

    let query = `SELECT * FROM intel_items ORDER BY ingested_at DESC LIMIT 100`;
    let params: any[] = [];

    if (source) {
      query = `SELECT * FROM intel_items WHERE source = ? ORDER BY ingested_at DESC LIMIT 100`;
      params = [source];
    }

    const items = db.prepare(query).all(...params);
    db.close();

    return NextResponse.json(Array.isArray(items) ? items : []);
  } catch (error) {
    console.error('Intel items error:', error);
    return NextResponse.json([]);
  }
}
