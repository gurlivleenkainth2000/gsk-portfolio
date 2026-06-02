"use client";

import { motion } from "framer-motion";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import { title } from "@/components/primitives";
import { staggerContainer, fadeUp } from "@/components/motion";

interface Achievement {
  title: string;
  context: string;
  detail?: string;
  year?: string;
}

const academic: Achievement[] = [
  {
    title: "Capstone — Technology Application Project",
    context: "Swinburne University of Technology · 90/100 (HD)",
    detail:
      "Inherited a stalled multi-cohort sailing-simulator project for a partner university. Shipped client-ready in ~5 weeks: built the TCP client + multi-session manager, switched architecture from IP-based to session_hash-based (blake2b), and added a SafeServerShutdown layer for graceful Ctrl+C handling under active sessions.",
    year: "2025",
  },
  {
    title: "Object-Oriented Programming",
    context: "Swinburne University of Technology · 94/100 (HD)",
    year: "2024",
  },
];

const professional: Achievement[] = [
  // Add professional achievements / certifications here as they accumulate.
];

export default function AchievementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-16">
      {/* ============== HERO ============== */}
      <motion.section
        animate="visible"
        initial="hidden"
        variants={staggerContainer}
      >
        <motion.h1 variants={fadeUp}>
          <span className={title({ size: "md" })}>Achievements </span>
          <span className={title({ color: "violet", size: "md" })}>
            &amp; Standouts
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl"
          variants={fadeUp}
        >
          Selected academic and professional highlights — the work I&apos;d
          point to first if asked what I&apos;ve shipped or what I&apos;m
          proudest of.
        </motion.p>
      </motion.section>

      <Divider />

      {/* ============== ACADEMIC ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.05 }}
        whileInView="visible"
      >
        <motion.div className="flex items-center gap-2 mb-10" variants={fadeUp}>
          <SchoolIcon className="text-primary" />
          <h2 className={title({ size: "sm" })}>Academic</h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {academic.map((a) => (
            <motion.div key={a.title} variants={fadeUp}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                <div>
                  <h3 className="font-bold text-foreground">{a.title}</h3>
                  <p className="text-primary text-sm font-medium mt-0.5">
                    {a.context}
                  </p>
                </div>
                {a.year && (
                  <Chip
                    className="text-xs text-foreground/50 shrink-0"
                    size="sm"
                    variant="flat"
                  >
                    {a.year}
                  </Chip>
                )}
              </div>
              {a.detail && (
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {a.detail}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Divider />

      {/* ============== PROFESSIONAL ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.05 }}
        whileInView="visible"
      >
        <motion.div className="flex items-center gap-2 mb-10" variants={fadeUp}>
          <WorkIcon className="text-primary" />
          <h2 className={title({ size: "sm" })}>Professional</h2>
        </motion.div>

        {professional.length > 0 ? (
          <div className="flex flex-col gap-8">
            {professional.map((a) => (
              <motion.div key={a.title} variants={fadeUp}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-bold text-foreground">{a.title}</h3>
                    <p className="text-primary text-sm font-medium mt-0.5">
                      {a.context}
                    </p>
                  </div>
                  {a.year && (
                    <Chip
                      className="text-xs text-foreground/50 shrink-0"
                      size="sm"
                      variant="flat"
                    >
                      {a.year}
                    </Chip>
                  )}
                </div>
                {a.detail && (
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {a.detail}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex items-center gap-3 text-foreground/50"
            variants={fadeUp}
          >
            <EmojiEventsIcon className="text-foreground/30" fontSize="small" />
            <p className="text-sm italic">
              Professional certifications and recognition will appear here as I
              accumulate them.
            </p>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}
