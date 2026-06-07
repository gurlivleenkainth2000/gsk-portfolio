import type { Metadata } from "next";

import { projectsMetadata, breadcrumbSchema } from "@/metadata";
import { title, subtitle } from "@/components/primitives";
import { projects } from "@/data/projects";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = projectsMetadata;

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <header>
        <h1 className={title({ size: "md" })}>Projects</h1>
        <p className={subtitle()}>
          Selected engineering work — client platforms, capstones, and academic
          builds.
        </p>
      </header>

      <ProjectsGrid items={projects} />
    </div>
  );
}
