"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

import { fadeUp } from "@/components/motion";
import { FiberManualRecordIcon } from "@/components/icons";

interface TimelineEntryProps {
  /** When true, the dot uses the primary color to signal "current". */
  isCurrent?: boolean;
  /** The entry's content — header, body, chips, whatever the consumer needs. */
  children: ReactNode;
}

/**
 * A single timeline entry — the dot anchor on the spine plus a content
 * container. Bring-your-own layout via children; the entry doesn't prescribe
 * what goes inside.
 *
 * Wrapped in a `fadeUp` motion variant so the parent's `staggerContainer`
 * picks it up automatically.
 */
export function TimelineEntry({
  isCurrent = false,
  children,
}: TimelineEntryProps) {
  return (
    <motion.div className="relative pl-8 pb-10 last:pb-0" variants={fadeUp}>
      <div className="absolute left-0 top-1.5">
        <FiberManualRecordIcon
          className={isCurrent ? "text-primary" : "text-foreground/25"}
          style={{ fontSize: 15 }}
        />
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </motion.div>
  );
}
