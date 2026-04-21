/**
 * One-time script to compress public images to WebP and generate favicon.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const APP_DIR = path.join(process.cwd(), "app");

// Background textures — resize to 1920px max, quality 75
const BACKGROUND_IMAGES = [
  "bg_grunge_red.png",
  "bg_grunge_purple.png",
  "bg_dark_texture.png",
  "bg-doodle-dark.png",
  "bg-doodle-light.png",
  "nav_footer_bg.png",
  "retro_hero_bg.png",
  "hero_wall_bg.png",
];

// Card/doodle images — resize to 1200px max
const CARD_IMAGES = [
  "card_doodle_bg.png",
  "card_doodle_bg_alt.png",
  "hero_drama_doodle.png",
  "team_doodle.png",
  "theater_masks.png",
  "theater_masks1.png",
  "film_clapperboard.png",
  "film_clapperboard1.png",
];

// Logo / special images — high quality
const LOGO_IMAGES = [
  "logo.png",
  "image.png",
  "iim.png",
];

// Hero image — huge (8.9MB), needs aggressive compression
const HERO_IMAGES = ["heroImage.png"];

// Camera cursor images
const CURSOR_IMAGES = [
  "camera_cursor.png",
  "camera_cursor1.png",
  "camera_cursor2.png",
];

async function optimizeImage(filename, maxWidth, quality) {
  const inputPath = path.join(IMAGES_DIR, filename);
  const outputName = filename.replace(/\.png$/i, ".webp");
  const outputPath = path.join(IMAGES_DIR, outputName);

  if (!fs.existsSync(inputPath)) {
    console.log(`  ⏭  Skipping ${filename} (not found)`);
    return;
  }

  try {
    const inputStats = fs.statSync(inputPath);
    const inputSize = (inputStats.size / 1024).toFixed(0);

    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSize = (outputStats.size / 1024).toFixed(0);
    const saving = ((1 - outputStats.size / inputStats.size) * 100).toFixed(0);

    console.log(`  ✅ ${filename} → ${outputName}: ${inputSize}KB → ${outputSize}KB (${saving}% saved)`);
  } catch (err) {
    console.error(`  ❌ Failed to optimize ${filename}:`, err.message);
  }
}

async function generateFavicons() {
  const logoPath = path.join(process.cwd(), "logo_natvansh.png");
  if (!fs.existsSync(logoPath)) {
    console.log("  ⏭  Skipping favicon (logo_natvansh.png not found at root)");
    return;
  }

  console.log("\n🎨 Generating favicons...");

  // favicon.ico (32x32)
  await sharp(logoPath)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(APP_DIR, "icon.png"));
  console.log("  ✅ icon.png (32x32)");

  // Apple touch icon (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(APP_DIR, "apple-icon.png"));
  console.log("  ✅ apple-icon.png (180x180)");

  // OG image (1200x630)
  await sharp(logoPath)
    .resize(400, 400, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .extend({
      top: 115,
      bottom: 115,
      left: 400,
      right: 400,
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    })
    .jpeg({ quality: 85 })
    .toFile(path.join(APP_DIR, "opengraph-image.jpg"));
  console.log("  ✅ opengraph-image.jpg (1200x630)");
}

async function main() {
  console.log("🖼️  Optimizing public images...\n");

  console.log("📦 Background textures (max 1920px, quality 75):");
  for (const f of BACKGROUND_IMAGES) {
    await optimizeImage(f, 1920, 75);
  }

  console.log("\n📦 Card/doodle images (max 1200px, quality 78):");
  for (const f of CARD_IMAGES) {
    await optimizeImage(f, 1200, 78);
  }

  console.log("\n📦 Logo images (max 800px, quality 88):");
  for (const f of LOGO_IMAGES) {
    await optimizeImage(f, 800, 88);
  }

  console.log("\n📦 Hero image (max 1920px, quality 72):");
  for (const f of HERO_IMAGES) {
    await optimizeImage(f, 1920, 72);
  }

  console.log("\n📦 Cursor images (max 200px, quality 80):");
  for (const f of CURSOR_IMAGES) {
    await optimizeImage(f, 200, 80);
  }

  await generateFavicons();

  console.log("\n✨ Done! Now update CSS/component references to use .webp files.");
}

main().catch(console.error);
