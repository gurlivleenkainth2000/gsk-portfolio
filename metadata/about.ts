// metadata/about.ts

import type { Metadata } from "next";

import { baseUrl, ogImage, baseKeywords, dedupe } from "./shared";

import { siteConfig } from "@/config/site";

export const aboutKeywords: string[] = dedupe(baseKeywords, [
  "About Gurlivleen Singh Kainth",
  "Backend Engineer Melbourne",
  "Full-Stack Engineer Melbourne",
  "Career Timeline",
  "Software Engineer Biography",
  "Punjab to Melbourne",
  "Swinburne University of Technology",
  "GNDEC",
  "Enterprise Integration",
  "Multi-tenant SaaS",
  "Google Cloud",
  "Firebase",
  "TypeScript",
]);

export const aboutMetadata: Metadata = {
  title: "About",
  keywords: aboutKeywords,
  description:
    "About Gurlivleen Singh Kainth — Melbourne-based Backend / Full-Stack Engineer with 4+ years across enterprise integration platforms, AI-driven analytics, and multi-tenant SaaS on Google Cloud, Firebase, and modern TypeScript stacks.",
  alternates: { canonical: `${baseUrl}/about` },
  openGraph: {
    type: "profile",
    url: `${baseUrl}/about`,
    title: `About | ${siteConfig.name}`,
    description:
      "The journey from Punjab to Melbourne — career timeline, education, and what I value most in engineering work.",
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage(),
        width: 1200,
        height: 630,
        alt: "About Gurlivleen Singh Kainth — Backend / Full-Stack Engineer in Melbourne",
      },
    ],
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `About | ${siteConfig.name}`,
    description:
      "Backend / Full-Stack Engineer based in Melbourne — 4+ years across enterprise integration, analytics, and SaaS.",
    images: [ogImage()],
  },
};
