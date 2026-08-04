import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Practical, reproducible tutorials for sovereign AI and Web3 tooling — from local models to on-chain payments.",
  openGraph: {
    title: "Tutorials · Delta V",
    description: "Practical, reproducible tutorials for sovereign AI and Web3 tooling — from local models to on-chain payments.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
