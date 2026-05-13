import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./smooth-scroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deltav.cc"),
  title: {
    default: "Delta V - Accelerating Adoption of Decentralized Technologies",
    template: "%s - Delta V",
  },
  description:
    "Delta V delivers tech foundations, strategic growth, cybersecurity, and research services built for a decentralized world.",
  keywords: [
    "decentralized technology",
    "Web3",
    "cybersecurity",
    "IT solutions",
    "blockchain",
    "crypto security",
    "OSINT",
    "AI security",
    "market research",
    "Delta V",
  ],
  authors: [{ name: "Delta V" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/favicon.svg",
    apple: "/assets/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Delta V",
    title: "Delta V - Accelerating Adoption of Decentralized Technologies",
    description:
      "Tech foundations, strategic growth, cybersecurity, and research services built for a decentralized world.",
    url: "https://deltav.cc/",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Delta V - Decentralized Technology Services",
    description:
      "Tech foundations, strategic growth, cybersecurity, and research services built for a decentralized world.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "CH",
    "geo.placename": "Switzerland",
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
      className={`${fraunces.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
