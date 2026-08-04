import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "IntelHub",
  description: "IntelHub — a live intelligence dashboard tracking AI, crypto, macro, and infosec signals in real time.",
  openGraph: {
    title: "IntelHub · Delta V",
    description: "IntelHub — a live intelligence dashboard tracking AI, crypto, macro, and infosec signals in real time.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
