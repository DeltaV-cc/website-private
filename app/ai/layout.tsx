import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI Engineering",
  description: "Frontier AI engineering — sovereign inference, autonomous agents, and model integration built with OpSec at the core.",
  openGraph: {
    title: "AI Engineering · Delta V",
    description: "Frontier AI engineering — sovereign inference, autonomous agents, and model integration built with OpSec at the core.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
