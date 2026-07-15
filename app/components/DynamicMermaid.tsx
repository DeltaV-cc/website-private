'use client';

import dynamic from 'next/dynamic';

const MermaidClient = dynamic(() => import('./Mermaid'), { ssr: false });

interface MermaidProps {
  chart: string;
  caption?: string;
  className?: string;
}

export default function DynamicMermaid(props: MermaidProps) {
  return <MermaidClient {...props} />;
}
