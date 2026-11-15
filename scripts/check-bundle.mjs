import { icons, workerSource, hash } from './pwa/build.mjs';
import { readdir, readFile, lstat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
const target = process.argv[2] ?? 'app';
if (!['app', 'lab'].includes(target)) throw new Error('Unknown bundle target');
const root = resolve(`dist/${target}`);
export async function auditBundle(directory, bundleTarget) {
  const entries = await readdir(directory, { recursive: true, withFileTypes: true });
  const files = [];
  const pwaFiles = ['manifest.webmanifest','sw.js',...icons.map(name => `pwa/${name}`)];
  const hasPwa = entries.some(entry => entry.isFile() && pwaFiles.includes(relative(directory, resolve(entry.parentPath, entry.name)).replaceAll('\\','/')));
  for (const entry of entries) {
    const path = resolve(entry.parentPath, entry.name), name = relative(directory, path).replaceAll('\\', '/');
    if ((await lstat(path)).isSymbolicLink()) throw new Error(`Symlink forbidden: ${name}`);
    if (!entry.isFile()) continue;
    if (!['index.html', '_headers', 'build-info.json', 'third-party-notices.txt'].includes(name) && !(bundleTarget === 'app' && pwaFiles.includes(name)) && !/^assets\/[A-Za-z0-9_-]+\.(js|css|woff2?|svg)$/.test(name)) throw new Error(`File outside allowlist: ${name}`);
    const bytes = await readFile(path);
    if (bytes.length > 25 * 1024 * 1024) throw new Error(`Asset larger than 25 MiB: ${name}`);
    if (/\.(js|css|html|json|svg)$/.test(name)) {
      const text = bytes.toString('utf8');
      if (/gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|GODUOIT|DUPPLLA|Gooduu|sourceMappingURL/i.test(text)) throw new Error(`Forbidden source/content: ${name}`);
      if (/serviceWorker\.register/.test(text) && (bundleTarget !== 'app' || !hasPwa || [...text.matchAll(/serviceWorker\.register\s*\(([^,)]+)/g)].some(match => !/^["']\/sw\.js["']$/.test(match[1].trim())))) throw new Error(`Unauthorized service worker: ${name}`);
      if (bundleTarget === 'app' && /Visual Lab|Inspetor do Visual Lab|Nome sintético do cenário|Cenário longo de scroll|Consumidor técnico P2-B2|Campo técnico de foco|Cenário de Rotinas|Adicionar prescrição sintética ao rascunho|Cenário técnico de Pulse|Apresentação técnica P2-B7|technical-pulse-/.test(text)) throw new Error(`Lab leaked into app: ${name}`);
    }
    files.push({ path: name, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  if (!files.some(f => f.path === 'index.html') || !files.some(f => f.path === 'build-info.json') || !files.some(f => f.path === '_headers')) throw new Error('Incomplete build');
  const info = JSON.parse(await readFile(resolve(directory, 'build-info.json'), 'utf8'));
  if (info.target !== bundleTarget || !/^[a-f0-9]{40}$/.test(info.commit)) throw new Error('Build metadata mismatch');
  if (hasPwa) {
    if (bundleTarget !== 'app' || !pwaFiles.every(name => files.some(file => file.path === name))) throw new Error('Incomplete PWA');
    if (await readFile(resolve(directory, 'sw.js'), 'utf8') !== await workerSource(directory)) throw new Error('PWA worker differs from verified static inventory');
    if (await readFile(resolve(directory, 'manifest.webmanifest'),'utf8') !== await readFile('scripts/pwa/manifest.json','utf8')) throw new Error('Unexpected PWA manifest');
    for (const name of icons) {
      const bytes=await readFile(resolve(directory, 'pwa', name));
      const size=name.startsWith('apple') ? 180 : name.includes('192') ? 192 : 512;
      if (bytes.subarray(0,8).toString('hex') !== '89504e470d0a1a0a' || bytes.readUInt32BE(16) !== size || bytes.readUInt32BE(20) !== size || hash(bytes) !== hash(await readFile(`assets/pwa/${name}`))) throw new Error(`Unexpected PWA icon: ${name}`);
    }
  }
  return { target: bundleTarget, files: files.sort((a,b) => a.path.localeCompare(b.path)), totalBytes: files.reduce((n, f) => n + f.bytes, 0) };
}
if (process.argv[1] && resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  const report = await auditBundle(root, target);
  console.log(JSON.stringify(report, null, 2));
}
