import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

let errors: string[];
test.beforeEach(async ({ page }) => {
  errors = []; page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
});
test.afterEach(() => expect(errors).toEqual([]));
async function openPrimary(page: Page, day?: string) {
  await page.goto('/rotinas');
  await page.getByRole('button', { name: 'Expandir Rotina de demonstração', exact: true }).click();
  const preview = page.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
  if (day) await preview.getByRole('tab', { name: day, exact: true }).click();
  await preview.getByRole('button', { name: day === 'Dom, dia livre' ? 'Adicionar treino' : 'Ver treino', exact: true }).click();
}
const save = (page: Page) => page.getByRole('button', { name: 'Salvar', exact: true });
test('B4 real single-exercise editing validates fields, stages naming and commits to the same routine', async ({ page }) => {
  await openPrimary(page);
  await expect(page.locator('[data-header="editor"]')).toHaveCount(1); await expect(page.locator('.tab-bar')).toHaveCount(1);
  await expect(page.locator('.header-title')).toHaveText('Treino de demonstração');
  await page.getByLabel('Séries', { exact: true }).fill(''); await expect(save(page)).toBeDisabled();
  await page.getByLabel('Séries', { exact: true }).fill('3');
  await page.getByLabel('Rep min', { exact: true }).fill('8'); await page.getByLabel('Rep max', { exact: true }).fill('12');
  await page.getByLabel('Carga (kg)', { exact: true }).fill('12,5');
  await page.getByLabel('Descanso (HH:MM:SS)', { exact: true }).fill('00:70:00'); await expect(save(page)).toBeDisabled();
  await page.getByLabel('Descanso (HH:MM:SS)', { exact: true }).fill('00:01:30');
  await expect(page.getByLabel('Equipamento', { exact: true })).toHaveAttribute('readonly');
  await expect(page.getByRole('combobox')).toHaveCount(0);
  await expect(save(page)).toBeEnabled();
  const footer = await page.locator('.surface-footer').boundingBox(), tabbar = await page.locator('.tab-bar').boundingBox();
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(tabbar!.y + 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await save(page).click();
  let dialog = page.getByRole('dialog', { name: 'Confirmar treino' });
  await expect(dialog).toBeVisible(); await expect(page.locator('#root')).toHaveJSProperty('inert', true);
  await dialog.getByRole('button', { name: 'Continuar editando' }).click(); await expect(dialog).toHaveCount(0);
  await expect(page.getByLabel('Séries', { exact: true })).toHaveValue('3');
  await save(page).click(); await page.getByRole('button', { name: 'Salvar assim mesmo' }).click();
  dialog = page.getByRole('dialog', { name: 'Nome do treino', exact: true });
  await expect(dialog.getByRole('textbox', { name: 'Nome do treino', exact: true })).toBeFocused();
  await dialog.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill(' '); await expect(dialog.getByRole('button', { name: 'Salvar treino' })).toBeDisabled();
  const retainedDuringExit = await page.evaluate(() => new Promise<boolean>(resolve => {
    const observer = new MutationObserver(() => {
      const closing = document.querySelector('.overlay-backdrop.is-closing');
      if (closing) { observer.disconnect(); resolve(Boolean(closing.querySelector('#final-workout-name'))); }
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
    [...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button')].find(button => button.textContent === 'Cancelar')!.click();
  }));
  expect(retainedDuringExit).toBe(true); await expect(dialog).toHaveCount(0);
  await expect(page.getByLabel('Descanso (HH:MM:SS)', { exact: true })).toHaveValue('00:01:30');
  await save(page).click(); await page.getByRole('button', { name: 'Salvar assim mesmo' }).click();
  await page.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill('Treino salvo na P2-B4');
  await page.getByRole('button', { name: 'Salvar treino' }).click();
  await expect(page).toHaveURL(/\/rotinas$/); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Rotinas', exact: true })).toBeFocused();
  await expect(page.getByRole('heading', { name: 'Treino salvo na P2-B4' })).toBeVisible();
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await expect(page.getByLabel('Séries', { exact: true })).toHaveValue('3');
  await expect(page.getByLabel('Carga (kg)', { exact: true })).toHaveValue('12.5');
  await expect(page.getByLabel('Equipamento', { exact: true })).toHaveValue('Sem equipamento');
});

test('B4 measurements, reordering, removal, zero block and honest Library preserve the draft', async ({ page }) => {
  await page.goto('/rotinas'); await page.getByRole('button', { name: 'Expandir Alternativa demo', exact: true }).click();
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByRole('button', { name: 'Próximo exercício' }).click();
  await expect(page.getByLabel('Rep min', { exact: true })).toHaveCount(0); await page.getByLabel('Duração (s)', { exact: true }).fill('45');
  await page.getByRole('button', { name: 'Opções do exercício' }).click(); await page.getByRole('button', { name: 'Mover para cima' }).click();
  await expect(page.getByText('1 / 3', { exact: true })).toBeVisible();
  const mediaBox = await page.locator('.workout-editor__media').boundingBox();
  const swipeClient = await page.context().newCDPSession(page);
  const swipeStart = { x: mediaBox!.x + mediaBox!.width * .75, y: mediaBox!.y + 40 };
  await swipeClient.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [swipeStart] });
  await swipeClient.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...swipeStart, x: swipeStart.x - 90 }] });
  await swipeClient.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await swipeClient.detach();
  await expect(page.getByText('2 / 3', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Próximo exercício' }).click();
  await page.getByLabel('Distância (m)', { exact: true }).fill('250');
  await expect(page.getByLabel('Duração (s)', { exact: true })).toHaveCount(0);
  await save(page).click(); await expect(page.getByRole('dialog', { name: 'Nome do treino', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Salvar assim mesmo' })).toHaveCount(0);
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
  const add = page.getByRole('button', { name: 'Adicionar exercício', exact: true }); await add.click();
  const library = page.getByRole('dialog', { name: 'Adicionar exercício', exact: true });
  await expect(library.getByRole('searchbox', { name: 'Pesquisar exercícios na biblioteca' })).toBeFocused();
  await expect(library.getByRole('list', { name: 'Exercícios da biblioteca' })).toBeVisible();
  await page.keyboard.press('Escape'); await expect(library).toHaveCount(0); await expect(add).toBeFocused();
  await add.click(); await page.goBack(); await expect(library).toHaveCount(0); await page.goForward(); await expect(library).toBeVisible();
  const handle = library.locator('.sheet-handle');
  const bounds = await handle.boundingBox(), client = await page.context().newCDPSession(page);
  const point = { x: bounds!.x + bounds!.width / 2, y: bounds!.y + 10 };
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...point, y: point.y + 100 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await client.detach();
  await expect(library).toHaveCount(0); await expect(page.getByLabel('Distância (m)', { exact: true })).toHaveValue('250');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (let i = 0; i < 3; i++) { await page.getByRole('button', { name: 'Opções do exercício' }).click(); await page.getByRole('button', { name: 'Excluir exercício' }).click(); }
  await expect(page.getByRole('heading', { name: 'Seu treino está vazio' })).toBeVisible(); await expect(save(page)).toBeDisabled();
  await page.getByRole('button', { name: 'Voltar', exact: true }).click(); await expect(page).toHaveURL(/\/rotinas$/);
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); await expect(save(page)).toBeDisabled(); // empty draft retained, saved workout untouched
});

test('B4 empty-day context and Lab-only synthetic input commit a new workout without a product Library', async ({ page }) => {
  await openPrimary(page, 'Dom, dia livre'); await expect(save(page)).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Adicionar prescrição sintética ao rascunho' })).toHaveCount(0);
  await page.reload(); await expect(save(page)).toHaveCount(0); // no reconstructed editing context on reload
  await page.goto('http://127.0.0.1:4175/rotinas');
  await page.getByLabel('Viewport', { exact: true }).selectOption(String(page.viewportSize()!.width));
  await page.getByRole('button', { name: 'Expandir Rotina de demonstração', exact: true }).click();
  const preview = page.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
  await preview.getByRole('tab', { name: 'Dom, dia livre' }).click(); await preview.getByRole('button', { name: 'Adicionar treino', exact: true }).click();
  await page.getByRole('button', { name: 'Adicionar prescrição sintética ao rascunho' }).click();
  await save(page).click(); await page.getByRole('button', { name: 'Salvar assim mesmo' }).click();
  await expect(page.getByRole('textbox', { name: 'Nome do treino', exact: true })).toHaveValue('Treino de domingo');
  await page.getByRole('button', { name: 'Salvar treino' }).click(); await expect(page).toHaveURL(/\/rotinas$/);
  await expect(preview.getByRole('tab', { name: 'Dom, com treino' })).toHaveAttribute('aria-selected', 'true');
  await expect(preview.getByRole('heading', { name: 'Treino de domingo' })).toBeVisible();
  await preview.getByRole('tab', { name: 'Seg, com treino' }).click(); await preview.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByLabel('Séries', { exact: true }).fill('4');
  await page.getByRole('button', { name: 'Alterar treino sintético', exact: true }).click(); await expect(save(page)).toBeDisabled();
  await expect(page.getByText('Este treino foi atualizado em outra edição.', { exact: false })).toBeVisible();
});


test('B4 Back preserves edits and explicit discard requires confirmation without changing the saved workout', async ({ page }) => {
  await openPrimary(page);
  await page.getByLabel('Séries', { exact: true }).fill('5');
  await page.getByRole('button', { name: 'Voltar', exact: true }).click(); await expect(page).toHaveURL(/\/rotinas$/);
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await expect(page.getByLabel('Séries', { exact: true })).toHaveValue('5');
  await page.getByRole('button', { name: 'Descartar rascunho', exact: true }).click();
  let dialog = page.getByRole('dialog', { name: 'Descartar rascunho?', exact: true });
  await expect(dialog).toBeVisible(); await dialog.getByRole('button', { name: 'Continuar editando' }).click();
  await expect(dialog).toHaveCount(0); await expect(page.getByLabel('Séries', { exact: true })).toHaveValue('5');
  await page.getByRole('button', { name: 'Descartar rascunho', exact: true }).click();
  dialog = page.getByRole('dialog', { name: 'Descartar rascunho?', exact: true });
  await dialog.getByRole('button', { name: 'Descartar alterações', exact: true }).click();
  await expect(page).toHaveURL(/\/rotinas$/); await expect(dialog).toHaveCount(0);
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await expect(page.getByLabel('Séries', { exact: true })).toHaveValue('1');
});
