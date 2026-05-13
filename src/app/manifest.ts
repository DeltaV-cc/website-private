import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Delta V",
    short_name: "Delta V",
    description:
      "Swiss-based studio delivering tech foundations, strategic growth, cybersecurity, and research services for decentralized technologies.",
    start_url: "/",
    display: "standalone",
    background_color: "#07101a",
    theme_color: "#07101a",
    lang: "en",
    categories: ["business", "technology", "security"],
    icons: [
      {
        src: "/assets/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
