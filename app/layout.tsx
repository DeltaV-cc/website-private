import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "./components/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delta V — Sovereign AI & Web3 Engineering",
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
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#ededed] font-sans">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
