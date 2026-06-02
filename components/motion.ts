import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variants for the portfolio.
 *
 * Conventions:
 *   - `stagger*` variants are parent containers — they orchestrate child reveals.
 *   - `fade*` variants are child variants — they describe a single element's entry.
 *   - Each default has a `*From` factory for sections that need different timing.
 *
 * Pair a container with a child variant like:
 *   <motion.section variants={staggerContainer} initial="hidden" animate="visible">
 *     <motion.h2 variants={fadeUp}>...</motion.h2>
 *   </motion.section>
 */

// ---------------------------------------------------------------------------
// Containers
// ---------------------------------------------------------------------------

/** Default parent container — staggers children at 120ms intervals. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/**
 * Factory for parent containers with custom stagger timing.
 * Use when a hero/feature section needs slower, more deliberate reveals.
 */
export const staggerContainerWith = (
  staggerChildren = 0.12,
  delayChildren = 0.05,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

// ---------------------------------------------------------------------------
// Children
// ---------------------------------------------------------------------------

/** Default child — fades in while sliding up 22px. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Factory for fade-up children with custom distance/duration.
 * Use for punchier or slower entrances than the default.
 */
export const fadeUpFrom = (y = 22, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: "easeOut" },
  },
});

/** Fade-only child — no Y movement. Use when the element shouldn't shift. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
