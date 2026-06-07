// metadata/index.ts
//
// Barrel for route SEO. Import from "@/metadata". Each route file owns both its
// keyword list and its Next.js Metadata object.
//
// One file per concern:
//   - shared.ts        — baseUrl, ogImage, baseKeywords, dedupe
//   - root.ts          — homeKeywords + rootMetadata (site-wide, app/layout.tsx)
//   - about.ts         — aboutKeywords + aboutMetadata
//   - contact.ts       — contactKeywords + contactMetadata
//   - blog.ts          — blogKeywords + blogMetadata
//   - projects.ts      — projectsKeywords + projectKeywords() + projectsMetadata
//   - resume.ts        — resumeKeywords + resumeMetadata
//   - skills.ts        — skillsKeywords + skillsMetadata
//   - achievements.ts  — achievementsKeywords + achievementsMetadata
//
// Note: sitemap.ts / robots.ts are Next.js file-convention routes and live in
// app/, not here. Per-project keyword content lives on each ProjectEntry in
// data/projects.ts and is combined by projectKeywords() above.

export { baseUrl, ogImage, baseKeywords, dedupe } from "./shared";
export { homeKeywords, rootMetadata } from "./root";
export { aboutKeywords, aboutMetadata } from "./about";
export { contactKeywords, contactMetadata } from "./contact";
export { blogKeywords, blogMetadata } from "./blog";
export {
  projectsKeywords,
  projectKeywords,
  projectsMetadata,
} from "./projects";
export { resumeKeywords, resumeMetadata } from "./resume";
export { skillsKeywords, skillsMetadata } from "./skills";
export { achievementsKeywords, achievementsMetadata } from "./achievements";
export {
  personSchema,
  breadcrumbSchema,
  projectSchema,
} from "./structured-data";
