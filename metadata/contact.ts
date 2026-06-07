// metadata/contact.ts

import type { Metadata } from "next";

import { baseUrl, ogImage, baseKeywords, dedupe } from "./shared";

import { siteConfig } from "@/config/site";

export const contactKeywords: string[] = dedupe(baseKeywords, [
  "Contact Gurlivleen Singh Kainth",
  "Hire Software Engineer Melbourne",
  "Hire Full-Stack Engineer Melbourne",
  "Hire Backend Engineer Melbourne",
  "Get in touch",
  "Software Engineer Contact",
  "Freelance Developer Melbourne",
  "Next.js Developer for hire",
  "Available for work",
  "Melbourne",
]);

export const contactMetadata: Metadata = {
  title: "Contact",
  keywords: contactKeywords,
  description:
    "Get in touch with Gurlivleen Singh Kainth — Melbourne-based Backend / Full-Stack Engineer. Reach out about roles, collaborations, or freelance work.",
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    type: "website",
    url: `${baseUrl}/contact`,
    title: `Contact | ${siteConfig.name}`,
    description:
      "Have a role, a project, or an idea worth building? Send a message and I'll get back to you.",
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage(),
        width: 1200,
        height: 630,
        alt: "Contact Gurlivleen Singh Kainth — Backend / Full-Stack Engineer in Melbourne",
      },
    ],
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `Contact | ${siteConfig.name}`,
    description:
      "Get in touch — roles, collaborations, or freelance work. Melbourne-based Backend / Full-Stack Engineer.",
    images: [ogImage()],
  },
};
