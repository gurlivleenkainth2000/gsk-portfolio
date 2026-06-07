import type { Metadata } from "next";

import { resumeMetadata } from "@/config/metadata";

export const metadata: Metadata = resumeMetadata;

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
