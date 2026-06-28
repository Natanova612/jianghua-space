import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const casesDir = path.resolve(__dirname, '../public/images/cases');

// Dynamic import sharp from project root so it resolves the transitive dependency
const sharpModule = await import('sharp');
const sharp = sharpModule.default || sharpModule;

const files = await fs.readdir(casesDir);
const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;
const JPEG_QUALITY = 85;

let totalBefore = 0;
let totalAfter = 0;

for (const file of imageFiles) {
  const inputPath = path.join(casesDir, file);
  const stat = await fs.stat(inputPath);
  totalBefore += stat.size;

  let pipeline = sharp(inputPath).resize({
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
    fit: 'inside',
    withoutEnlargement: true,
  });

  const ext = path.extname(file).toLowerCase();
  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const tempPath = `${inputPath}.tmp`;
  await pipeline.toFile(tempPath);
  await fs.rename(tempPath, inputPath);

  const newStat = await fs.stat(inputPath);
  totalAfter += newStat.size;

  const saved = stat.size - newStat.size;
  const savedPercent = ((saved / stat.size) * 100).toFixed(1);
  console.log(`${file}: ${(stat.size / 1024).toFixed(1)}KB -> ${(newStat.size / 1024).toFixed(1)}KB (${savedPercent}% saved)`);
}

console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
