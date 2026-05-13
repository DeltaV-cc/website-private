import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/amaranth/"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Bytespider",
          "Amazonbot",
          "CCBot",
          "Meta-ExternalAgent",
        ],
        allow: "/",
        disallow: ["/amaranth/"],
      },
    ],
    sitemap: "https://deltav.cc/sitemap.xml",
    host: "https://deltav.cc",
  };
}
