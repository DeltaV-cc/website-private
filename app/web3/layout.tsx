import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Web3 Engineering",
  description: "Web3 engineering and advisory — smart-contract security, self-custody, and on-chain integration with sovereignty in mind.",
  openGraph: {
    title: "Web3 Engineering · Delta V",
    description: "Web3 engineering and advisory — smart-contract security, self-custody, and on-chain integration with sovereignty in mind.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
