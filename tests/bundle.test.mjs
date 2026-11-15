import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildPwa } from '../scripts/pwa/build.mjs';
import { auditBundle } from '../scripts/check-bundle.mjs';
async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'goudduo-bundle-'));
  try {
    await mkdir(join(root, 'assets'));
    await writeFile(join(root, 'index.html'), '<html lang="pt-BR"></html>');
    await writeFile(join(root, '_headers'), '/*\n X-Robots-Tag: noindex');
    await writeFile(join(root, 'build-info.json'), JSON.stringify({ target: 'app', commit: 'a'.repeat(40) }));
    await run(root);
  } finally { await rm(root, { recursive: true, force: true }); }
}
test('allowlisted public static artifact is accepted with a hash inventory', () => fixture(async root => {
  const report = await auditBundle(root, 'app'); assert.equal(report.files.length, 3); assert.ok(report.files.every(f => f.sha256.length === 64));
}));
test('source maps and unexpected files block distribution', () => fixture(async root => {
  await writeFile(join(root, 'assets', 'entry.js.map'), '{}');
  await assert.rejects(auditBundle(root, 'app'), /outside allowlist/);
}));
test('laboratory content and credential patterns block the common application', () => fixture(async root => {
  const path = join(root, 'assets', 'entry.js');
  await writeFile(path, 'Visual Lab'); await assert.rejects(auditBundle(root, 'app'), /Lab leaked/);
  await writeFile(path, 'Consumidor técnico P2-B2'); await assert.rejects(auditBundle(root, 'app'), /Lab leaked/);
  await writeFile(path, 'Cenário de Rotinas'); await assert.rejects(auditBundle(root, 'app'), /Lab leaked/);
  await writeFile(path, 'Adicionar prescrição sintética ao rascunho'); await assert.rejects(auditBundle(root, 'app'), /Lab leaked/);
  await writeFile(path, 'Apresentação técnica P2-B7'); await assert.rejects(auditBundle(root, 'app'), /Lab leaked/);
  await writeFile(path, 'technical-pulse-0'); await assert.rejects(auditBundle(root, 'app'), /Lab leaked/);
  await writeFile(path, 'ghp_' + 'x'.repeat(40)); await assert.rejects(auditBundle(root, 'app'), /Forbidden source/);
}));
test('symlinks cannot carry files across the publication boundary', () => fixture(async root => {
  await symlink(join(root, 'index.html'), join(root, 'assets', 'linked.js'));
  await assert.rejects(auditBundle(root, 'app'), /Symlink forbidden/);
}));
test('unapproved worker registration and arbitrary PNGs remain blocked', () => fixture(async root => {
  await writeFile(join(root,'assets','entry.js'),'navigator.serviceWorker.register("/other-sw.js")');
  await assert.rejects(auditBundle(root,'app'),/Unauthorized service worker/);
  await writeFile(join(root,'assets','entry.js'),'');
  await writeFile(join(root,'assets','private.png'),'not authorized');
  await assert.rejects(auditBundle(root,'app'),/outside allowlist/);
}));
test('partial PWA cannot bypass artifact validation', () => fixture(async root => {
  await writeFile(join(root,'manifest.webmanifest'),'{}');
  await assert.rejects(auditBundle(root,'app'),/Incomplete PWA/);
}));

test('complete own PWA passes inventory and cannot leak into Lab', () => fixture(async root => {
  await writeFile(join(root,'assets','entry.js'),'export const app = true;');
  await buildPwa(root);
  const report = await auditBundle(root,'app');
  assert.ok(report.files.some(file=>file.path==='manifest.webmanifest'));
  assert.ok(report.files.some(file=>file.path==='pwa/maskable-512.png'));
  await assert.rejects(auditBundle(root,'lab'),/outside allowlist/);
}));
test('worker bytes and manifest may not diverge from the exact static artifact', () => fixture(async root => {
  await buildPwa(root);
  await writeFile(join(root,'sw.js'),'self.addEventListener("fetch",()=>{});');
  await assert.rejects(auditBundle(root,'app'),/PWA worker differs/);
  await buildPwa(root);
  await writeFile(join(root,'manifest.webmanifest'),'{}');
  await assert.rejects(auditBundle(root,'app'),/PWA worker differs|Unexpected PWA manifest/);
}));
