import type { Metadata } from "next";

import { title } from "@/components/primitives";
import { blogMetadata } from "@/config/page-metadata";

export const metadata: Metadata = blogMetadata;

export default function BlogPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-6 max-w-3xl mx-auto text-center">
      <h1 className={title()}>Blog</h1>
    </section>
  );
}
