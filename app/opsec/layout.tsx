import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "OpSec",
  description: "Operational security guidance — hardened Linux, macOS, and Windows setups and a sovereign, state-of-the-art toolchain.",
  openGraph: {
    title: "OpSec · Delta V",
    description: "Operational security guidance — hardened Linux, macOS, and Windows setups and a sovereign, state-of-the-art toolchain.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
