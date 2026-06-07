import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { projects, getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/projects/project-detail";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const url = `${siteConfig.url}/projects/${slug}`;
  const ogImage = `${siteConfig.url}/og-home.jpg`;

  return {
    title: project.name,
    description: project.subtitle,
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

  return <ProjectDetail next={next} prev={prev} project={project} />;
}
