import type { ProjectLink, ProjectLinkType } from "@/types/project";
import type { ReactNode } from "react";

import { Link } from "@heroui/link";

import {
  GithubIcon,
  LinkedinIcon,
  LanguageIcon,
  AndroidIcon,
  AppleIcon,
  DescriptionIcon,
  LockIcon,
} from "@/components/icons";

const ICONS: Record<ProjectLinkType, ReactNode> = {
  website: <LanguageIcon style={{ fontSize: 16 }} />,
  playStore: <AndroidIcon style={{ fontSize: 16 }} />,
  appStore: <AppleIcon style={{ fontSize: 16 }} />,
  github: <GithubIcon size={15} />,
  caseStudy: <DescriptionIcon style={{ fontSize: 16 }} />,
  linkedin: <LinkedinIcon size={15} />,
};

/** Shared pill styling so links and the source note read as one consistent set. */
export const PILL_CLASS =
  "inline-flex items-center gap-1.5 rounded-full bg-default-100 px-3 py-1 text-sm text-foreground/80";

/**
 * Renders a project's external links as flat rounded pills. Links flagged
 * `private` render as a muted lock pill instead of a link, so we never show a
 * fake or broken URL. The same `PILL_CLASS` is reused for the source-note pill
 * in the hero, so the whole "links & status" row is one consistent style.
 */
export function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => {
        if (link.private || !link.url) {
          return (
            <span key={link.label} className={PILL_CLASS}>
              <LockIcon style={{ fontSize: 14 }} />
              {link.label} (private)
            </span>
          );
        }

        return (
          <Link
            key={link.label}
            isExternal
            className={`${PILL_CLASS} transition-colors hover:bg-default-200 hover:text-primary`}
            href={link.url}
          >
            {ICONS[link.type]}
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
