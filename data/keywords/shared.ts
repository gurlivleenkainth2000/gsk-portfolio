// data/keywords/shared.ts
//
// Shared building blocks for every route's keyword list.
//
// Next.js `keywords` does NOT merge across route segments — a child page's
// array fully replaces the inherited root list. So each route starts from
// `baseKeywords` (core identity + role + location) and layers on its own
// terms, then runs the result through `dedupe`.

/** Core identity / role / location terms reused on every page. */
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
