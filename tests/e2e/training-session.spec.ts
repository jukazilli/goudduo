import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
let errors: string[];
test.beforeEach(async ({ page }) => { errors = []; page.on('pageerror', error => errors.push(error.message)); page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); }); });
test.afterEach(() => expect(errors).toEqual([]));
async function start(page: Page, multi = true) {
  await page.goto('/home/treinos'); if (multi) await page.getByRole('button', { name: 'Selecionar treino de quinta-feira' }).click();
  await page.getByRole('button', { name: 'Começar treino', exact: true }).click();
  await expect(page.locator('.session-core[data-session-id]')).toHaveAttribute('data-session-status', 'running');
  return page.locator('.session-core[data-session-id]');
}
async function options(page: Page) { await page.getByRole('button', { name: 'Mais opções do treino', exact: true }).click(); return page.getByRole('dialog', { name: 'Opções', exact: true }); }
async function close(page: Page) { await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0); }
const footer = (page: Page, label: string) => page.locator('.session-core__footer').getByRole('button', { name: label, exact: true });
const count = async (page: Page, label: string) => page.getByText(label, { exact: true }).evaluate(e => e.nextElementSibling?.textContent);

test('S1 A: execute explicit sets, rest in media region, complete and summarize only actual data', async ({ page }, info) => {
  const surface = await start(page); const id = await surface.getAttribute('data-session-id');
  expect(new URL(page.url()).pathname).toBe(`/sessao/${id}`); expect(id).not.toBe('demo-primary-thu'); await expect(surface).toHaveAttribute('data-revision', '1');
  await expect(page.getByRole('banner')).toHaveCount(1); await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toHaveCount(0);
  await page.getByLabel('Carga realizada (kg)', { exact: true }).pressSequentially('7.5');
  await expect(page.getByLabel('Carga realizada (kg)', { exact: true })).toHaveValue('7.5');
  const stage = page.locator('.session-core__stage'), before = await stage.boundingBox();
  await page.screenshot({ path: info.outputPath('session-running.png') });
  await footer(page, 'Concluir série').click(); await expect(stage).toHaveAttribute('data-stage', 'rest');
  expect((await stage.boundingBox())!.height).toBe(before!.height); await expect(page.getByLabel('Tempo de descanso', { exact: true })).toHaveText(/00:00:\d\d|00:01:00/);
  await page.screenshot({ path: info.outputPath('session-rest.png') });
  await footer(page, 'Pular descanso').click(); await footer(page, 'Próxima série').click(); await footer(page, 'Concluir série').click();
  await footer(page, 'Pular descanso').click(); await footer(page, 'Próximo exercício').click();
  await page.getByLabel('Tempo realizado (s)', { exact: true }).fill('45'); await footer(page, 'Concluir série').click();
  await expect(page.getByRole('heading', { name: 'Resumo da sessão' })).toHaveCount(0); // never auto-finish
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await footer(page, 'Finalizar').click(); await page.getByRole('button', { name: 'Confirmar finalização', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0); await expect(page.getByRole('heading', { name: 'Resumo da sessão' })).toBeVisible();
  await expect(footer(page, 'Voltar à origem')).toBeFocused();
  expect(await count(page, 'Séries realizadas')).toBe('3'); expect(await count(page, 'Exercícios pulados')).toBe('0');
  await expect(page.getByText('Série 1: 8 repetições · 7.5 kg', { exact: true })).toBeVisible(); await expect(page.getByText('Série 1: 45 s', { exact: true })).toBeVisible();
  await expect(page.getByText('Resumo transitório em memória.', { exact: true })).toBeVisible(); await expect(footer(page, 'Concluir série')).toHaveCount(0);
  await page.screenshot({ path: info.outputPath('session-summary.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test('S1 B: deterministic pause freezes active and rest time and resumes the same session', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-15T12:00:00Z') });
  const surface = await start(page), id = await surface.getAttribute('data-session-id');
  await footer(page, 'Concluir série').click(); await page.clock.fastForward(5000);
  await options(page); await page.getByRole('button', { name: 'Pausar', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(surface).toHaveAttribute('data-session-status', 'paused');
  const elapsed = await page.getByLabel('Tempo ativo', { exact: true }).getAttribute('data-active-ms'), rest = await page.getByLabel('Tempo de descanso', { exact: true }).textContent();
  await page.clock.fastForward(60000); await expect(page.getByLabel('Tempo ativo', { exact: true })).toHaveAttribute('data-active-ms', elapsed!); await expect(page.getByLabel('Tempo de descanso', { exact: true })).toHaveText(rest!);
  await expect(page.getByLabel('Repetições realizadas', { exact: true })).toBeDisabled(); await footer(page, 'Retomar').click();
  await page.clock.fastForward(1000); await expect(surface).toHaveAttribute('data-session-id', id!); await expect(surface).toHaveAttribute('data-session-status', 'resting');
  await expect.poll(async () => Number(await page.getByLabel('Tempo ativo', { exact: true }).getAttribute('data-active-ms'))).toBeGreaterThan(Number(elapsed));
  await page.clock.fastForward(60000); await expect(surface).toHaveAttribute('data-session-status', 'running');
});

test('S1 C: map reorder retains records/active identity and partial finish does not complete skipped series', async ({ page }, info) => {
  const surface = await start(page), id = await surface.getAttribute('data-session-id');
  await footer(page, 'Concluir série').click(); await footer(page, 'Pular descanso').click();
  await page.getByRole('button', { name: 'Mapa do treino', exact: true }).click();
  await page.getByRole('button', { name: 'Opções do mapa', exact: true }).click(); await page.getByRole('button', { name: 'Reordenar', exact: true }).click();
  const move = page.getByRole('button', { name: 'Mover Exercício sintético por tempo para cima', exact: true }); await move.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('.session-core__map > li').first()).toContainText('Exercício sintético por tempo');
  await page.screenshot({ path: info.outputPath('session-map.png') }); await close(page);
  await expect(page.getByRole('heading', { name: 'Exercício de demonstração', exact: true })).toBeVisible();
  await options(page); await page.getByRole('button', { name: 'Pular', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Exercício sintético por tempo', exact: true })).toBeVisible();
  await options(page); await page.getByRole('button', { name: 'Finalizar', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Finalizar sessão?', exact: true })).toBeVisible(); await expect(page.getByRole('heading', { name: 'Resumo da sessão' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Confirmar finalização', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Resumo da sessão', exact: true })).toBeFocused();
  await expect(page.locator('[data-session-id]')).toHaveAttribute('data-session-id', id!); expect(await count(page, 'Séries realizadas')).toBe('1'); expect(await count(page, 'Exercícios pulados')).toBe('1');
});

test('S1 D: leave, edit saved prescription and resume the unchanged snapshot by independent ID', async ({ page }) => {
  const surface = await start(page, false), id = await surface.getAttribute('data-session-id');
  await page.getByLabel('Carga realizada (kg)', { exact: true }).fill('12.5'); await page.getByRole('button', { name: 'Voltar', exact: true }).click();
  await expect(page).toHaveURL(/\/home\/treinos$/); await expect(page.getByRole('button', { name: 'Retomar treino', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByLabel('Séries', { exact: true }).fill('4'); await page.getByRole('button', { name: 'Salvar', exact: true }).click(); await page.getByRole('button', { name: 'Salvar assim mesmo', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill('Prescrição revisada'); await page.getByRole('button', { name: 'Salvar treino', exact: true }).click();
  await expect(page).toHaveURL(/\/rotinas$/); await expect(page.getByRole('dialog')).toHaveCount(0); await page.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.locator('.home-training-v53__hero')).toHaveAttribute('data-revision', '2'); await page.getByRole('button', { name: 'Retomar treino', exact: true }).click();
  await expect(surface).toHaveAttribute('data-session-id', id!); await expect(surface).toHaveAttribute('data-revision', '1');
  await expect(page.getByRole('group', { name: 'Séries prescritas' }).getByRole('button')).toHaveCount(1); await expect(page.getByLabel('Carga realizada (kg)', { exact: true })).toHaveValue('12.5');
  const url = new URL(page.url()); expect(url.search).toBe(''); expect(url.pathname).toBe(`/sessao/${id}`); expect(url.pathname).not.toContain('Prescri');
  await page.goBack(); await expect(page).toHaveURL(/\/home\/treinos$/); await page.goForward(); await expect(surface).toHaveAttribute('data-session-status', 'paused');
});

test('S1 E: double click, conflicting active session, unavailable substitute, confirmed discard and reload safety', async ({ page }) => {
  const surface = await start(page, false), id = await surface.getAttribute('data-session-id');
  await footer(page, 'Concluir série').dblclick(); await expect(page.getByRole('button', { name: 'Série 1, realizada', exact: true })).toBeVisible();
  await options(page); await expect(page.getByRole('button', { name: 'Substituir', exact: true })).toBeDisabled(); await close(page);
  await page.getByRole('button', { name: 'Voltar', exact: true }).click(); await page.getByRole('button', { name: 'Selecionar treino de quinta-feira' }).click(); await page.getByRole('button', { name: 'Começar treino', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Treino em andamento', exact: true })).toBeVisible(); await page.getByRole('button', { name: 'Retomar treino atual', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(surface).toHaveAttribute('data-session-id', id!); await options(page); await page.getByRole('button', { name: 'Descartar sessão', exact: true }).click();
  await page.getByRole('button', { name: 'Continuar sessão', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0); await expect(surface).toHaveAttribute('data-session-status', 'running');
  await options(page); await page.getByRole('button', { name: 'Descartar sessão', exact: true }).click(); await page.getByRole('button', { name: 'Confirmar descarte', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Sessão descartada', exact: true })).toBeFocused(); await expect(footer(page, 'Retomar')).toHaveCount(0);
  await page.reload(); await expect(page.locator('[data-session-id]')).toHaveCount(0); await expect(page.getByText('Esta superfície ainda não está disponível.', { exact: true })).toBeVisible();
  await page.goto('/sessao/inexistente'); await expect(footer(page, 'Concluir série')).toHaveCount(0); await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('S1 F: native touch intent, focus, keyboard, reduced motion and single safe-area ownership', async ({ page }) => {
  await start(page);
  const stage = page.locator('.session-core__stage'); const box = await stage.boundingBox();
  const client = await page.context().newCDPSession(page);
  const origin = { x: box!.x + box!.width * .8, y: box!.y + box!.height / 2 };
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [origin] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: origin.x - 100, y: origin.y + 2 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.getByRole('heading', { name: 'Exercício sintético por tempo', exact: true })).toBeVisible();
  const next = await stage.boundingBox(), point = { x: next!.x + next!.width / 2, y: next!.y + 30 };
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: point.x + 4, y: point.y + 80 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await client.detach();
  await expect(page.getByRole('heading', { name: 'Exercício sintético por tempo', exact: true })).toBeVisible();
  await page.evaluate(() => { for (const [key, value] of Object.entries({ '--safe-top': '24px', '--safe-bottom': '20px', '--safe-left': '8px', '--safe-right': '8px' })) document.documentElement.style.setProperty(key, value); });
  await expect(page.locator('#main-content')).not.toHaveAttribute('data-safe-top');
  const primary = footer(page, 'Concluir série'); await primary.scrollIntoViewIfNeeded(); const bounds = await primary.boundingBox();
  expect(bounds!.height).toBeGreaterThanOrEqual(44); expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(824);
  expect(await page.getByLabel('Tempo realizado (s)', { exact: true }).evaluate(e => Number.parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(16);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.emulateMedia({ reducedMotion: 'reduce' }); const help = page.getByRole('button', { name: 'Ajuda da sessão', exact: true });
  await help.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Ajuda da sessão', exact: true })).toBeFocused();
  await expect(page.getByText('Tempo prescrito', { exact: true })).toBeVisible(); await expect(page.getByText('30 s', { exact: true })).toBeVisible();
  await expect(page.locator('#root')).toHaveJSProperty('inert', true); await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await close(page); await expect(help).toBeFocused();
  await options(page); expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]); await close(page);
});
