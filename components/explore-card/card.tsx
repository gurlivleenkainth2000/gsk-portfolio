import type { ExploreCardItem } from "@/types/explore-card";

import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

/**
 * A single explore card — internal or external destination.
 *
 * Renders as a bordered card with optional leading icon, label, description,
 * and a trailing arrow that indicates the link affordance. Hovering shifts
 * the border + label colour to primary.
 *
 * Internal hrefs use NextLink for client-side routing. External hrefs use
 * HeroUI <Link isExternal> which opens in a new tab with safe `rel` attrs.
 */
export function ExploreCard({
  label,
  href,
  description,
  icon,
  trailingIcon = <ArrowOutwardIcon fontSize="small" />,
  external = false,
}: ExploreCardItem) {
  const cardInner = (
    <Card
      className="border border-divider hover:border-primary/40 transition-colors h-full"
      shadow="none"
    >
      <CardBody className="flex flex-row items-start justify-between gap-3 p-5">
        <div className="flex items-start gap-3 min-w-0">
          {icon && (
            <span className="text-primary/70 group-hover:text-primary transition-colors shrink-0 mt-0.5">
              {icon}
            </span>
          )}
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {label}
            </p>
            <p className="text-sm text-foreground/55 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        {trailingIcon && (
          <span className="text-foreground/30 group-hover:text-primary transition-colors shrink-0">
            {trailingIcon}
          </span>
        )}
      </CardBody>
    </Card>
  );

  if (external) {
    return (
      <Link isExternal className="block group" href={href}>
        {cardInner}
      </Link>
    );
  }

  return (
    <NextLink className="block group" href={href}>
      {cardInner}
    </NextLink>
  );
}
