import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Analysis and field notes on AI, Web3, security, and OpSec from the Delta V team.",
  openGraph: {
    title: "Blog · Delta V",
    description: "Analysis and field notes on AI, Web3, security, and OpSec from the Delta V team.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
