import type { ProjectImage } from "@/types/project";

import Image from "next/image";
import { Link } from "@heroui/link";

/**
 * A single showcase image — fills its grid cell and links out to the full-size
 * asset so dense detail (e.g. poster text) stays legible on demand.
 */
function ShowcaseImage({ image }: { image: ProjectImage }) {
  return (
    <figure className="m-0 flex flex-col gap-3">
      <Link
        isExternal
        aria-label={`Open full-size image: ${image.alt}`}
        className="group block w-full overflow-hidden rounded-xl border border-divider bg-default-100/40 transition-colors hover:border-primary/40"
        href={image.src}
      >
        <Image
          alt={image.alt}
          className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
          height={image.height}
          sizes="(max-width: 768px) 100vw, 50vw"
          src={image.src}
          width={image.width}
        />
      </Link>

      {image.caption && (
        <figcaption className="text-sm leading-relaxed text-foreground/55">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * "Showcase" — the poster and any supporting photos, all rendered uniformly in
 * a full-width responsive grid (one column on mobile, two from `sm` up).
 */
export function PosterFigure({
  poster,
  gallery,
}: {
  poster?: ProjectImage;
  gallery?: ProjectImage[];
}) {
  const images = [poster, ...(gallery ?? [])].filter(
    (image): image is ProjectImage => Boolean(image),
  );

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
      {images.map((image) => (
        <ShowcaseImage key={image.src} image={image} />
      ))}
    </div>
  );
}
