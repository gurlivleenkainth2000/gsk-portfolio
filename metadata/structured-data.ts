// metadata/structured-data.ts
//
// JSON-LD structured data, rendered as a <script type="application/ld+json">
// in app/layout.tsx so search engines can identify the site owner as an
// entity (helps connect "Gurlivleen Singh Kainth" searches to this site).
//
// Reference: https://schema.org/Person

import type { ProjectEntry } from "@/types/project";

import { siteConfig } from "@/config/site";

/** Reusable author/creator reference — the site owner as a Person node. */
const personRef = {
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
} as const;

/** schema.org Person describing the site owner. */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/og-home.jpg`,
  jobTitle: siteConfig.title,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "Victoria",
    addressCountry: "AU",
  },
  // "I am this person" links — the strongest signal tying the domain to the name.
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
  ],
};

/**
 * schema.org BreadcrumbList from an ordered list of crumbs. Pass paths
 * (e.g. "/projects"); the site URL is prefixed for the absolute `item`.
 *
 * Reference: https://schema.org/BreadcrumbList
 */
export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: `${siteConfig.url}${crumb.path}`,
  })),
});

/**
 * schema.org CreativeWork describing a single project case study. CreativeWork
 * (not SoftwareApplication) is used deliberately: the page is a case study, and
 * SoftwareApplication would flag missing required fields (offers / rating) in
 * Search Console without producing a richer result.
 *
 * Reference: https://schema.org/CreativeWork
 */
export const projectSchema = (project: ProjectEntry) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: project.name,
  headline: project.subtitle,
  description: project.overview,
  url: `${siteConfig.url}/projects/${project.slug}`,
  image: `${siteConfig.url}/og-home.jpg`,
  inLanguage: "en",
  keywords: project.tech.join(", "),
  about: project.domain,
  author: personRef,
  creator: personRef,
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
});
