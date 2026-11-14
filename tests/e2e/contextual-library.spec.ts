import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
let errors: string[];
test.beforeEach(async ({ page }) => {
  errors = []; page.on('pageerror', error => errors.push(error.message)); page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
});
test.afterEach(() => expect(errors).toEqual([]));
async function editor(page: Page, day = 'Dom, dia livre') {
  await page.goto('/rotinas'); await page.getByRole('button', { name: 'Expandir Rotina de demonstração', exact: true }).click();
  const region = page.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
  await region.getByRole('tab', { name: day, exact: true }).click();
  await region.getByRole('button', { name: day.includes('livre') ? 'Adicionar treino' : 'Ver treino', exact: true }).click();
}
async function library(page: Page) {
  await page.getByRole('button', { name: 'Adicionar exercício', exact: true }).click();
  await expect(page.getByRole('searchbox', { name: 'Pesquisar exercícios na biblioteca' })).toBeFocused();
  return page.getByRole('dialog', { name: 'Adicionar exercício', exact: true });
}
async function add(page: Page, query: string, id: string) {
  await page.getByRole('searchbox').fill(query); const result = page.locator(`[data-exercise-id="${id}"]`);
  await result.click(); await expect(result).toHaveAttribute('aria-disabled', 'true');
  await expect(page.getByRole('dialog', { name: 'Adicionar exercício', exact: true })).toBeVisible();
  await expect(page.getByText('Adicionado', { exact: true })).toBeVisible();
}
async function close(page: Page) { await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0); }
async function configure(page: Page, measurement: 'repetitions' | 'time' | 'distance' = 'repetitions') {
  await page.getByLabel('Séries', { exact: true }).fill('3');
  await page.getByLabel('Descanso (HH:MM:SS)', { exact: true }).fill('00:01:00');
  if (measurement === 'repetitions') { await page.getByLabel('Rep min', { exact: true }).fill('8'); await page.getByLabel('Rep max', { exact: true }).fill('12'); }
  if (measurement === 'time') await page.getByLabel('Duração (s)', { exact: true }).fill('30');
  if (measurement === 'distance') await page.getByLabel('Distância (m)', { exact: true }).fill('100');
}
async function nameAndSave(page: Page, name: string) {
  await page.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill(name);
  await page.getByRole('button', { name: 'Salvar treino', exact: true }).click(); await expect(page).toHaveURL(/\/rotinas$/);
  await expect(page.getByRole('dialog')).toHaveCount(0); await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
}

