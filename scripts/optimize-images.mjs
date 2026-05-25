// scripts/optimize-images.mjs
// Compresses all images in public/images/ in-place using sharp.
// Run: node scripts/optimize-images.mjs

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const IMG_DIR = 'public/images';
const MAX_WIDTH = 1200;   // more than enough for any display
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;
const WEBP_QUALITY = 82;

const files = await readdir(IMG_DIR);
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const ext = file.split('.').pop().toLowerCase();
  if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;

  const path = join(IMG_DIR, file);
  const before = (await stat(path)).size;
  totalBefore += before;

  try {
    const img = sharp(path);
    const meta = await img.metadata();
    const pipeline = meta.width > MAX_WIDTH ? img.resize(MAX_WIDTH) : img;

    if (ext === 'png') {
      await pipeline
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toBuffer()
        .then(buf => require('fs').writeFileSync(path, buf));
    } else if (ext === 'jpeg' || ext === 'jpg') {
      await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer()
        .then(buf => require('fs').writeFileSync(path, buf));
    } else if (ext === 'webp') {
      await pipeline
        .webp({ quality: WEBP_QUALITY })
        .toBuffer()
        .then(buf => require('fs').writeFileSync(path, buf));
    }

    const after = (await stat(path)).size;
    totalAfter += after;
    const saved = (((before - after) / before) * 100).toFixed(0);
    console.log(`✓ ${file.padEnd(48)} ${(before/1024).toFixed(0).padStart(6)}KB → ${(after/1024).toFixed(0).padStart(6)}KB  (-${saved}%)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log('');
console.log(`Total: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (saved ${((totalBefore-totalAfter)/1024/1024).toFixed(1)}MB)`);
