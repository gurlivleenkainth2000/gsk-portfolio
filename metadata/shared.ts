// metadata/shared.ts
//
// Shared building blocks for the per-route files in this folder. Each route
// file owns both its keyword list and its Next.js Metadata object, built from
// the helpers here.
//
// Reference: https://nextjs.org/docs/app/getting-started/metadata-and-og-images

import { siteConfig } from "@/config/site";

export const baseUrl = siteConfig.url;

/** Absolute URL for an OG / Twitter image asset (defaults to the home banner). */
export const ogImage = (path = "/og-home.jpg"): string => `${baseUrl}${path}`;

/**
 * Core identity / role / location keywords reused on every route. Next.js
 * `keywords` does NOT merge across segments — a child route's array fully
 * replaces the inherited root list — so each route starts from this base and
 * layers on its own terms via `dedupe`.
 */
export const baseKeywords: string[] = [
  "Gurlivleen",
  "Kainth",
  "Gurlivleen Singh Kainth",
  "Gurlivleen Kainth Portfolio",
  "Gurlivleen Melbourne",
  "Software Engineer",
  "Software Developer",
  "Full Stack Developer",
  "Backend Developer",
  "Melbourne",
  "Australia",
  "Portfolio",
];

/** Flatten any number of keyword lists and drop duplicates, preserving order. */
export const dedupe = (...lists: string[][]): string[] =>
  Array.from(new Set(lists.flat()));
