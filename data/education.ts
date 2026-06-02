import type { EducationEntry } from "@/types/education";

export const education: EducationEntry[] = [
  {
    id: "mit-swinburne",
    degree:
      "Master of IT (Professional Computing) — Software Development Specialisation",
    institution: "Swinburne University of Technology",
    institutionUrl: "https://www.swinburne.edu.au",
    location: "Melbourne, Australia",
    period: "Feb 2024 – Dec 2025",
    description:
      "Postgraduate degree completed in parallel with full-time engineering work at Auribises. Conferred December 2025.",
    highlights: [
      "Capstone (Technology Application Project, 90/100): inherited a stalled multi-cohort sailing-simulator project for a partner university and shipped client-ready in ~5 weeks. Authored 15 of 28 architecturally meaningful commits — built the TCP client + multi-session manager, switched the architecture from IP-based to session_hash-based (blake2b), and added a SafeServerShutdown layer over Uvicorn for graceful Ctrl+C handling under active sessions.",
      "Object-Oriented Programming: 94/100",
    ],
    units: [
      "Software Development",
      "Software Quality & Testing",
      "Object-Oriented Programming",
      "Web Application Development",
      "Cloud Engineering",
      "Big Data",
      "Technology Application Project",
      "Technology Design & Inquiry Projects",
    ],
  },
  {
    id: "btech-gndec",
    degree: "Bachelor of Technology — Information Technology",
    institution: "Guru Nanak Dev Engineering College",
    location: "Ludhiana, Punjab, India",
    period: "Jun 2018 – Jul 2022",
    description:
      "Four-year undergraduate degree covering software engineering, networking, databases, and systems programming.",
  },
];
