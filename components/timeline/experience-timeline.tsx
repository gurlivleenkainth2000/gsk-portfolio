"use client";

import type { ExperienceEntry, EmploymentType } from "@/types/experience";

import { motion } from "framer-motion";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import WorkIcon from "@mui/icons-material/Work";

import { title } from "@/components/primitives";
import { fadeUp } from "@/components/motion";
import { TimelineShell } from "@/components/timeline/shell";
import { TimelineEntry } from "@/components/timeline/entry";

const employmentLabel: Record<EmploymentType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
};

interface ExperienceTimelineProps {
  items: ExperienceEntry[];
  /** Override the default "Experience" section heading. */
  heading?: string;
}

/**
 * Work-experience timeline section — heading (Work icon + title) plus a
 * <TimelineShell> with one <TimelineEntry> per role. Each entry renders the
 * role, company (linkable when companyUrl is set), period/location, summary,
 * highlights bullet list, and tech chips.
 *
 * Place inside a motion.section with `staggerContainer` to coordinate reveals.
 */
export function ExperienceTimeline({
  items,
  heading = "Experience",
}: ExperienceTimelineProps) {
  return (
    <>
      <motion.div className="flex items-center gap-2 mb-10" variants={fadeUp}>
        <WorkIcon className="text-primary" />
        <h2 className={title({ size: "sm" })}>{heading}</h2>
      </motion.div>

      <TimelineShell>
        {items.map((exp) => (
          <TimelineEntry key={exp.id} isCurrent={exp.current}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-foreground">{exp.role}</h3>
                  {exp.current && (
                    <Chip
                      className="text-xs"
                      color="success"
                      size="sm"
                      variant="flat"
                    >
                      Current
                    </Chip>
                  )}
                  <Chip
                    className="text-xs text-foreground/50"
                    size="sm"
                    variant="flat"
                  >
                    {employmentLabel[exp.employmentType]}
                  </Chip>
                </div>
                {exp.companyUrl ? (
                  <Link
                    isExternal
                    className="text-primary text-sm font-medium hover:underline"
                    href={exp.companyUrl}
                  >
                    {exp.company}
                  </Link>
                ) : (
                  <p className="text-primary text-sm font-medium">
                    {exp.company}
                  </p>
                )}
              </div>
              <div className="text-sm text-foreground/40 sm:text-right shrink-0">
                <p className="font-medium">{exp.period}</p>
                <p>{exp.location}</p>
              </div>
            </div>

            <p className="text-foreground/60 text-sm leading-relaxed">
              {exp.summary}
            </p>

            {exp.highlights.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {exp.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm text-foreground/55 leading-relaxed"
                  >
                    <span className="text-primary mt-1.5 shrink-0 text-[8px]">
                      ▸
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-1.5 pt-1">
              {exp.tech.map((t) => (
                <Chip key={t} className="text-xs" size="sm" variant="flat">
                  {t}
                </Chip>
              ))}
            </div>
          </TimelineEntry>
        ))}
      </TimelineShell>
    </>
  );
}
