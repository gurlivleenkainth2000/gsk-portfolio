import type { ExploreCardItem } from "@/types/explore-card";

import { siteConfig } from "@/config/site";
import {
  GithubIcon,
  WorkIcon,
  DescriptionIcon,
  PsychologyIcon,
  EmojiEventsIcon,
  ArticleIcon,
  LinkedinIcon,
} from "@/components/icons";

/**
 * Pre-built ExploreCardItem definitions for the portfolio's core destinations.
 *
 * Import the cards you want, pass them as an array to <ExploreGrid items={...}>.
 * Mix freely with inline objects and spread-overrides for page-specific tweaks.
 *
 * @example  Use presets as-is
 *   <ExploreGrid items={[projectsCard, resumeCard, githubCard]} />
 *
 * @example  Override a preset field for one page (spread + override)
 *   <ExploreGrid items={[
 *     projectsCard,
 *     { ...resumeCard, description: "Different pitch for this page" },
 *   ]} />
 *
 * @example  Mix presets with page-specific cards
 *   <ExploreGrid items={[
 *     projectsCard,
 *     { label: "Next in series", href: "/projects/foo", description: "..." },
 *   ]} />
 */

export const projectsCard: ExploreCardItem = {
  label: "Projects",
  href: "/projects",
  description: "Deep dives on production systems I architected and shipped.",
  icon: <WorkIcon fontSize="small" />,
};

export const resumeCard: ExploreCardItem = {
  label: "Resume",
  href: "/resume",
  description: "The formal one-pager — outcome-focused, recruiter-friendly.",
  icon: <DescriptionIcon fontSize="small" />,
};

export const skillsCard: ExploreCardItem = {
  label: "Skills",
  href: "/skills",
  description: "Languages, clouds, and tooling I work in day-to-day.",
  icon: <PsychologyIcon fontSize="small" />,
};

export const achievementsCard: ExploreCardItem = {
  label: "Achievements",
  href: "/achievements",
  description: "Recognition, certifications, and academic standouts.",
  icon: <EmojiEventsIcon fontSize="small" />,
};

export const blogCard: ExploreCardItem = {
  label: "Blog",
  href: "/blog",
  description: "Writing on patterns, systems, and lessons from production.",
  icon: <ArticleIcon fontSize="small" />,
};

export const githubCard: ExploreCardItem = {
  label: "GitHub",
  href: siteConfig.links.github,
  description: "Public code, experiments, and homelab projects.",
  icon: <GithubIcon size={18} />,
  external: true,
};

export const linkedinCard: ExploreCardItem = {
  label: "LinkedIn",
  href: siteConfig.links.linkedin,
  description: "Career timeline, endorsements, and professional network.",
  icon: <LinkedinIcon fontSize="small" />,
  external: true,
};
