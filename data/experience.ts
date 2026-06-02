import type { ExperienceEntry } from "@/types/experience";

// ---------------------------------------------------------------------------
// Professional experience
// Note: flagship client projects are anonymised here to match the resume's
// IP/NDA discipline. Named writeups belong in /projects only with explicit
// client permission.
// ---------------------------------------------------------------------------
export const experience: ExperienceEntry[] = [
  {
    id: "webalive",
    role: "Software Developer",
    company: "WebAlive",
    companyUrl: "https://www.webalive.com.au",
    employmentType: "contract",
    period: "Mar 2026 – Present",
    location: "Melbourne, Australia",
    current: false,
    summary:
      "Containerisation R&D and E2E test automation for an enterprise SaaS billing product and a proprietary CMS platform.",
    highlights: [
      "Designing Docker Compose foundations for a Grails-based billing platform, scoped as the first step toward a Terraform-driven AWS rollout",
      "Authoring Dockerfile build strategies that keep the Grails backend reliably wired to RabbitMQ, Redis, Elasticsearch, and MariaDB",
      "Migrating multi-environment service configs from production hosts to local containers without disrupting active development",
      "Building Playwright E2E coverage for a proprietary CMS, replacing manual QA passes with reproducible release gates",
    ],
    tech: [
      "Docker",
      "Docker Compose",
      "Terraform",
      "Playwright",
      "Grails",
      "RabbitMQ",
      "Redis",
      "Elasticsearch",
      "MariaDB",
    ],
  },
  {
    id: "auribises-se",
    role: "Software Engineer (Full-Stack)",
    company: "Auribises Technologies",
    employmentType: "full-time",
    period: "Jul 2022 – Feb 2026",
    location: "India (Remote)",
    current: false,
    summary:
      "Architectural ownership across four production platforms — an enterprise SAP-integrated product/pricing sync platform, an AI receipt-analytics product, an online mental-health platform, and a multi-tenant parking SaaS — plus the foundation of a distributed Go automation system.",
    highlights: [
      "Led an enterprise SAP-integrated product/pricing sync platform from scratch: event-driven pipeline, idempotent retries, and concurrent batch processing with per-batch failure isolation",
      "Designed and shipped an AI receipt-analytics product processing ~10K receipts/month at ~81% extraction accuracy on Google Vision AI + GCP",
      "Owned the backend on an online mental-health platform — billing, settlement, refund, and notification flows across 300+ production commits",
      "Built a multi-tenant parking SaaS that handles 15K+ monthly transactions across 78 lots, on Firestore + Cloud Functions",
      "Foundation-authored a distributed Go automation system (multi-process orchestration, port allocation, Firestore state machine) and handed it off to a junior engineer with structured mentorship",
    ],
    tech: [
      "TypeScript",
      "Next.js",
      "Angular",
      "Node.js",
      "Python",
      "FastAPI",
      "Go",
      "Google Cloud Platform",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "Cloud Run",
      "Vision AI",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    id: "auribises-early",
    role: "Earlier roles at Auribises",
    company: "Auribises Technologies",
    employmentType: "part-time",
    period: "Jul 2020 – Jun 2022",
    location: "India",
    current: false,
    summary:
      "Part-time and intern roles alongside undergraduate studies — building product fundamentals in Angular, Firebase, and TypeScript before stepping into the full-time engineering track.",
    highlights: [],
    tech: ["Angular", "Firebase", "Firestore", "TypeScript"],
  },
];
