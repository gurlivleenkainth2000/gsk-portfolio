import type { Metadata } from "next";

import { aboutMetadata } from "@/config/page-metadata";

export const metadata: Metadata = aboutMetadata;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
