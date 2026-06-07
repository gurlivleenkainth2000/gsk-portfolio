// metadata/projects.ts
//
// Keywords + metadata for the /projects index, plus the keyword builder for
// each /projects/[slug] detail page (used by that route's generateMetadata).

import type { Metadata } from "next";

import { baseUrl, ogImage, baseKeywords, dedupe } from "./shared";

import { siteConfig } from "@/config/site";

/** /projects index page. */
export const projectsKeywords: string[] = dedupe(baseKeywords, [
  "Software Engineering Projects",
  "Portfolio Projects",
  "Case Studies",
  // Project names
  "Coupaso",
  "Hero Ecotech",
  "Mentcape",
  "Finlo",
  "SUT1 Replay Server",
  "APK Guardian",
  "OBE Platform",
  // Domains
  "Cashback Platform",
  "Fintech",
  "Enterprise ERP Integration",
  "SAP Integration",
  "Coaching SaaS",
  "Healthcare SaaS",
  "Parking Management",
  "Operations SaaS",
  "Real-time Systems",
  "Telemetry",
  "Machine Learning",
  "Android Malware Detection",
  "EdTech",
  // Cross-project tech
  "Next.js",
  "Angular",
  "Flutter",
  "Firebase",
  "Google Cloud",
  "Node.js",
  "Python",
  "FastAPI",
  "TypeScript",
]);

/**
 * Build the keyword list for an individual project detail page from its own
 * fields, layered on the shared base. Order: base → auto-derived (name,
 * domain, tech) → curated `project.keywords` → generic tail. Takes the minimal
 * shape needed so this stays decoupled from the full `ProjectEntry` type.
 */
export const projectKeywords = (project: {
  name: string;
  tech: string[];
  domain: string;
  keywords?: string[];
}): string[] =>
  dedupe(baseKeywords, [
    project.name,
    `${project.name} case study`,
    `${project.name} project`,
    // `domain` may be compound, e.g. "Cashback / fintech" — split into parts.
    ...project.domain.split("/").map((part) => part.trim()),
    ...project.tech,
    ...(project.keywords ?? []),
    "Software Engineering Project",
    "Case Study",
  ]);

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
