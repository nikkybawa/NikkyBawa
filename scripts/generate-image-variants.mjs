/**
 * Pre-generates responsive image variants for the static export.
 *
 * `output: "export"` ships no image optimizer, so next/image can't resize on
 * demand. Instead we emit a fixed ladder of widths at build time and let a
 * custom loader (src/lib/image-loader.ts) pick from them via the manifest.
 *
 * The original file doubles as the largest variant, so nothing is duplicated.
 * Run via `npm run build` (wired up as prebuild).
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC, "_img");
const MANIFEST = path.join(ROOT, "src", "lib", "image-manifest.json");

// Must stay in sync with deviceSizes/imageSizes in next.config.ts.
const WIDTHS = [256, 384, 640, 828, 1200, 1920];
const QUALITY = 58;

// Directories under public/ whose images are rendered through next/image.
const SOURCE_DIRS = ["images", "portfolio", "service-images"];
const EXTRA_FILES = ["logo.avif"];

/** URL-safe variant basename: "Bridal Make up-10" -> "bridal-make-up-10" */
const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(/[^\w.\- ]/g, "")
    .trim()
    .replace(/[\s.]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();

async function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });

  const sources = [];
  for (const dir of SOURCE_DIRS) {
    const abs = path.join(PUBLIC, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      if (/\.(avif|png|jpe?g|webp)$/i.test(f)) sources.push(path.posix.join(dir, f));
    }
  }
  for (const f of EXTRA_FILES) {
    if (fs.existsSync(path.join(PUBLIC, f))) sources.push(f);
  }

  const manifest = {};
  let generated = 0;
  let bytes = 0;

  for (const rel of sources) {
    const srcPath = path.join(PUBLIC, rel);
    const meta = await sharp(srcPath).metadata();
    const publicSrc = "/" + rel;

    const dirname = path.posix.dirname(rel);
    const base = slugify(path.posix.basename(rel, path.posix.extname(rel)));
    const outSubdir = path.join(OUT_DIR, dirname);
    fs.mkdirSync(outSubdir, { recursive: true });

    // Every ladder width strictly narrower than the source. The source itself
    // covers everything from its own width upward.
    const targets = WIDTHS.filter((w) => w < meta.width);
    const entries = [];

    for (const w of targets) {
      const outRel = path.posix.join("/_img", dirname, `${base}-${w}.avif`);
      const outAbs = path.join(PUBLIC, outRel.slice(1));
      await sharp(srcPath)
        .resize({ width: w, withoutEnlargement: true })
        .avif({ quality: QUALITY, effort: 6, chromaSubsampling: "4:2:0" })
        .toFile(outAbs);
      entries.push([w, outRel]);
      generated++;
      bytes += fs.statSync(outAbs).size;
    }

    entries.push([meta.width, publicSrc]);
    manifest[publicSrc] = entries.sort((a, b) => a[0] - b[0]);
  }

  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  console.log(
    `generated ${generated} variants for ${sources.length} images ` +
      `(${(bytes / 1024 / 1024).toFixed(1)}MB) -> public/_img`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
