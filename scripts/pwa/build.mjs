import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
export const icons = ['icon-192.png','icon-512.png','maskable-192.png','maskable-512.png','apple-touch-icon.png'];
export const hash = value => createHash('sha256').update(value).digest('hex');
export const mime = name => name.endsWith('.html') ? 'text/html' : name.endsWith('.webmanifest') ? 'application/manifest+json' : name.endsWith('.png') ? 'image/png' : name.endsWith('.js') ? 'text/javascript' : name.endsWith('.css') ? 'text/css' : name.endsWith('.svg') ? 'image/svg+xml' : name.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
export async function inventory(directory) {
  const files = ['index.html','manifest.webmanifest',...icons.map(name=>`pwa/${name}`),...(await readdir(`${directory}/assets`)).map(name=>`assets/${name}`)].sort();
  return Promise.all(files.map(async name=>({url:`/${name}`,type:mime(name),sha256:hash(await readFile(`${directory}/${name}`))})));
}
export async function workerSource(directory) {
  const assets=await inventory(directory), info=JSON.parse(await readFile(`${directory}/build-info.json`,'utf8'));
  const build={version:hash(JSON.stringify({assets,commit:info.commit})),assets};
  return `/* goudduo app cache; generated from this exact static artifact. */\nconst BUILD = ${JSON.stringify(build)};\n`+await readFile('scripts/pwa/worker.js','utf8');
}
export async function buildPwa(directory) {
  await mkdir(`${directory}/pwa`,{recursive:true});
  await copyFile('scripts/pwa/manifest.json',`${directory}/manifest.webmanifest`);
  for(const name of icons) await copyFile(`assets/pwa/${name}`,`${directory}/pwa/${name}`);
  await writeFile(`${directory}/sw.js`,await workerSource(directory));
}
