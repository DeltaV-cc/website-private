/* ================================================================
   IntelHub — Shared types
   ================================================================ */

export interface Item {
  title: string;
  url: string;
  source: string;
  published_at: string;
  summary: string;
  tag?: string;
}

export interface PatentsData {
  header: { uspto: string; wipo: string; yoy: string; utility: string; design: string; filed: string };
  topHolders: { name: string; country: string; count: string; change: string; dir: string; mcap: string }[];
  techAreas: { name: string; pct: string }[];
  hotAreas: { name: string; sector: string; trend: string }[];
  keyLabs: { name: string; country: string; focus: string; papers: string }[];
  marketMovers: { name: string; value: string; change: string; dir: string }[];
}

export interface IntelData {
  items: Item[];
  loading: boolean;
  picks: any;
  patents: PatentsData | null;
  dd: Record<string, any>;
  dd2: Record<string, any>;
  forex: any;
  watchlist: any[];
}

export interface Category {
  id: string;
  label: string;
  color: string;
  accent: string;
  bg: string;
  kw: string[];
  items: Item[];
  count: number;
}

export interface KevEntry {
  cve: string;
  product: string;
  vendor: string;
  name: string;
  dateAdded: string;
  dueDate: string;
}

export interface CveEntry {
  id: string;
  severity: string;
  score: number;
  description: string;
  published: string;
}

export interface BreachEntry {
  name: string;
  domain: string;
  date: string;
  count: number;
  data: string;
}
