// config/metadata/skills.ts

import type { Metadata } from "next";

import { baseUrl, ogImage } from "./shared";

import { siteConfig } from "@/config/site";
import { skillsKeywords } from "@/data/keywords";

export const skillsMetadata: Metadata = {
  title: "Skills",
  keywords: skillsKeywords,
  description:
    "Technical skills of Gurlivleen Singh Kainth — languages, frameworks, and tooling used day-to-day across backend, full-stack, mobile, cloud, and DevOps work.",
  alternates: { canonical: `${baseUrl}/skills` },
  openGraph: {
    type: "website",
    url: `${baseUrl}/skills`,
    title: `Skills | ${siteConfig.name}`,
    description:
      "Languages, frameworks, and tooling — grouped by area, newest at the top of each list.",
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage(),
        width: 1200,
        height: 630,
        alt: "Technical Skills — Gurlivleen Singh Kainth",
      },
    ],
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `Skills | ${siteConfig.name}`,
    description:
      "Languages, frameworks, and tooling — grouped by area, newest at the top of each list.",
    images: [ogImage()],
  },
};
