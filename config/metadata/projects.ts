// config/metadata/projects.ts

import type { Metadata } from "next";

import { baseUrl, ogImage } from "./shared";

import { siteConfig } from "@/config/site";
import { projectsKeywords } from "@/data/keywords";

export const projectsMetadata: Metadata = {
  title: "Projects",
  keywords: projectsKeywords,
  description:
    "Selected engineering projects by Gurlivleen Singh Kainth — enterprise integration platforms, AI-driven analytics products, multi-tenant SaaS, and a distributed Go automation system.",
  alternates: { canonical: `${baseUrl}/projects` },
  openGraph: {
    type: "website",
    url: `${baseUrl}/projects`,
    title: `Projects | ${siteConfig.name}`,
    description:
      "Architectural ownership across enterprise integration, analytics, SaaS, and Go automation systems.",
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage(),
        width: 1200,
        height: 630,
        alt: "Projects — Gurlivleen Singh Kainth",
      },
    ],
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `Projects | ${siteConfig.name}`,
    description:
      "Architectural ownership across enterprise integration, analytics, SaaS, and Go automation systems.",
    images: [ogImage()],
  },
};
