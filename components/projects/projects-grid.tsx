"use client";

import type { ProjectEntry, ProjectCategory } from "@/types/project";

import { useState } from "react";
import { motion } from "framer-motion";

import { staggerContainer, fadeUp } from "@/components/motion";
import { ProjectCard } from "@/components/projects/project-card";

type Filter = "all" | ProjectCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "client", label: "Client / SaaS" },
  { key: "academic", label: "Academic" },
];

/**
 * Merged "featured-first grid + filter chips" index. Filtering is light client
 * state — featured projects always sort first; chips narrow by category. The
 * grid re-mounts on filter change (keyed) so the stagger re-runs.
 */
export function ProjectsGrid({ items }: { items: ProjectEntry[] }) {
  const [active, setActive] = useState<Filter>("all");

  const ordered = [...items].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
  );
  const visible =
    active === "all" ? ordered : ordered.filter((p) => p.category === active);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f.key === "all"
              ? items.length
              : items.filter((p) => p.category === f.key).length;
          const isActive = active === f.key;

          return (
            <button
              key={f.key}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-divider text-foreground/60 hover:border-primary/40"
              }`}
              type="button"
              onClick={() => setActive(f.key)}
            >
              {f.label}
              {f.key === "all" ? ` (${count})` : ""}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        variants={staggerContainer}
      >
        {visible.map((p) => (
          <motion.div key={p.slug} variants={fadeUp}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
