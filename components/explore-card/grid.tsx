"use client";

import type { ExploreCardItem } from "@/types/explore-card";

import { motion } from "framer-motion";

import { fadeUp } from "@/components/motion";
import { ExploreCard } from "@/components/explore-card/card";

interface ExploreGridProps {
  /** Cards to render. The grid maps each item to an <ExploreCard>. */
  items: ExploreCardItem[];
  /** Override the default 1-col → 2-col responsive Tailwind classes. */
  className?: string;
}

/**
 * Responsive grid of <ExploreCard> items. Wraps each card in a `motion.div`
 * with the shared `fadeUp` variant — pair this grid with a parent that
 * provides `staggerContainer` to coordinate child reveals.
 *
 * @example
 *   <motion.section variants={staggerContainer} initial="hidden" whileInView="visible">
 *     <ExploreGrid items={aboutExploreCards} />
 *   </motion.section>
 */
export function ExploreGrid({
  items,
  className = "grid grid-cols-1 sm:grid-cols-2 gap-4",
}: ExploreGridProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <motion.div key={item.href} variants={fadeUp}>
          <ExploreCard {...item} />
        </motion.div>
      ))}
    </div>
  );
}
