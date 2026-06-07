import type { ProjectLink, ProjectLinkType } from "@/types/project";
import type { ExploreCardItem } from "@/types/explore-card";
import type { ReactNode } from "react";

import {
  GithubIcon,
  LinkedinIcon,
  LanguageIcon,
  AndroidIcon,
  AppleIcon,
  DescriptionIcon,
} from "@/components/icons";
import { ExploreGrid } from "@/components/explore-card/grid";

const ICONS: Record<ProjectLinkType, ReactNode> = {
  website: <LanguageIcon fontSize="small" />,
  playStore: <AndroidIcon fontSize="small" />,
  appStore: <AppleIcon fontSize="small" />,
  github: <GithubIcon size={18} />,
  caseStudy: <DescriptionIcon fontSize="small" />,
  linkedin: <LinkedinIcon size={18} />,
};

/**
 * "External links" — renders a project's public destinations (live sites,
 * repos, LinkedIn posts) as a single-column explore-card list. Private /
 * url-less links are skipped here; the "source is private" note in the hero
 * already signals those.
 */
export function ProjectExternalLinks({ links }: { links: ProjectLink[] }) {
  const items: ExploreCardItem[] = links
    .filter((link): link is ProjectLink & { url: string } =>
      Boolean(link.url && !link.private),
    )
    .map((link) => ({
      label: link.label,
      href: link.url,
      description: link.description,
      icon: ICONS[link.type],
      external: true,
    }));

  if (items.length === 0) return null;

  return <ExploreGrid className="grid grid-cols-1 gap-3" items={items} />;
}
