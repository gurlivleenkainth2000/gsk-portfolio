import type { Metadata } from "next";

import { aboutMetadata } from "@/config/metadata";

export const metadata: Metadata = aboutMetadata;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
