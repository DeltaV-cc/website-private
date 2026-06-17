import { notFound } from 'next/navigation';

interface IntelItem {
  title: string;
  url: string;
  source: string;
  summary: string;
  ingested_at: string;
}

async function getItemsForSource(sourceSlug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/intel/raw-items`, {
      cache: 'no-store'
    });
    const items: IntelItem[] = await res.json();

    // Simple slug matching (can be improved later)
    const filtered = items.filter(item => 
      item.source.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === sourceSlug
    );

    return filtered;
  } catch (error) {
    return [];
  }
}

export default async function SourcePage({ params }: { params: { source: string } }) {
  const items = await getItemsForSource(params.source);

  if (!items.length) {
    return notFound();
  }

  const sourceName = items[0]?.source || params.source;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">{sourceName}</h1>
          <p className="text-white/50 mt-2">Recent entries from this source</p>
        </div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="border border-white/10 rounded-2xl p-6 bg-white/5">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-lg hover:underline"
              >
                {item.title}
              </a>
              <div className="text-white/60 mt-3 text-[15px]">
                {item.summary}
              </div>
              <div className="text-xs text-white/40 mt-4">
                {new Date(item.ingested_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
