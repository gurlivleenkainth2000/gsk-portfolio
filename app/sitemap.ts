// app/sitemap.ts
//
// Generates /sitemap.xml at build time. Add new public routes to the
// `routes` array below — `lastModified` is set per build, so Google sees a
// fresh timestamp on every deploy.
//
// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const routes: Route[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  // { path: "/blog", changeFrequency: "monthly", priority: 0.6 }, // hidden until the page has real content
  { path: "/resume", changeFrequency: "yearly", priority: 0.7 },
  { path: "/skills", changeFrequency: "monthly", priority: 0.6 },
  { path: "/achievements", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  ...projects.map((p) => ({
    path: `/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
