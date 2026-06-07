// config/metadata/index.ts
//
// Barrel for route metadata. Import from "@/config/metadata".
//
// One file per concern:
//   - shared.ts        — baseUrl + ogImage() helper
//   - root.ts          — rootMetadata (site-wide defaults, app/layout.tsx)
//   - about.ts         — aboutMetadata
//   - blog.ts          — blogMetadata
//   - projects.ts      — projectsMetadata (the /projects index)
//   - resume.ts        — resumeMetadata
//   - skills.ts        — skillsMetadata
//   - achievements.ts  — achievementsMetadata
//
// Per-project detail pages (/projects/[slug]) build their metadata at request
// time in the route's own generateMetadata().

export { baseUrl, ogImage } from "./shared";
export { rootMetadata } from "./root";
export { aboutMetadata } from "./about";
export { blogMetadata } from "./blog";
export { projectsMetadata } from "./projects";
export { resumeMetadata } from "./resume";
export { skillsMetadata } from "./skills";
export { achievementsMetadata } from "./achievements";
