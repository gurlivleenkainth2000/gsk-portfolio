"use client";

import { siteConfig } from "@/config/site";
import { Card, CardBody } from "@heroui/card";

export default function ResumePage() {
  return (
    <section className="flex flex-col items-center justify-center p-4 bg-background min-h-screen">
      <Card className="w-full max-w-5xl" shadow="sm">
        <iframe
          src={siteConfig.links.resume}
          width="100%"
          height="1500"
          scrolling="no"
          className="rounded-xl border-0"
        />
      </Card>
    </section>
  );
}
