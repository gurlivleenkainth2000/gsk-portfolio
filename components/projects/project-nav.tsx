import type { ProjectEntry } from "@/types/project";

import { ExploreCard } from "@/components/explore-card/card";
import { ArrowBackIcon, ArrowForwardIcon } from "@/components/icons";

/**
 * Previous / next navigation between project detail pages. Composes the shared
 * ExploreCard so nav stays visually consistent with the rest of the site.
 * Direction is carried by the arrows (back on previous, forward on next); each
 * card shows the target project's name and subtitle for context.
 */
export function ProjectNav({
  prev,
  next,
}: {
  prev?: ProjectEntry;
  next?: ProjectEntry;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {prev ? (
        <ExploreCard
          description={prev.subtitle}
          href={`/projects/${prev.slug}`}
          icon={<ArrowBackIcon fontSize="small" />}
          label={prev.name}
          trailingIcon={null}
        />
      ) : (
        <span />
      )}

      {next ? (
        <ExploreCard
          description={next.subtitle}
          href={`/projects/${next.slug}`}
          label={next.name}
          trailingIcon={<ArrowForwardIcon fontSize="small" />}
        />
      ) : (
        <span />
      )}
    </div>
  );
}
