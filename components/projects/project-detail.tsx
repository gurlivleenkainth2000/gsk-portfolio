"use client";

import type { ProjectEntry } from "@/types/project";

import { motion } from "framer-motion";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title } from "@/components/primitives";
import { staggerContainer, fadeUp } from "@/components/motion";
import { ProjectLinks, PILL_CLASS } from "@/components/projects/project-links";
import { ProjectExternalLinks } from "@/components/projects/project-external-links";
import {
  ArrowBackIcon,
  LockIcon,
  PersonIcon,
  CalendarMonthIcon,
  GroupsIcon,
  BusinessIcon,
  CategoryIcon,
} from "@/components/icons";
import { ChallengeBlock } from "@/components/projects/challenge-block";
import { ArchitectureFigure } from "@/components/projects/architecture-figure";
import { PosterFigure } from "@/components/projects/poster-figure";
import { ProjectNav } from "@/components/projects/project-nav";

const statusColor = {
  live: "success",
  archived: "default",
} as const;

// Shown when a project has no public links, so the missing repo reads as
// intentional (client/NDA or private university org), not as an omission.
const privateSourceNote: Record<ProjectEntry["category"], string> = {
  client: "Client product. Source is private.",
  academic: "Academic project. Source kept in a private org.",
};

function MetaItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-foreground/40">{icon}</span>
      {children}
    </span>
  );
}

