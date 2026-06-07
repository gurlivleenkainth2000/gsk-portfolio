import type { ProjectArchitecture } from "@/types/project";

import { Fragment } from "react";

import { ArrowForwardIcon } from "@/components/icons";

/**
 * "How it works" — a numbered flow rendered from data (no image asset).
 * Horizontal stepper on desktop, vertical on mobile, with a one-line caption.
 * Steps are equal-width; connectors rotate to match the axis.
 */
export function ArchitectureFigure({
  architecture,
}: {
  architecture: ProjectArchitecture;
}) {
  const { steps, caption } = architecture;

  return (
    <figure className="m-0 flex flex-col gap-5">
      <div className="flex flex-col items-stretch gap-2 md:flex-row">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <div className="group flex-1 rounded-xl border border-divider bg-default-100/40 p-4 transition-colors hover:border-primary/40">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <p className="mt-2 text-sm font-medium text-foreground">
                {step.label}
              </p>
              {step.detail && (
                <p className="mt-1 text-xs leading-relaxed text-foreground/50">
                  {step.detail}
                </p>
              )}
            </div>

            {i < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="flex items-center justify-center text-foreground/25"
              >
                <ArrowForwardIcon
                  className="rotate-90 md:rotate-0"
                  fontSize="small"
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <figcaption className="text-sm leading-relaxed text-foreground/55">
        {caption}
      </figcaption>
    </figure>
  );
}
