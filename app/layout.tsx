import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "./components/MainLayout";
import DevAnnotations from "./components/DevAnnotations";
import { SITE_URL } from "../lib/site";
import { THEME_INIT_SCRIPT } from "../lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Delta V — Sovereign AI & Web3 Engineering",
    template: "%s · Delta V",
  },
  description: "We operate at the frontier of AI and Web3 with OpSec as our core principle — we build, integrate, and upskill with sovereignty in mind.",
  openGraph: {
    title: "Delta V — Sovereign AI & Web3 Engineering",
    description: "We operate at the frontier of AI and Web3 with OpSec as our core principle.",
    url: "https://deltav.cc",
    siteName: "Delta V",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // data-theme is written by the script below before React ever sees the
      // document, so the server markup (no attribute) is expected to differ.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
        <MainLayout>{children}</MainLayout>
        <DevAnnotations />
      </body>
    </html>
  );
}
