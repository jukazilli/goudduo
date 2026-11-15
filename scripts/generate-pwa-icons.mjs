// Rasterize only the repository's official SVG; preserve paths, colours and aspect ratio.
import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const source = 'assets/brand/goudduo/goudduo-wordmark-black.svg';
const svg = await readFile(source);
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
const variants = [['icon-192.png',192],['icon-512.png',512],['maskable-192.png',192],['maskable-512.png',512],['apple-touch-icon.png',180]];
await mkdir('assets/pwa', { recursive: true });
for (const [file, size] of variants) {
  const data = await page.evaluate(async ({ source, size }) => {
    const image = new Image(); image.src = source; await image.decode();
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0,0,size,size);
    // The complete unchanged wordmark fits inside the maskable safe circle (80% diameter).
    const width = size * .72, height = width * image.naturalHeight / image.naturalWidth;
    ctx.drawImage(image,(size-width)/2,(size-height)/2,width,height);
    return canvas.toDataURL('image/png').split(',')[1];
  }, { source: `data:image/svg+xml;base64,${svg.toString('base64')}`, size });
  await writeFile(`assets/pwa/${file}`, Buffer.from(data,'base64'));
}
await writeFile('assets/pwa/PROVENANCE.json',JSON.stringify({source,sourceSHA256:createHash('sha256').update(svg).digest('hex'),renderer:`Playwright Chromium ${browser.version()}`,background:'#FFFFFF',wordmarkWidthRatio:.72,modifiedSvg:false,variants:Object.fromEntries(await Promise.all(variants.map(async ([file,size])=>[file,{width:size,height:size,sha256:createHash('sha256').update(await readFile(`assets/pwa/${file}`)).digest('hex')}])))},null,2)+'\n');
await browser.close();
