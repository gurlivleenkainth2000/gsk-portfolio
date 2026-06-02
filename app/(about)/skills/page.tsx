"use client";

import { motion } from "framer-motion";
import { Chip } from "@heroui/chip";

import { title } from "@/components/primitives";
import { staggerContainer, fadeUp } from "@/components/motion";
import { skills } from "@/data/skills";

export default function SkillsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">
      {/* ============== HERO ============== */}
      <motion.section
        animate="visible"
        initial="hidden"
        variants={staggerContainer}
      >
        <motion.h1 variants={fadeUp}>
          <span className={title({ size: "md" })}>Technical </span>
          <span className={title({ color: "violet", size: "md" })}>Skills</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl"
          variants={fadeUp}
        >
          Languages, frameworks, and tooling I use day-to-day. Grouped by area —
          newest at the top of each list.
        </motion.p>
      </motion.section>

      {/* ============== SKILL CATEGORIES ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.05 }}
        whileInView="visible"
      >
        <div className="flex flex-col gap-6">
          {skills.map((group) => (
            <motion.div
              key={group.category}
              className="flex flex-col sm:flex-row gap-3 items-start"
              variants={fadeUp}
            >
              <span className="text-xs font-semibold text-foreground/40 w-40 shrink-0 uppercase tracking-widest pt-1">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <Chip
                    key={skill}
                    className="text-xs"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    {skill}
                  </Chip>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
