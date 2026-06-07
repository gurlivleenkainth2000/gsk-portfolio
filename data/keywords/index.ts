// data/keywords/index.ts
//
// Barrel for keyword lists. Import from "@/data/keywords" (this file) or from
// a specific module (e.g. "@/data/keywords/projects") — both resolve here.
//
// One file per concern:
//   - shared.ts   — baseKeywords + dedupe (reused by every route)
//   - home.ts     — homeKeywords (site root, inherited by un-overridden routes)
//   - projects.ts — projectsKeywords + projectKeywords (index + [slug])
//
// Future routes (about, blog, resume, skills, achievements) get their own
// files here and are re-exported below.

export { baseKeywords, dedupe } from "./shared";
export { homeKeywords } from "./home";
export { projectsKeywords, projectKeywords } from "./projects";
