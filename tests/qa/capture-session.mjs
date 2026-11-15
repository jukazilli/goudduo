import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const out = 'docs/integration/p3s1/evidence'; await mkdir(out, { recursive: true });
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const report = { browser: browser.version(), reference: 'Owner direction, not pixel parity with private candidate v0.3. No private captures or media included.', viewports: [] };
for (const width of [320,375,390,414,430]) {
  const context = await browser.newContext({ viewport: { width, height: 844 }, hasTouch: true, deviceScaleFactor: 1 });
  const page = await context.newPage(); const row = { width, states: [], errors: [] };
  page.on('pageerror', error => row.errors.push(error.message));
  await page.goto('http://127.0.0.1:4191/home/treinos'); await page.evaluate(() => document.fonts.ready);
  await page.getByRole('button', { name: 'Selecionar treino de quinta-feira' }).click(); await page.getByRole('button', { name: 'Começar treino', exact: true }).click();
  const sessionId = await page.locator('[data-session-id]').getAttribute('data-session-id');
  async function capture(name) {
    console.log(JSON.stringify({ width, state: name }));
    if (name === 'map') await expect(page.getByRole('dialog')).toHaveAccessibleName('Mapa do treino');
    if (name === 'finish-confirmation') await expect(page.getByRole('dialog')).toHaveAccessibleName('Finalizar sessão?');
    const backdrop = page.getByTestId('overlay-backdrop');
    if (await backdrop.count()) {
      await backdrop.evaluate(async element => { await Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => undefined))); });
      await expect(backdrop).toHaveCSS('opacity', '1');
      await expect(page.getByRole('dialog')).toHaveCSS('opacity', '1');
    }
    const axe = await new AxeBuilder({ page }).analyze(); expect(axe.violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    const file = `${name}-${width}.png`; await page.screenshot({ path: `${out}/${file}` });
    const geometry = await page.evaluate(() => Object.fromEntries(['.app-header','#main-content','.surface-footer','.session-core__stage','[role=dialog]'].map(selector => {
      const element = document.querySelector(selector); return [selector, element ? { box: element.getBoundingClientRect().toJSON(), padding: getComputedStyle(element).padding } : null];
    })));
    row.states.push({ name, file, sha256: createHash('sha256').update(await readFile(`${out}/${file}`)).digest('hex'), violations: axe.violations.length, geometry });
  }
  const footer = name => page.locator('.session-core__footer').getByRole('button', { name, exact: true });
  await capture('running'); await footer('Concluir série').click(); await expect(page.locator('.session-core__stage')).toHaveAttribute('data-stage','rest'); await capture('rest');
  await page.getByRole('button', { name: 'Mais opções do treino' }).click(); await page.getByRole('button', { name: 'Pausar', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0); await capture('paused');
  await footer('Retomar').click(); await footer('Pular descanso').click(); await page.getByRole('button', { name: 'Mapa do treino', exact: true }).click(); await capture('map');
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Mais opções do treino' }).click(); await page.getByRole('button', { name: 'Finalizar', exact: true }).click(); await capture('finish-confirmation');
  await page.getByRole('button', { name: 'Confirmar finalização', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0); await expect(page.getByRole('heading', { name: 'Resumo da sessão', exact: true })).toBeFocused(); await capture('summary');
  expect(row.states.find(state => state.name === 'running').geometry['.session-core__stage'].box.height).toBe(228);
  expect(row.states.find(state => state.name === 'rest').geometry['.session-core__stage'].box.height).toBe(228);
  await page.reload(); await expect(page.locator('[data-session-id]')).toHaveCount(0); await capture('reload-unavailable');
  row.sessionId = sessionId; expect(row.errors).toEqual([]); report.viewports.push(row); await context.close();
}
await browser.close();
const sources = ['src/domain/session.ts','src/state/session.ts','src/app/useTrainingSession.ts','src/surfaces/session/TrainingSession.tsx','src/surfaces/session/session.css','src/app/PrototypeApp.tsx','src/app/AppShell.tsx'];
report.sourcesSHA256 = Object.fromEntries(await Promise.all(sources.map(async path => [path,createHash('sha256').update(await readFile(path)).digest('hex')])));
await writeFile(`${out}/measurements.json`, `${JSON.stringify(report,null,2)}\n`);
console.log(JSON.stringify({ viewports: 5, captures: 35, axeScans: 35, pageErrors: 0 }));
