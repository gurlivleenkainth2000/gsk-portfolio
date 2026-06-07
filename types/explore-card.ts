import type { ReactNode } from "react";

/**
 * A single "Explore more" card — surfaces a destination (internal page
 * or external URL) with a short pitch.
 */
export interface ExploreCardItem {
  /** Card title shown in bold. */
  label: string;
  /** Destination URL. Internal routes use NextLink; external use HeroUI <Link isExternal>. */
  href: string;
  /** One-line description shown under the label. */
  description: string;
  /** Optional leading icon — pass a rendered node, e.g. `icon: <WorkIcon />`. */
  icon?: ReactNode;
  /**
   * Trailing affordance icon. Defaults to an outward arrow. Pass a directional
   * icon (e.g. back/forward) for navigation, or `null` to hide it.
   */
  trailingIcon?: ReactNode;
  /** If true, opens in a new tab with rel="noopener noreferrer". Defaults to false. */
  external?: boolean;
}
