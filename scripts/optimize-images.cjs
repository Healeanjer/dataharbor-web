// Original PNGs stay unchanged and remain the zoom-dialog source.
const sharp = require('sharp');
const fs = require('node:fs');
(async () => {
  for (const file of fs.readdirSync('public/media/screens').filter(f => f.endsWith('.png'))) {
    const source = `public/media/screens/${file}`;
    await sharp(source).webp({ lossless: true, effort: 6 }).toFile(source.replace('.png', '.webp'));
    await sharp(source).resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6 }).toFile(source.replace('.png', '-720.webp'));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
