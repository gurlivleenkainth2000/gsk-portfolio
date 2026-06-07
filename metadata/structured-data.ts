// metadata/structured-data.ts
//
// JSON-LD structured data, rendered as a <script type="application/ld+json">
// in app/layout.tsx so search engines can identify the site owner as an
// entity (helps connect "Gurlivleen Singh Kainth" searches to this site).
//
// Reference: https://schema.org/Person

import { siteConfig } from "@/config/site";

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
