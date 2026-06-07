import type { ProjectLink, ProjectLinkType } from "@/types/project";
import type { ReactNode } from "react";

import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import LanguageIcon from "@mui/icons-material/Language";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import DescriptionIcon from "@mui/icons-material/Description";
import LockIcon from "@mui/icons-material/Lock";

import { GithubIcon } from "@/components/icons";

const ICONS: Record<ProjectLinkType, ReactNode> = {
  website: <LanguageIcon style={{ fontSize: 16 }} />,
  playStore: <AndroidIcon style={{ fontSize: 16 }} />,
  appStore: <AppleIcon style={{ fontSize: 16 }} />,
  github: <GithubIcon size={15} />,
  caseStudy: <DescriptionIcon style={{ fontSize: 16 }} />,
};

/**
 * Renders a project's external links as flat pills that sit alongside the tech
 * chips. Links flagged `private` render as a muted lock chip instead of a link,
 * so we never show a fake or broken URL.
 */
export function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => {
        if (link.private || !link.url) {
          return (
            <Chip
              key={link.label}
              size="sm"
              startContent={<LockIcon style={{ fontSize: 13 }} />}
              variant="flat"
            >
              {link.label} (private)
            </Chip>
          );
        }

        return (
          <Link
            key={link.label}
            isExternal
            className="inline-flex items-center gap-1.5 rounded-full bg-default-100 px-3 py-1 text-sm text-foreground/80 transition-colors hover:bg-default-200 hover:text-primary"
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
