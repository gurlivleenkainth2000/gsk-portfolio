// config/metadata/achievements.ts

import type { Metadata } from "next";

import { baseUrl, ogImage } from "./shared";

import { siteConfig } from "@/config/site";
import { achievementsKeywords } from "@/data/keywords";

export const achievementsMetadata: Metadata = {
  title: "Achievements",
  keywords: achievementsKeywords,
  description:
    "Selected academic and professional highlights of Gurlivleen Singh Kainth — including the Swinburne capstone (HD, 90/100) and engineering recognition.",
  alternates: { canonical: `${baseUrl}/achievements` },
  openGraph: {
    type: "website",
    url: `${baseUrl}/achievements`,
    title: `Achievements | ${siteConfig.name}`,
    description:
      "Academic and professional standouts — the work I'd point to first if asked what I've shipped.",
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage(),
        width: 1200,
        height: 630,
        alt: "Achievements & Standouts — Gurlivleen Singh Kainth",
      },
    ],
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `Achievements | ${siteConfig.name}`,
    description:
      "Academic and professional standouts — the work I'd point to first if asked what I've shipped.",
    images: [ogImage()],
  },
};
