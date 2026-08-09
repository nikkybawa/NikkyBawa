import manifest from "./image-manifest.json";

type Entry = [width: number, url: string];

// JSON widens the tuples to (string | number)[], so re-narrow through unknown.
const table = manifest as unknown as Record<string, Entry[]>;

/**
 * Custom next/image loader for the static export.
 *
 * There is no image optimizer in `output: "export"`, so instead of a resize
 * URL we resolve to the narrowest pre-generated variant that still covers the
 * requested width (see scripts/generate-image-variants.mjs). Next still builds
 * a full srcset from these, so browsers keep downloading only what they need.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const variants = table[src];
  // encodeURI, not encodeURIComponent: keeps "/" but escapes the spaces in the
  // original portfolio filenames, which would otherwise break srcset parsing.
  if (!variants || variants.length === 0) return encodeURI(src);

  const match = variants.find(([w]) => w >= width) ?? variants[variants.length - 1];
  return encodeURI(match[1]);
}
