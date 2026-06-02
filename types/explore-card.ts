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
  /** If true, opens in a new tab with rel="noopener noreferrer". Defaults to false. */
  external?: boolean;
}
