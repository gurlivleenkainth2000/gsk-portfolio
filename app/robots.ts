// app/robots.ts
//
// Generates /robots.txt at build time. Defines crawl rules for search engines
// and points to the dynamic sitemap.
//
// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
