import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Delta V for sovereign AI and Web3 engineering, security advisory, and training.",
  openGraph: {
    title: "Contact · Delta V",
    description: "Get in touch with Delta V for sovereign AI and Web3 engineering, security advisory, and training.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
