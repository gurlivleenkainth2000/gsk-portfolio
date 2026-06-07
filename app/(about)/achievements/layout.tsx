import type { Metadata } from "next";

import { achievementsMetadata } from "@/metadata";

export const metadata: Metadata = achievementsMetadata;

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
