"use client";

import type { ProjectEntry } from "@/types/project";

import { motion } from "framer-motion";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title } from "@/components/primitives";
import { staggerContainer, fadeUp } from "@/components/motion";
import { ProjectLinks } from "@/components/projects/project-links";
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
          className="mt-4 max-w-2xl text-base text-foreground/70 md:text-lg"
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

        {project.links.length > 0 ? (
          <motion.div className="mt-5" variants={fadeUp}>
            <ProjectLinks links={project.links} />
          </motion.div>
        ) : (
          <motion.div className="mt-5" variants={fadeUp}>
            <Chip
              size="sm"
              startContent={<LockIcon style={{ fontSize: 13 }} />}
              variant="flat"
            >
              {privateSourceNote[project.category]}
            </Chip>
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
          className="mt-4 max-w-2xl leading-relaxed text-foreground/70"
          variants={fadeUp}
        >
          {project.overview}
        </motion.p>
        <motion.p
          className="mt-3 max-w-2xl text-sm italic leading-relaxed text-foreground/50"
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
            <ul className="mt-4 flex max-w-2xl list-disc flex-col gap-2 pl-5 leading-relaxed text-foreground/70">
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
