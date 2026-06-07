// config/metadata/shared.ts
//
// Shared helpers for the per-route Metadata objects in this folder. Each page
// file inherits the root layout's metadata (see ./root) and overrides only the
// fields that differ.
//
// Reference: https://nextjs.org/docs/app/getting-started/metadata-and-og-images

import { siteConfig } from "@/config/site";

export const baseUrl = siteConfig.url;

/** Absolute URL for an OG / Twitter image asset (defaults to the home banner). */
export const ogImage = (path = "/og-home.jpg"): string => `${baseUrl}${path}`;
