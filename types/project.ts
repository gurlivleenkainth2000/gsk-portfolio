export type BusinessModel = "B2B" | "B2C" | "B2B2C";

export type ProjectStatus = "live" | "archived";

/** Drives the index filter chips. */
export type ProjectCategory = "client" | "academic";

export type ProjectLinkType =
  | "website"
  | "appStore"
  | "playStore"
  | "github"
  | "caseStudy"
  | "linkedin";

export interface ProjectLink {
  type: ProjectLinkType;
  label: string;
  /** Omit when the destination is private. */
  url?: string;
  /** When true, render a "private — client" badge instead of a link. */
  private?: boolean;
  /** One-line pitch shown under the label in the "External links" card list. */
  description?: string;
}

/** A single engineering challenge, written as narrative (not labelled STAR). */
export interface ProjectChallenge {
  title: string;
  problem: string;
  approach: string;
  outcome: string;
}

export interface ProjectArchitectureStep {
  label: string;
  detail?: string;
}

/** "How it works" — a small left-to-right flow rendered without an image asset. */
export interface ProjectArchitecture {
  caption: string;
  steps: ProjectArchitectureStep[];
}

export interface ProjectCompany {
  name: string;
  url?: string;
}

/**
 * A showcase image (e.g. an exhibition poster or demo photo). Rendered in the
 * "Showcase" section via `next/image`; width/height are the intrinsic pixel
 * dimensions of the asset so Next can reserve layout space and optimise.
 */
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ProjectEntry {
  slug: string;
  name: string;
  /** Single-character brand mark used when no logo asset is set. */
  monogram: string;
  /** Optional logo asset path; falls back to `monogram`. */
  logo?: string;
  subtitle: string;
  businessModel: BusinessModel;
  status: ProjectStatus;
  category: ProjectCategory;
  role: string;
  period: string;
  /** Team context, e.g. "Core of a 4-dev team" or "Solo". */
  team: string;
  company?: ProjectCompany;
  /** Industry / domain tag. */
  domain: string;
  tech: string[];
  /**
   * Optional curated SEO keywords for this project's detail page. Layered on
   * top of the auto-derived terms (name, domain, tech) by `projectKeywords()`
   * — use for long-tail / intent terms not derivable from the fields above
   * (e.g. "receipt OCR", "WebSocket server").
   */
  keywords?: string[];
  links: ProjectLink[];
  overview: string;
  /** Honest "what I owned vs the team" line. */
  attribution: string;
  architecture?: ProjectArchitecture;
  /** Optional featured showcase image (e.g. an exhibition poster). */
  poster?: ProjectImage;
  /** Optional supporting photos shown as a grid beneath the poster. */
  gallery?: ProjectImage[];
  /** 2–3 entries by what is genuinely defensible. */
  challenges: ProjectChallenge[];
  /** 1–2 honest "what I'd do differently" notes. */
  reflections: string[];
  featured?: boolean;
}
