// metadata/blog.ts

import type { Metadata } from "next";

import { baseUrl, baseKeywords, dedupe } from "./shared";

import { siteConfig, asset } from "@/config/site";

export const blogKeywords: string[] = dedupe(baseKeywords, [
  "Engineering Blog",
  "Software Engineering Notes",
  "Backend Systems",
  "Full-Stack Engineering",
  "Cloud Engineering",
  "TypeScript",
  "Technical Writing",
  "Developer Blog",
]);

export const blogMetadata: Metadata = {
  title: "Blog",
  keywords: blogKeywords,
  description:
    "Notes and writing on backend systems, full-stack engineering, and the cloud / TypeScript stacks I work in — by Gurlivleen Singh Kainth.",
  alternates: { canonical: `${baseUrl}/blog` },
  openGraph: {
    type: "website",
    url: `${baseUrl}/blog`,
    title: `Blog | ${siteConfig.name}`,
    description:
      "Engineering notes and writing — backend systems, full-stack, and cloud.",
    siteName: siteConfig.name,
    images: [
      {
        url: asset("/og/blog.png"),
        width: 1200,
        height: 630,
        alt: "Blog — Gurlivleen Singh Kainth",
      },
    ],
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `Blog | ${siteConfig.name}`,
    description:
      "Engineering notes and writing — backend systems, full-stack, and cloud.",
    images: [asset("/og/blog.png")],
  },
};
