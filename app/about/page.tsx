"use client";

import { motion } from "framer-motion";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { staggerContainer, fadeUp } from "@/components/motion";
import { ExploreGrid } from "@/components/explore-card/grid";
import {
  projectsCard,
  resumeCard,
  skillsCard,
  achievementsCard,
} from "@/components/explore-card/presets";
import { ExperienceTimeline } from "@/components/timeline/experience-timeline";
import { EducationTimeline } from "@/components/timeline/education-timeline";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import {
  GithubIcon,
  LinkedinIcon,
  LocationOnIcon,
  ExploreIcon,
  RouteIcon,
} from "@/components/icons";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-20">
      {/* ============== HERO INTRO ============== */}
      <motion.section
        animate="visible"
        initial="hidden"
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-wrap items-center gap-3 text-sm text-foreground/40 mb-5"
          variants={fadeUp}
        >
          <span className="flex items-center gap-1">
            <LocationOnIcon fontSize="small" />
            {siteConfig.location}
          </span>
          <span className="text-foreground/20">·</span>
          <Link
            className="text-foreground/40 hover:text-primary transition-colors text-sm"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </Link>
        </motion.div>

        <motion.h1 variants={fadeUp}>
          <span className={title({ size: "md" })}>About </span>
          <span className={title({ color: "violet", size: "md" })}>Me</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl"
          variants={fadeUp}
        >
          I&apos;m a{" "}
          <span className="text-primary font-semibold">
            Backend / Full-Stack Software Engineer
          </span>{" "}
          with <strong className="text-foreground">4+ years</strong> of
          full-time experience designing and shipping production systems on
          Google Cloud, Firebase, and modern TypeScript stacks.
        </motion.p>

        <motion.p
          className="mt-4 text-foreground/60 text-sm md:text-base leading-relaxed max-w-2xl"
          variants={fadeUp}
        >
          I&apos;ve owned architecture from day one on enterprise integration
          platforms, AI-driven analytics products, and multi-tenant SaaS — and
          I&apos;ve foundation-authored a distributed Go automation system
          before mentoring its handover. The work I value most sits where
          ambiguity, scale, and ownership meet.
        </motion.p>

        <motion.div className="flex flex-wrap gap-3 mt-8" variants={fadeUp}>
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "sm",
            })}
            href={siteConfig.links.linkedin}
          >
            <LinkedinIcon className="mr-1" fontSize="small" /> LinkedIn
          </Link>
          <Link
            isExternal
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "sm",
            })}
            href={siteConfig.links.github}
          >
            <GithubIcon className="mr-1" size={16} /> GitHub
          </Link>
          <NextLink
            className={buttonStyles({
              variant: "flat",
              radius: "full",
              size: "sm",
            })}
            href="/resume"
          >
            View Resume
          </NextLink>
        </motion.div>
      </motion.section>

      <Divider />

      {/* ============== THE JOURNEY ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.1 }}
        whileInView="visible"
      >
        <motion.div className="flex items-center gap-2 mb-10" variants={fadeUp}>
          <RouteIcon className="text-primary" />
          <h2 className={title({ size: "sm" })}>The Journey</h2>
        </motion.div>

        <div className="flex flex-col gap-5 text-foreground/70 leading-relaxed max-w-2xl">
          <motion.p variants={fadeUp}>
            I grew up in{" "}
            <span className="text-foreground font-medium">Punjab, India</span>,
            studied IT at{" "}
            <span className="text-foreground font-medium">
              Guru Nanak Dev Engineering College
            </span>
            , and started writing production code part-time in 2020 — before
            stepping into engineering full-time at{" "}
            <span className="text-foreground font-medium">Auribises</span> in
            mid-2022. The next three and a half years were the formative ones:
            architectural ownership across four client platforms and the
            foundation of a Go automation system that handed off cleanly to a
            junior engineer.
          </motion.p>

          <motion.p variants={fadeUp}>
            In early 2024 I moved to{" "}
            <span className="text-foreground font-medium">
              Melbourne, Australia
            </span>{" "}
            to start a{" "}
            <span className="text-foreground font-medium">
              Master of IT at Swinburne
            </span>{" "}
            — and kept building. The Masters didn&apos;t pause the engineering
            work; the two ran in parallel for nearly two years. The capstone
            project, where I inherited a stalled multi-cohort codebase and
            shipped client-ready in five weeks, was the clearest signal that
            ownership scales whether the work is for a paying client or an
            academic partner.
          </motion.p>

          <motion.p variants={fadeUp}>
            I&apos;m now based in Melbourne on a contract role at{" "}
            <span className="text-foreground font-medium">WebAlive</span>, doing
            containerisation R&amp;D and Playwright E2E automation.
          </motion.p>
        </div>
      </motion.section>

      <Divider />

      {/* ============== TIMELINE — WORK ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.05 }}
        whileInView="visible"
      >
        <ExperienceTimeline items={experience} />
      </motion.section>

      <Divider />

      {/* ============== TIMELINE — EDUCATION ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.05 }}
        whileInView="visible"
      >
        <EducationTimeline items={education} />
      </motion.section>

      <Divider />

      {/* ============== EXPLORE MORE ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.1 }}
        whileInView="visible"
      >
        <motion.div className="flex items-center gap-2 mb-10" variants={fadeUp}>
          <ExploreIcon className="text-primary" />
          <h2 className={title({ size: "sm" })}>Explore&nbsp;more</h2>
        </motion.div>

        <ExploreGrid
          items={[projectsCard, resumeCard, skillsCard, achievementsCard]}
        />
      </motion.section>
    </div>
  );
}
