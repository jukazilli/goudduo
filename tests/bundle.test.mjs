import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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
  await writeFile(path, 'ghp_' + 'x'.repeat(40)); await assert.rejects(auditBundle(root, 'app'), /Forbidden source/);
}));
test('symlinks cannot carry files across the publication boundary', () => fixture(async root => {
  await symlink(join(root, 'index.html'), join(root, 'assets', 'linked.js'));
  await assert.rejects(auditBundle(root, 'app'), /Symlink forbidden/);
}));
