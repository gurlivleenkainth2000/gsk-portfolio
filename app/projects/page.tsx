import type { Metadata } from "next";

import { title } from "@/components/primitives";
import { projectsMetadata } from "@/config/page-metadata";

export const metadata: Metadata = projectsMetadata;

export default function ProjectsPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-6 max-w-3xl mx-auto text-center">
      <h1 className={title()}>Projects</h1>
    </section>
  );
}
