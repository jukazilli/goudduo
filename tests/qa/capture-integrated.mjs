// Local-only evidence collector. Serve immutable public references on the ports below.
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const output = 'docs/integration/p2b8/evidence';
await mkdir(output, { recursive: true });
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
// Fail before capture if either local server serves a reconstructed/wrong reference.
for (const [url, expected] of [
  ['http://127.0.0.1:4299/', '7cb2bedd0af72c09c703337f889e94cb4e223ab9d5ff6104b584d62895ffb18f'],
  ['http://127.0.0.1:4298/', '42ac581d3c76a3852da221ba68495025bbfa26f2d96aeda9c43ba0261a5a849d'],
]) {
  const response = await fetch(url); expect(response.ok).toBe(true);
  expect(hash(Buffer.from(await response.arrayBuffer()))).toBe(expected);
}
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const report = { browser: browser.version(), viewports: [], references: {
  home: { commit: '073183253fce5fcd0b3474c725e84ff67d3dfec5', blob: '8c698708dd79449472d6f5c7e536664939de4951' },
  routines: { commit: '3f8b2c7c93a33a713c780305e672e1ec7998ceaf', blob: '122275b3cb03bd996b477375d1bbc73ae29c5c3e' },
}, normalization: 'Raw captures preserved. Paired references load only public Plus Jakarta Sans FontFaces; Home font-family is normalized explicitly. No layout/chrome/CSS algorithm copied or changed. Different legitimate synthetic prescriptions are not equivalent text fixtures.' };
for (const width of [320, 375, 390, 414, 430]) {
  const options = { viewport: { width, height: 844 }, hasTouch: true, deviceScaleFactor: 1 };
  const context = await browser.newContext(options);
  const app = await context.newPage(), home = await context.newPage(), routines = await context.newPage();
  const record = { width, states: [], accessibility: [], errors: [] };
  for (const page of [app, home, routines]) page.on('pageerror', error => record.errors.push(error.message));
  async function capture(page, selector, name) {
    const locator = page.locator(selector), file = `${name}-${width}.png`;
    await locator.screenshot({ path: `${output}/${file}` });
    const metrics = await locator.evaluate(e => ({ box: e.getBoundingClientRect().toJSON(), scrollWidth: e.scrollWidth, clientWidth: e.clientWidth, radius: getComputedStyle(e).borderRadius }));
    record.states.push({ file, sha256: hash(await readFile(`${output}/${file}`)), metrics });
  }
  async function axe(name) {
    const result = await new AxeBuilder({ page: app }).analyze();
    expect(result.violations).toEqual([]);
    record.accessibility.push({ name, violations: result.violations.length, passes: result.passes.length });
    expect(await app.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  }
  await home.goto('http://127.0.0.1:4299/'); await routines.goto('http://127.0.0.1:4298/');
  await capture(home, '#screen', 'reference-raw-home'); await capture(routines, '.gd-content', 'reference-raw-routines');
  for (const page of [home, routines]) await page.evaluate(async () => {
    for (const weight of [400, 500, 600, 700, 800]) { const font = new FontFace('Plus Jakarta Sans', `url(/fonts/plus-jakarta-sans-latin-${weight}-normal.woff2)`, { weight: String(weight) }); await font.load(); document.fonts.add(font); }
    await document.fonts.ready;
  });
  await home.addStyleTag({ content: '#homeView, #homeView button, #homeView input {font-family:"Plus Jakarta Sans",sans-serif}' });
  await app.goto('http://127.0.0.1:4189/home/treinos'); await app.evaluate(() => document.fonts.ready);
  await capture(home, '#screen', 'reference-home'); await capture(app, '#main-content', 'react-home'); await axe('home');
  await app.getByRole('link', { name: 'Rotinas', exact: true }).click();
  await capture(routines, '.gd-content', 'reference-routines'); await capture(app, '#main-content', 'react-routines'); await axe('routines');
  await routines.locator('[data-action="expand"][data-id="r1"]').click();
  await routines.locator('[data-action="inline-day"][data-id="r1"][data-day="6"]').click();
  await routines.locator('[data-action="workout-from-card"][data-id="r1"]').click();
  await app.getByRole('button', { name: 'Expandir Rotina de demonstração', exact: true }).click();
  await app.getByRole('tab', { name: 'Dom, dia livre', exact: true }).click();
  await app.getByRole('button', { name: 'Adicionar treino', exact: true }).click();
  await capture(routines, '.gd-content', 'reference-editor-empty'); await capture(app, '#main-content', 'react-editor-empty'); await axe('editor-empty');
  await routines.locator('[data-action="open-exercise-library"]').click();
  await app.getByRole('button', { name: 'Adicionar exercício', exact: true }).click();
  await capture(routines, '.gd-ex-library', 'reference-library'); await capture(app, '[role=dialog]', 'react-library'); await axe('library');
  const dialog = app.getByRole('dialog');
  expect((await dialog.boundingBox()).height).toBeCloseTo(844 * .75, 0);
  await expect(app.locator('#root')).toHaveJSProperty('inert', true);
  await expect(app.locator('body')).toHaveCSS('overflow', 'hidden');
  await app.keyboard.press('Escape'); await expect(dialog).toHaveCount(0);
  await expect(app.getByRole('button', { name: 'Adicionar exercício', exact: true })).toBeFocused();
  expect(record.errors).toEqual([]); report.viewports.push(record);
  await context.close();
}
await browser.close();
await writeFile(`${output}/measurements.json`, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ captures: report.viewports.reduce((sum, row) => sum + row.states.length, 0), axeScans: 20, viewports: 5, pageErrors: 0 }));
