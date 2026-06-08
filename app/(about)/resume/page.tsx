"use client";

import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { title } from "@/components/primitives";
import { staggerContainer, fadeUp } from "@/components/motion";
import { DownloadIcon, OpenInNewIcon } from "@/components/icons";
import { asset } from "@/config/site";

const RESUME_PDF_PATH = asset("/resume.pdf");
const RESUME_VIEW_URL = asset("/resume.pdf");

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">
      <motion.section
        animate="visible"
        initial="hidden"
        variants={staggerContainer}
      >
        <motion.h1 variants={fadeUp}>
          <span className={title({ size: "md" })}>Resume</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl"
          variants={fadeUp}
        >
          A two-page summary of my engineering experience — backend / full-stack
          systems, four years across enterprise integration platforms, AI-driven
          analytics, and multi-tenant SaaS. The deep-dive context lives on the
          rest of this site; the resume keeps it tight.
        </motion.p>

        <motion.div className="flex flex-wrap gap-3 mt-8" variants={fadeUp}>
          <Link
            download
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "sm",
            })}
            href={RESUME_PDF_PATH}
          >
            <DownloadIcon className="mr-1" fontSize="small" /> Download PDF
          </Link>
          <Link
            isExternal
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "sm",
            })}
            href={RESUME_VIEW_URL}
          >
            <OpenInNewIcon className="mr-1" fontSize="small" /> Open in new tab
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
