// config/metadata/blog.ts

import type { Metadata } from "next";

import { baseUrl, ogImage } from "./shared";

import { siteConfig } from "@/config/site";
import { blogKeywords } from "@/data/keywords";

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
        url: ogImage(),
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
    images: [ogImage()],
  },
};
