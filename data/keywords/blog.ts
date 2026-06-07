// data/keywords/blog.ts
//
// Keywords for the /blog page.

import { baseKeywords, dedupe } from "./shared";

export const blogKeywords: string[] = dedupe(baseKeywords, [
  "Engineering Blog",
  "Software Engineering Notes",
  "Backend Systems",
  "Full-Stack Engineering",
  "Cloud Engineering",
  "TypeScript",
  "Technical Writing",
  "Developer Blog",
]);
