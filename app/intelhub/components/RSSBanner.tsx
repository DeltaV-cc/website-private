'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IntelItem {
  source: string;
  category: string;
  published_at: string;
}

interface RSSBannerProps {
  activeSource?: string | null;
}

export default function RSSBanner({ activeSource }: RSSBannerProps) {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const res = await fetch('/api/intel/raw-items');
        const data: IntelItem[] = await res.json();

        if (Array.isArray(data)) {
          // Get unique sources with count
          const sourceMap = new Map();
          
          data.forEach(item => {
            if (!sourceMap.has(item.source)) {
              sourceMap.set(item.source, {
                source: item.source,
                category: item.category || 'General',
                items_added: 0,
                signal_level: 'medium'
              });
            }
            const current = sourceMap.get(item.source);
            current.items_added += 1;
          });

          setSources(Array.from(sourceMap.values()));
        }
      } catch (error) {
        console.error('Failed to fetch sources');
        setSources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  const getColor = (level: string) => {
    if (level === 'high') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20';
    if (level === 'medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/40 hover:bg-amber-500/20';
    return 'bg-orange-500/10 text-orange-400 border-orange-500/40 hover:bg-orange-500/20';
  };

  const handleClick = (source: string) => {
    const slug = source.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    router.push(`/intelhub/${slug}`);
  };

  if (loading) {
    return <div className="h-14 border-b border-white/10 bg-black/40" />;
  }

  if (sources.length === 0) {
    return (
      <div className="border-b border-white/10 bg-black/40 py-3 px-6 text-sm text-white/50">
        No sources loaded yet. Ingestion running...
      </div>
    );
  }

  return (
    <div className="border-b border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex flex-wrap gap-2">
          {sources.map((source, index) => (
            <button
              key={index}
              onClick={() => handleClick(source.source)}
              className={`
                px-4 py-1.5 rounded-full border text-sm transition-all flex items-center gap-2
                ${activeSource === source.source ? 'border-white bg-white/10' : getColor(source.signal_level)}
              `}
            >
              <span className="font-medium">{source.source}</span>
              <span className="text-xs opacity-60">+{source.items_added}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
