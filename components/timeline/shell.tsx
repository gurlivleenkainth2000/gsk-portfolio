import type { ReactNode } from "react";

interface TimelineShellProps {
  children: ReactNode;
}

/**
 * Vertical timeline container. Renders the spine (1px divider line) that
 * runs alongside <TimelineEntry> children.
 *
 * Use inside a section that provides Framer Motion's `staggerContainer`
 * variant so each entry reveals in sequence.
 */
export function TimelineShell({ children }: TimelineShellProps) {
  return (
    <div className="relative flex flex-col gap-0">
      <div
        aria-hidden="true"
        className="absolute left-[7px] top-2 bottom-2 w-px bg-divider"
      />
      {children}
    </div>
  );
}