test('B5 A: create one exercise in the common application, fill real fields, confirm/name and return to the selected day', async ({ page }) => {
  await editor(page); const path = new URL(page.url()).pathname;
  await library(page); await add(page, 'demonstração', 'demo-exercise'); await close(page);
  await expect(page.getByRole('heading', { name: 'Exercício de demonstração', exact: true })).toBeVisible();
  await expect(page.getByLabel('Séries', { exact: true })).toHaveValue(''); await expect(page.getByRole('button', { name: 'Salvar', exact: true })).toBeDisabled();
  await configure(page); await page.getByRole('button', { name: 'Salvar', exact: true }).click();
  await page.getByRole('button', { name: 'Salvar assim mesmo', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Nome do treino', exact: true })).toHaveValue('Treino de domingo');
  await nameAndSave(page, 'Criação de um · demo');
  await expect(page.getByRole('tab', { name: 'Dom, com treino', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); expect(new URL(page.url()).pathname).toBe(path);
  await expect(page.getByLabel('Rep min', { exact: true })).toHaveValue('8'); await expect(page.getByLabel('Descanso (HH:MM:SS)', { exact: true })).toHaveValue('00:01:00');
});

test('B5 B: add multiple measurements without closing, preserve parameters, reorder and save the same prescription', async ({ page }) => {
  await editor(page, 'Ter, dia livre'); await library(page);
  await add(page, 'agachamento', 'demo-squat'); await add(page, 'prancha', 'demo-plank'); await close(page);
  await configure(page); await page.getByLabel('Carga (kg)', { exact: true }).fill('5');
  await page.getByRole('button', { name: 'Próximo exercício', exact: true }).click(); await configure(page, 'time');
  await page.getByRole('button', { name: 'Opções do exercício', exact: true }).click(); await page.getByRole('button', { name: 'Mover para cima', exact: true }).click();
  await expect(page.getByText('1 / 2', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Salvar', exact: true }).click(); await expect(page.getByRole('button', { name: 'Salvar assim mesmo' })).toHaveCount(0);
  await nameAndSave(page, 'Criação múltipla · demo');
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Prancha — demonstração', exact: true })).toBeVisible();
  await expect(page.getByLabel('Duração (s)', { exact: true })).toHaveValue('30');
  await page.getByRole('button', { name: 'Próximo exercício', exact: true }).click();
  await expect(page.getByLabel('Carga (kg)', { exact: true })).toHaveValue('5');
});

test('B5 C: add to an existing workout, preserve edits, remove the old item, then remove/reinclude by catalogue ID', async ({ page }) => {
  await editor(page, 'Seg, com treino'); const path = new URL(page.url()).pathname;
  await page.getByLabel('Séries', { exact: true }).fill('4'); await library(page); await add(page, 'tempo', 'demo-time'); await close(page);
  await expect(page.getByLabel('Séries', { exact: true })).toHaveValue('4');
  await page.getByRole('button', { name: 'Opções do exercício', exact: true }).click(); await page.getByRole('button', { name: 'Excluir exercício', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Exercício sintético por tempo', exact: true })).toBeVisible(); await configure(page, 'time');
  await library(page); await page.getByRole('searchbox').fill('demonstração');
  await expect(page.locator('[data-exercise-id="demo-exercise"]')).toHaveAttribute('aria-disabled', 'false'); await close(page);
  await page.getByRole('button', { name: 'Salvar', exact: true }).click(); await page.getByRole('button', { name: 'Salvar assim mesmo' }).click();
  await nameAndSave(page, 'Treino editado pela Biblioteca');
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); expect(new URL(page.url()).pathname).toBe(path);
  await expect(page.getByRole('heading', { name: 'Exercício sintético por tempo', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Opções do exercício', exact: true }).click(); await page.getByRole('button', { name: 'Excluir exercício', exact: true }).click();
  await library(page); await add(page, 'tempo', 'demo-time'); await close(page);
  await expect(page.getByLabel('Duração (s)', { exact: true })).toHaveValue(''); // new instance, no stale copied parameters
});

test('B5 D: additions survive Back and cancelled discard; confirmed discard leaves the saved state unchanged', async ({ page }) => {
  await editor(page); await library(page); await add(page, 'elevação', 'demo-raise');
  await page.getByTestId('overlay-backdrop').click({ position: { x: 5, y: 5 } }); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Voltar', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Sem treino', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Adicionar treino', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Elevação — demonstração', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Descartar rascunho', exact: true }).click(); await page.getByRole('button', { name: 'Continuar editando', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0); await expect(page.getByText('1 / 1', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Descartar rascunho', exact: true }).click(); await page.getByRole('button', { name: 'Descartar alterações', exact: true }).click();
  await expect(page).toHaveURL(/\/rotinas$/); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Adicionar treino', exact: true }).click(); await expect(page.getByRole('heading', { name: 'Seu treino está vazio' })).toBeVisible();
});

test('B5 sheet accessibility, independent scroll, search/acknowledgement, duplicate blocking and lifecycle', async ({ page }) => {
  await editor(page, 'Seg, com treino'); const dialog = await library(page);
  await expect(page.locator('#root')).toHaveJSProperty('inert', true); await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  const box = await dialog.boundingBox(); expect(box!.height).toBeCloseTo(page.viewportSize()!.height * .75, 0);
  await expect(page.locator('[data-exercise-id="demo-exercise"]')).toHaveAttribute('aria-disabled', 'true');
  await page.locator('[data-exercise-id="demo-exercise"]').dblclick({ force: true }); await expect(page.getByText('1 exercício no treino', { exact: true })).toBeVisible();
  await page.getByRole('searchbox').fill('não existe'); await expect(page.getByText('Nenhum exercício encontrado.')).toBeVisible();
  await page.getByRole('searchbox').fill('demonstração'); const list = page.getByRole('list', { name: 'Exercícios da biblioteca' });
  await expect(list).toHaveCSS('overflow-anchor', 'none');
  await list.evaluate(element => { element.scrollTop = 100; }); const position = await list.evaluate(element => element.scrollTop); expect(position).toBeGreaterThan(0);
  const result = page.locator('[data-exercise-id="demo-row"]'); await result.click(); await expect(result).toBeFocused();
  await expect(page.getByRole('searchbox')).toHaveValue('demonstração');
  expect(await list.evaluate(element => element.scrollTop)).toBe(position);
  await expect(page.getByText('Adicionado', { exact: true })).toBeVisible(); await expect(page.getByText('Adicionado', { exact: true })).toHaveCount(0, { timeout: 2500 });
  await expect(result).toHaveAttribute('aria-disabled', 'true');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await close(page); await expect(page.getByRole('button', { name: 'Adicionar exercício', exact: true })).toBeFocused();
  await page.goForward(); await expect(dialog).toBeVisible(); await expect(page.getByRole('searchbox')).toHaveValue('');
  await page.goBack(); await expect(dialog).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' }); await library(page); await expect(page.getByTestId('overlay-backdrop')).toHaveCSS('animation-name', 'none'); await close(page);
});
