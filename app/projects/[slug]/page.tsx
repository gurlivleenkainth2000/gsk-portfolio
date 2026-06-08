import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { siteConfig, asset } from "@/config/site";
import { projects, getProjectBySlug } from "@/data/projects";
import { projectKeywords, projectSchema, breadcrumbSchema } from "@/metadata";
import { ProjectDetail } from "@/components/projects/project-detail";
import { JsonLd } from "@/components/json-ld";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const url = `${siteConfig.url}/projects/${slug}`;
  const ogImage = asset(`/og/projects/${slug}.png`);

  return {
    title: project.name,
    description: project.subtitle,
    keywords: projectKeywords(project),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${project.name} | ${siteConfig.name}`,
      description: project.overview,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.name} — ${siteConfig.name}`,
        },
      ],
      locale: "en_AU",
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: `${project.name} | ${siteConfig.name}`,
      description: project.subtitle,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : undefined;
  const next = idx < projects.length - 1 ? projects[idx + 1] : undefined;

  return (
    <>
      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.name, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectDetail next={next} prev={prev} project={project} />
    </>
  );
}
