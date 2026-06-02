import type { SkillCategory } from "@/types/skills";

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Go", "Java", "Dart"],
  },
  {
    category: "Frontend",
    items: [
      "Next.js (App Router, RSC)",
      "React (Hooks, Context API)",
      "Angular (NgRx, RxJS)",
      "Flutter",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "Flask",
      "Spring Boot",
      "Grails",
      "REST APIs",
      "Microservices",
      "Event-driven pipelines",
    ],
  },
  {
    category: "Cloud Platforms",
    items: [
      "Google Cloud Platform",
      "Firebase",
      "Cloud Functions",
      "Cloud Run",
      "Vision AI",
      "Text-to-Speech",
      "AWS (familiar)",
    ],
  },
  {
    category: "Databases",
    items: [
      "Firestore",
      "BigQuery",
      "MongoDB",
      "MySQL",
      "MariaDB",
      "Redis",
      "Elasticsearch",
    ],
  },
  {
    category: "DevOps & CI/CD",
    items: [
      "Docker",
      "Docker Compose",
      "Terraform",
      "GitHub Actions",
      "Git",
      "Linux",
    ],
  },
  {
    category: "Testing",
    items: ["Playwright (E2E)", "Jest", "PyTest"],
  },
  {
    category: "Methodologies",
    items: [
      "Agile / Scrum",
      "Clean architecture",
      "Type-safe design",
      "Idempotent retry patterns",
      "Mentorship & handover",
    ],
  },
];
