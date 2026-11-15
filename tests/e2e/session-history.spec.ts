import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
let errors: string[];
test.beforeEach(async ({ page }) => { errors = []; page.on('pageerror', error => errors.push(error.message)); page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); }); });
test.afterEach(() => expect(errors).toEqual([]));
const main = (page: Page) => page.locator('#main-content');
const footer = (page: Page, label: string) => page.locator('.session-core__footer').getByRole('button', { name: label, exact: true });
async function start(page: Page, multi = false) {
  await page.getByRole('button', { name: `Selecionar treino de ${multi ? 'quinta' : 'segunda'}-feira`, exact: true }).click();
  await page.getByRole('button', { name: 'Começar treino', exact: true }).click();
  await expect(page.locator('.session-core[data-session-id]')).toHaveAttribute('data-session-status', 'running');
  return (await page.locator('.session-core[data-session-id]').getAttribute('data-session-id'))!;
}
async function options(page: Page) {
  await page.getByRole('button', { name: 'Mais opções do treino' }).click();
  await expect(page.getByRole('dialog', { name: 'Opções', exact: true })).toHaveCSS('opacity', '1');
}
async function finish(page: Page) {
  await options(page); await page.getByRole('dialog', { name: 'Opções', exact: true }).getByRole('button', { name: 'Finalizar', exact: true }).click();
  await page.getByRole('button', { name: 'Confirmar finalização', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0); await expect(page.getByRole('heading', { name: 'Resumo da sessão', exact: true })).toBeVisible();
}
async function one(page: Page, repetitions = '9') {
  const id = await start(page); await page.getByLabel('Repetições realizadas', { exact: true }).fill(repetitions);
  await page.getByLabel('Carga realizada (kg)', { exact: true }).fill('7.5'); await footer(page, 'Concluir série').click(); await finish(page); return id;
}
async function openHistory(page: Page) { await page.getByRole('link', { name: 'Histórico', exact: true }).click(); await expect(page.getByRole('heading', { name: 'Histórico', exact: true })).toBeVisible(); }
async function detail(page: Page, id: string) {
  await page.locator(`.session-history__list [data-session-id="${id}"] a`).click();
  await expect(page.getByRole('region', { name: 'Resultado da sessão', exact: true })).toHaveAttribute('data-result-id', id);
}
async function accessible(page: Page) {
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
}

test('S2 A: complete session, shared summary, private History, actual detail and honest reload', async ({ page }, info) => {
  await page.goto('/home/treinos'); const id = await one(page, '11');
  await accessible(page); await page.screenshot({ path: info.outputPath('summary-history-entry.png') });
  await openHistory(page); await expect(page.locator('.session-history__list > li')).toHaveCount(1); await accessible(page);
  const link = page.locator(`.session-history__list [data-session-id="${id}"] a`); await link.focus(); await page.keyboard.press('Enter');
  const region = page.getByRole('region', { name: 'Resultado da sessão', exact: true }); await expect(region).toHaveAttribute('data-result-id', id);
  await expect(region.getByText('Série 1: 11 repetições · 7.5 kg', { exact: true })).toBeVisible(); await expect(region.getByText(/1–1 repetições/)).toBeVisible();
  await expect(region).toHaveAttribute('data-revision', '1'); await expect(page.getByRole('textbox')).toHaveCount(0); await accessible(page);
  await page.screenshot({ path: info.outputPath('completed-detail.png') });
  const url = new URL(page.url()); expect(url.pathname).toBe(`/historico/${id}`); expect(url.search).toBe('');
  await page.getByRole('button', { name: 'Voltar', exact: true }).click(); await expect(link).toHaveAttribute('aria-current', 'true'); await expect(link).toBeFocused();
  await page.reload(); await expect(page.getByRole('heading', { name: 'Nenhuma sessão finalizada', exact: true })).toBeVisible();
  await page.goto(`/historico/${id}`); await expect(page.getByRole('heading', { name: 'Resultado indisponível', exact: true })).toBeVisible(); await expect(page.getByText('11 repetições · 7.5 kg', { exact: false })).toHaveCount(0);
});

test('S2 B: skipped and unconfirmed series stay unperformed in partial History and details', async ({ page }, info) => {
  await page.goto('/home/treinos'); const id = await start(page, true);
  await footer(page, 'Concluir série').click(); await footer(page, 'Pular descanso').click(); await footer(page, 'Próxima série').click();
  await page.getByLabel('Repetições realizadas', { exact: true }).fill('99'); await options(page); await page.getByRole('button', { name: 'Pular', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await finish(page); await openHistory(page); await expect(page.locator('.session-history__list')).toContainText('Com séries não realizadas'); await detail(page, id);
  const region = page.getByRole('region', { name: 'Resultado da sessão', exact: true });
  await expect(region.getByText('2 séries não realizadas', { exact: true })).toBeVisible(); await expect(region.getByText('Pulado', { exact: true })).toBeVisible();
  await expect(region.getByText('Série 1: 8 repetições', { exact: true })).toBeVisible(); await expect(region.getByText('Série 2: Não realizada', { exact: true })).toBeVisible();
  await expect(region.getByText('Série 1: Não realizada', { exact: true })).toBeVisible(); await expect(region.getByText('Série 2: 99 repetições', { exact: true })).toHaveCount(0);
  await accessible(page); await page.screenshot({ path: info.outputPath('partial-detail.png') });
});

test('S2 C: five actual sessions keep independent IDs, deterministic order, selection, focus and exact scroll through Back/Forward', async ({ page }) => {
  await page.goto('/home/treinos'); const ids: string[] = [];
  for (let i = 0; i < 5; i++) { ids.push(await one(page, String(9 + i))); if (i < 4) await footer(page, 'Voltar à origem').click(); }
  expect(new Set(ids).size).toBe(5); await openHistory(page);
  expect(await page.locator('.session-history__list > li').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-session-id')))).toEqual([...ids].reverse());
  await main(page).evaluate(element => { element.scrollTop = 200; }); await expect.poll(() => main(page).evaluate(element => element.scrollTop)).toBe(200);
  const selected = page.locator(`.session-history__list [data-session-id="${ids[2]}"] a`), box = await selected.boundingBox(), area = await main(page).boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(area!.y); expect(box!.y + box!.height).toBeLessThanOrEqual(area!.y + area!.height);
  await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2); await expect(page).toHaveURL(new RegExp(`/historico/${ids[2]}$`));
  await page.getByRole('button', { name: 'Voltar', exact: true }).click(); await expect(selected).toHaveAttribute('aria-current', 'true'); await expect(selected).toBeFocused();
  await expect.poll(() => main(page).evaluate(element => element.scrollTop)).toBe(200);
  await page.goForward(); await expect(page).toHaveURL(new RegExp(`/historico/${ids[2]}$`)); await page.goBack(); await expect(selected).toBeFocused();
  await expect.poll(() => main(page).evaluate(element => element.scrollTop)).toBe(200);
});

test('S2 D: newly created prescription can change name/load/repetitions after execution without changing the old result', async ({ page }) => {
  await page.goto('/home/treinos'); await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByRole('tab', { name: 'Dom, dia livre', exact: true }).click(); await page.getByRole('button', { name: 'Adicionar treino', exact: true }).click();
  await page.getByRole('button', { name: 'Adicionar exercício', exact: true }).click(); await page.getByRole('searchbox').fill('demonstração'); await page.locator('[data-exercise-id="demo-exercise"]').click(); await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByLabel('Séries', { exact: true }).fill('1'); await page.getByLabel('Rep min', { exact: true }).fill('6'); await page.getByLabel('Rep max', { exact: true }).fill('10'); await page.getByLabel('Carga (kg)', { exact: true }).fill('5'); await page.getByLabel('Descanso (HH:MM:SS)', { exact: true }).fill('00:00:00');
  async function save(name: string) { await page.getByRole('button', { name: 'Salvar', exact: true }).click(); await page.getByRole('button', { name: 'Salvar assim mesmo', exact: true }).click(); await page.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill(name); await page.getByRole('button', { name: 'Salvar treino', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0); await expect(page).toHaveURL(/\/rotinas$/); }
  await save('Prescrição original S2'); await page.getByRole('link', { name: 'Home', exact: true }).click(); await page.getByRole('button', { name: 'Começar treino', exact: true }).click();
  const id = (await page.locator('.session-core[data-session-id]').getAttribute('data-session-id'))!; await page.getByLabel('Repetições realizadas', { exact: true }).fill('8'); await page.getByLabel('Carga realizada (kg)', { exact: true }).fill('7.5'); await footer(page, 'Concluir série').click(); await finish(page);
  const depth = await page.evaluate(() => window.history.state.depth as number); await footer(page, 'Voltar à origem').click();
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByLabel('Rep min', { exact: true }).fill('20'); await page.getByLabel('Rep max', { exact: true }).fill('22'); await page.getByLabel('Carga (kg)', { exact: true }).fill('40'); await save('Prescrição revisada S2');
  // Native browser history traversal to the existing summary entry; never goto/reload or inject application data.
  await page.evaluate(targetDepth => window.history.go(targetDepth - (window.history.state.depth as number)), depth); await expect(page).toHaveURL(new RegExp(`/sessao/${id}$`));
  await openHistory(page); await detail(page, id); const region = page.getByRole('region', { name: 'Resultado da sessão', exact: true });
  await expect(region.getByRole('heading', { name: 'Prescrição original S2', exact: true })).toBeVisible(); await expect(region).toHaveAttribute('data-revision', '1');
  await expect(region.getByText(/6–10 repetições · 5 kg/)).toBeVisible(); await expect(region.getByText('Série 1: 8 repetições · 7.5 kg', { exact: true })).toBeVisible(); await expect(region.getByText('Prescrição revisada S2', { exact: true })).toHaveCount(0);
});

test('S2 E: active/discarded sessions never gain completed results; empty memory, safe areas and missing routes stay honest', async ({ page }) => {
  await page.goto('/historico'); await expect(page.getByRole('heading', { name: 'Nenhuma sessão finalizada', exact: true })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.evaluate(() => { document.documentElement.style.setProperty('--safe-top', '24px'); document.documentElement.style.setProperty('--safe-bottom', '20px'); });
  await expect(main(page)).toHaveCSS('padding-bottom', '20px'); await expect(main(page)).not.toHaveAttribute('data-safe-top'); await expect(page.getByRole('banner')).toHaveCount(1); await accessible(page);
  await page.getByRole('button', { name: 'Voltar', exact: true }).click(); await page.getByRole('link', { name: 'Home', exact: true }).click(); const id = await start(page);
  await expect(page.getByRole('link', { name: 'Ver resultado', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Voltar', exact: true }).click(); await page.getByRole('button', { name: 'Retomar treino', exact: true }).click(); await expect(page.locator('.session-core[data-session-id]')).toHaveAttribute('data-session-id', id);
  await options(page); await page.getByRole('button', { name: 'Descartar sessão', exact: true }).click(); await page.getByRole('button', { name: 'Confirmar descarte', exact: true }).click(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Ver resultado', exact: true })).toHaveCount(0); await openHistory(page); await expect(page.getByRole('heading', { name: 'Nenhuma sessão finalizada', exact: true })).toBeVisible();
  await page.goto('/historico/missing'); await expect(page.getByRole('heading', { name: 'Resultado indisponível', exact: true })).toBeVisible(); const link = page.getByRole('link', { name: 'Histórico', exact: true }); await link.focus(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(/\/historico$/);
  await page.goto('/historico/bad%2Fid'); await expect(page.getByRole('heading', { name: 'Página não encontrada', exact: true })).toBeVisible();
});
