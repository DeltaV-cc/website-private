import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Forge",
  description: "Forge — Delta V's hands-on program to build, integrate, and upskill in sovereign AI and Web3 engineering.",
  openGraph: {
    title: "Forge · Delta V",
    description: "Forge — Delta V's hands-on program to build, integrate, and upskill in sovereign AI and Web3 engineering.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
