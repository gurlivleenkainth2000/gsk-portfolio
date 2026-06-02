/**
 * Shared ambient blob backgrounds used across the site.
 *
 * Two variants are exported:
 *
 * 1. <AmbientBackground />
 *    Fixed to the viewport (`fixed inset-0 -z-10`). Used once at the root
 *    layout level so every page has a consistent atmosphere. Stays put
 *    while the user scrolls.
 *
 * 2. <SectionBackground variant="..." />
 *    Absolutely positioned inside a `relative overflow-hidden` parent.
 *    Use this on long pages (e.g. project case studies) to add blob
 *    accents that scroll WITH the content. Drop one into each section
 *    that needs visual punctuation — vary the `variant` to keep the
 *    rhythm interesting.
 *
 *    Example:
 *    ```tsx
 *    <section className="relative overflow-hidden py-24">
 *      <SectionBackground variant="right" />
 *      <div className="relative z-10">
 *        ...content...
 *      </div>
 *    </section>
 *    ```
 *
 *    The content wrapper needs `relative z-10` (or any positive z-index
 *    with `relative` position) so it paints above the absolute blobs.
 *    Without it the blobs render on top of your content.
 */

type SectionVariant = "full" | "left" | "right" | "center";

interface SectionBackgroundProps {
  /**
   * Which blob(s) to render.
   * - "full" — all three blobs (matches the ambient look)
   * - "left" — bottom-left blob only
   * - "right" — top-right blob only
   * - "center" — soft centered glow only
   */
  variant?: SectionVariant;
  /** Optional extra classes for the wrapper */
  className?: string;
}

export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-background to-background/80"
    >
      {/* Top-right soft circle */}
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-primary/25 via-violet-500/10 to-transparent rounded-full blur-3xl" />

      {/* Bottom-left soft blob */}
      <div className="absolute bottom-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-gradient-to-bl from-violet-500/25 via-primary/10 to-transparent rounded-full blur-3xl" />

      {/* Center subtle glow */}
      <div className="absolute inset-0 mx-auto my-auto w-[70vw] h-[70vw] bg-gradient-radial from-primary/5 via-transparent to-transparent blur-2xl" />
    </div>
  );
}

export function SectionBackground({
  variant = "full",
  className = "",
}: SectionBackgroundProps) {
  const showRight = variant === "full" || variant === "right";
  const showLeft = variant === "full" || variant === "left";
  const showCenter = variant === "full" || variant === "center";

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {showRight && (
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-primary/20 via-violet-500/10 to-transparent rounded-full blur-3xl" />
      )}

      {showLeft && (
        <div className="absolute bottom-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-gradient-to-bl from-violet-500/20 via-primary/10 to-transparent rounded-full blur-3xl" />
      )}

      {showCenter && (
        <div className="absolute inset-0 mx-auto my-auto w-[70vw] h-[70vw] bg-gradient-radial from-primary/5 via-transparent to-transparent blur-2xl" />
      )}
    </div>
  );
}
