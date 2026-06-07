import type { ProjectEntry } from "@/types/project";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import NextLink from "next/link";

import { StarIcon } from "@/components/icons";

const statusColor = {
  live: "success",
  archived: "default",
} as const;

/**
 * Index card for a single project. Shows monogram, name, subtitle,
 * business-model + status chips, and a tech preview. Links to the detail page.
 * Featured projects get a primary border accent + a "Featured" chip.
 */
export function ProjectCard({ project }: { project: ProjectEntry }) {
  const { slug, name, monogram, subtitle, businessModel, status, tech } =
    project;
  const preview = tech.slice(0, 3);
  const extra = tech.length - preview.length;

  return (
    <NextLink className="block group h-full" href={`/projects/${slug}`}>
      <Card
        className={`h-full border transition-colors ${
          project.featured
            ? "border-primary/50"
            : "border-divider hover:border-primary/40"
        }`}
        shadow="none"
      >
        <CardBody className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold">
              {monogram}
            </span>
            {project.featured && (
              <Chip
                color="primary"
                size="sm"
                startContent={<StarIcon style={{ fontSize: 14 }} />}
                variant="flat"
              >
                Featured
              </Chip>
            )}
          </div>

          <div>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </p>
            <p className="mt-0.5 text-sm text-foreground/55 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.category !== "academic" && (
              <Chip size="sm" variant="flat">
                {businessModel}
              </Chip>
            )}
            <Chip
              className="capitalize"
              color={statusColor[status]}
              size="sm"
              variant="flat"
            >
              {status}
            </Chip>
            {project.category === "academic" && (
              <Chip color="warning" size="sm" variant="flat">
                Academic
              </Chip>
            )}
          </div>

          <p className="text-xs text-foreground/45">
            {preview.join(" · ")}
            {extra > 0 ? ` · +${extra}` : ""}
          </p>
        </CardBody>
      </Card>
    </NextLink>
  );
}
