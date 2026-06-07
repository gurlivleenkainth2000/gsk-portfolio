"use client";

import type { EducationEntry } from "@/types/education";

import { motion } from "framer-motion";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";

import { title } from "@/components/primitives";
import { SchoolIcon } from "@/components/icons";
import { fadeUp } from "@/components/motion";
import { TimelineShell } from "@/components/timeline/shell";
import { TimelineEntry } from "@/components/timeline/entry";

interface EducationTimelineProps {
  items: EducationEntry[];
  /** Override the default "Education" section heading. */
  heading?: string;
}

/**
 * Education timeline section — heading (School icon + title) plus a
 * <TimelineShell> with one <TimelineEntry> per degree. Each entry renders the
 * degree, institution (linkable when institutionUrl is set), period/location,
 * description, highlights bullet list, and "Key Units" chips.
 *
 * Place inside a motion.section with `staggerContainer` to coordinate reveals.
 */
export function EducationTimeline({
  items,
  heading = "Education",
}: EducationTimelineProps) {
  return (
    <>
      <motion.div className="flex items-center gap-2 mb-10" variants={fadeUp}>
        <SchoolIcon className="text-primary" />
        <h2 className={title({ size: "sm" })}>{heading}</h2>
      </motion.div>

      <TimelineShell>
        {items.map((edu) => (
          <TimelineEntry key={edu.id}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h3 className="font-bold text-foreground leading-snug">
                  {edu.degree}
                </h3>
                {edu.institutionUrl ? (
                  <Link
                    isExternal
                    className="text-primary text-sm font-medium mt-0.5 hover:underline"
                    href={edu.institutionUrl}
                  >
                    {edu.institution}
                  </Link>
                ) : (
                  <p className="text-primary text-sm font-medium mt-0.5">
                    {edu.institution}
                  </p>
                )}
              </div>
              <div className="text-sm text-foreground/40 sm:text-right shrink-0">
                <p className="font-medium">{edu.period}</p>
                <p>{edu.location}</p>
              </div>
            </div>

            {edu.description && (
              <p className="text-foreground/60 text-sm leading-relaxed">
                {edu.description}
              </p>
            )}

            {edu.highlights && edu.highlights.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {edu.highlights.map((h, j) => (
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

            {edu.units && (
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/30 font-semibold mb-2">
                  Key Units
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.units.map((unit) => (
                    <Chip
                      key={unit}
                      className="text-xs"
                      size="sm"
                      variant="flat"
                    >
                      {unit}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </TimelineEntry>
        ))}
      </TimelineShell>
    </>
  );
}
