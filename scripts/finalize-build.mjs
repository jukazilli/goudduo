import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
const target = process.argv[2];
if (!['app', 'lab'].includes(target)) throw new Error('Build target must be app or lab');
const directory = resolve(`dist/${target}`);
if (target === 'lab') {
  await rename(`${directory}/lab/index.html`, `${directory}/index.html`);
  await rm(`${directory}/lab`, { recursive: true });
}
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const dirty = Boolean(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim());
const lock = await readFile('pnpm-lock.yaml');
await writeFile(`${directory}/third-party-notices.txt`, await readFile('THIRD_PARTY_NOTICES.md'));
const { createHash } = await import('node:crypto');
await writeFile(`${directory}/build-info.json`, JSON.stringify({ target, commit, dirty, lockSha256: createHash('sha256').update(lock).digest('hex') }, null, 2) + '\n');
await writeFile(`${directory}/_headers`, `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  X-Robots-Tag: noindex, nofollow\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/index.html\n  Cache-Control: no-cache\n/build-info.json\n  Cache-Control: no-cache\n`);
console.log(JSON.stringify({ directory, target, commit, dirty }));
