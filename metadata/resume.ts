// metadata/resume.ts

import type { Metadata } from "next";

import { baseUrl, ogImage, baseKeywords, dedupe } from "./shared";

import { siteConfig } from "@/config/site";

export const resumeKeywords: string[] = dedupe(baseKeywords, [
  "Resume",
  "CV",
  "Gurlivleen Singh Kainth Resume",
  "Backend Engineer Resume",
  "Full-Stack Engineer CV",
  "Software Engineer Resume Melbourne",
  "Download Resume",
  "Enterprise Integration",
  "Multi-tenant SaaS",
  "Google Cloud",
  "TypeScript",
]);

export const resumeMetadata: Metadata = {
  title: "Resume",
  keywords: resumeKeywords,
  description:
    "Two-page resume of Gurlivleen Singh Kainth — Backend / Full-Stack Engineer. 4+ years across enterprise integration platforms, AI-driven analytics, and multi-tenant SaaS.",
  alternates: { canonical: `${baseUrl}/resume` },
  openGraph: {
    type: "website",
    url: `${baseUrl}/resume`,
    title: `Resume | ${siteConfig.name}`,
    description:
      "Download or view the two-page resume — backend / full-stack engineering experience.",
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage(),
        width: 1200,
        height: 630,
        alt: "Resume — Gurlivleen Singh Kainth",
      },
    ],
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `Resume | ${siteConfig.name}`,
    description:
      "Download or view the two-page resume — backend / full-stack engineering experience.",
    images: [ogImage()],
  },
};
