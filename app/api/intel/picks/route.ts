import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PICKS_FILE = path.join(process.cwd(), '..', '..', '..', 'DeltaV-persistent-workspace', 'intel', 'picks.json');

export async function GET() {
  try {
    if (fs.existsSync(PICKS_FILE)) {
      const data = JSON.parse(fs.readFileSync(PICKS_FILE, 'utf-8'));
      return NextResponse.json(data);
    }
    return NextResponse.json({ picks: [], updatedAt: '' });
  } catch {
    return NextResponse.json({ picks: [], updatedAt: '' });
  }
}