export function ProjectDetail({
  project,
  prev,
  next,
}: {
  project: ProjectEntry;
  prev?: ProjectEntry;
  next?: ProjectEntry;
}) {
  // Live sites stay in the hero as pills; posts / repos / other pages go in
  // their own "External links" section after the challenges.
  const websiteLinks = project.links.filter(
    (l) => l.type === "website" && l.url && !l.private,
  );
  const externalLinks = project.links.filter(
    (l) => l.type !== "website" && l.url && !l.private,
  );

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-16">
      {/* ============== HERO ============== */}
      <motion.section
        animate="visible"
        initial="hidden"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <NextLink
            className="inline-flex items-center gap-1 text-sm text-foreground/40 transition-colors hover:text-primary"
            href="/projects"
          >
            <ArrowBackIcon fontSize="inherit" /> Projects
          </NextLink>
        </motion.div>

        <motion.div className="mt-6 flex items-center gap-4" variants={fadeUp}>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl font-semibold text-primary">
            {project.monogram}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className={title({ size: "sm" })}>{project.name}</h1>
            {project.category !== "academic" && (
              <Chip size="sm" variant="flat">
                {project.businessModel}
              </Chip>
            )}
            <Chip
              className="capitalize"
              color={statusColor[project.status]}
              size="sm"
              variant="flat"
            >
              {project.status}
            </Chip>
            {project.category === "academic" && (
              <Chip color="warning" size="sm" variant="flat">
                Academic
              </Chip>
            )}
          </div>
        </motion.div>

        <motion.p
          className="mt-4 text-base text-foreground/70 md:text-lg"
          variants={fadeUp}
        >
          {project.subtitle}
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/60"
          variants={fadeUp}
        >
          <MetaItem icon={<PersonIcon fontSize="small" />}>
            {project.role}
          </MetaItem>
          <MetaItem icon={<CalendarMonthIcon fontSize="small" />}>
            {project.period}
          </MetaItem>
          <MetaItem icon={<GroupsIcon fontSize="small" />}>
            {project.team}
          </MetaItem>
          {project.company &&
            (project.company.url ? (
              <MetaItem icon={<BusinessIcon fontSize="small" />}>
                <Link
                  isExternal
                  className="text-sm text-foreground/60 hover:text-primary"
                  href={project.company.url}
                >
                  {project.company.name}
                </Link>
              </MetaItem>
            ) : (
              <MetaItem icon={<BusinessIcon fontSize="small" />}>
                {project.company.name}
              </MetaItem>
            ))}
          <MetaItem icon={<CategoryIcon fontSize="small" />}>
            {project.domain}
          </MetaItem>
        </motion.div>

        <motion.div className="mt-5 flex flex-wrap gap-1.5" variants={fadeUp}>
          {project.tech.map((t) => (
            <Chip key={t} size="sm" variant="flat">
              {t}
            </Chip>
          ))}
        </motion.div>

        {/* Links & status — the live site(s) and, when there's no public repo,
            a note that the source is intentionally private (NDA / private org).
            Grouped on one row so the website pill isn't sandwiched between two
            otherwise-identical chip rows. */}
        {(websiteLinks.length > 0 ||
          !project.links.some((l) => l.type === "github" && l.url)) && (
          <motion.div
            className="mt-6 flex flex-wrap items-center gap-2"
            variants={fadeUp}
          >
            {websiteLinks.length > 0 && <ProjectLinks links={websiteLinks} />}
            {!project.links.some((l) => l.type === "github" && l.url) && (
              <span className={PILL_CLASS}>
                <LockIcon style={{ fontSize: 14 }} />
                {privateSourceNote[project.category]}
              </span>
            )}
          </motion.div>
        )}
      </motion.section>

      <Divider />

      {/* ============== OVERVIEW ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        <motion.h2 className={title({ size: "sm" })} variants={fadeUp}>
          Overview
        </motion.h2>
        <motion.p
          className="mt-4 leading-relaxed text-foreground/70"
          variants={fadeUp}
        >
          {project.overview}
        </motion.p>
        <motion.p
          className="mt-3 text-sm italic leading-relaxed text-foreground/50"
          variants={fadeUp}
        >
          {project.attribution}
        </motion.p>
      </motion.section>

      {/* ============== HOW IT WORKS ============== */}
      {project.architecture && (
        <>
          <Divider />
          <motion.section
            initial="hidden"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
          >
            <motion.h2 className={title({ size: "sm" })} variants={fadeUp}>
              How it works
            </motion.h2>
            <motion.div className="mt-6" variants={fadeUp}>
              <ArchitectureFigure architecture={project.architecture} />
            </motion.div>
          </motion.section>
        </>
      )}

      {/* ============== SHOWCASE ============== */}
      {(project.poster || (project.gallery && project.gallery.length > 0)) && (
        <>
          <Divider />
          <motion.section
            initial="hidden"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
          >
            <motion.h2 className={title({ size: "sm" })} variants={fadeUp}>
              Showcase
            </motion.h2>
            <motion.div className="mt-6" variants={fadeUp}>
              <PosterFigure gallery={project.gallery} poster={project.poster} />
            </motion.div>
          </motion.section>
        </>
      )}

      {/* ============== CHALLENGES ============== */}
      {project.challenges.length > 0 && (
        <>
          <Divider />
          <motion.section
            initial="hidden"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.1 }}
            whileInView="visible"
          >
            <motion.h2 className={title({ size: "sm" })} variants={fadeUp}>
              Engineering challenges
            </motion.h2>
            <div className="mt-8 flex flex-col gap-10">
              {project.challenges.map((c, i) => (
                <motion.div key={c.title} variants={fadeUp}>
                  <ChallengeBlock challenge={c} index={i} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </>
      )}

      {/* ============== EXTERNAL LINKS ============== */}
      {externalLinks.length > 0 && (
        <>
          <Divider />
          <motion.section
            initial="hidden"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
          >
            <motion.h2 className={title({ size: "sm" })} variants={fadeUp}>
              External links
            </motion.h2>
            <div className="mt-6">
              <ProjectExternalLinks links={externalLinks} />
            </div>
          </motion.section>
        </>
      )}

      {/* ============== REFLECTIONS ============== */}
      {project.reflections.length > 0 && (
        <>
          <Divider />
          <motion.section
            initial="hidden"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
          >
            <motion.h2 className={title({ size: "sm" })} variants={fadeUp}>
              What I&apos;d do differently
            </motion.h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-foreground/70">
              {project.reflections.map((r) => (
                <motion.li key={r} variants={fadeUp}>
                  {r}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </>
      )}

      <Divider />

      {/* ============== NAV ============== */}
      <ProjectNav next={next} prev={prev} />
    </div>
  );
}
