// config/page-metadata.ts
//
// Per-route Metadata objects. The root layout exports `rootMetadata` (see
// `config/root-metadata.ts`); each page below inherits and overrides only the
// fields that should differ. The `title` field uses the string form so the
// root `title.template` (`%s | Gurlivleen Singh Kainth`) is applied
// automatically.
//
// Reference: https://nextjs.org/docs/app/getting-started/metadata-and-og-images

import type { Metadata } from "next";

import { siteConfig } from "./site";

import {
  aboutKeywords,
  blogKeywords,
  projectsKeywords,
  resumeKeywords,
  skillsKeywords,
  achievementsKeywords,
} from "@/data/keywords";

const baseUrl = siteConfig.url;

const ogImage = (path = "/og-home.jpg") => `${baseUrl}${path}`;

// ---------------------------------------------------------------- /about ----
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

// ----------------------------------------------------------------- /blog ----
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

// ------------------------------------------------------------- /projects ----
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

// --------------------------------------------------------------- /resume ----
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

// --------------------------------------------------------------- /skills ----
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

// --------------------------------------------------------- /achievements ----
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
