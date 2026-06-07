import type { Metadata } from "next";

import { skillsMetadata } from "@/metadata";

export const metadata: Metadata = skillsMetadata;

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
