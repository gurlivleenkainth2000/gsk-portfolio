// components/json-ld.tsx
//
// Renders a <script type="application/ld+json"> tag for one or more schema.org
// objects. Server component (no "use client") — JSON-LD is static markup that
// Google reads from the rendered HTML.
//
// Reference: https://developers.google.com/search/docs/appearance/structured-data

export interface JsonLdProps {
  /** A single schema object or an array of them. */
  data: object | object[];
}

export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    type="application/ld+json"
  />
);
