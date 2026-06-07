// data/keywords/achievements.ts
//
// Keywords for the /achievements page.

import { baseKeywords, dedupe } from "./shared";

export const achievementsKeywords: string[] = dedupe(baseKeywords, [
  "Achievements",
  "Awards",
  "Academic Highlights",
  "Swinburne Capstone",
  "High Distinction",
  "HD 90/100",
  "Engineering Recognition",
  "Professional Highlights",
]);
