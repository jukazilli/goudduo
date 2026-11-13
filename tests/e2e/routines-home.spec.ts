import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
let errors: string[];
test.beforeEach(async ({ page }) => {
  errors = []; page.on('pageerror', error => errors.push(error.message)); page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
});
test.afterEach(() => expect(errors).toEqual([]));

test('B3 integrated Bento restores order and preserves day, draft and scroll through Editor return', async ({ page }) => {
  await page.goto('/home/treinos'); await page.getByRole('link', { name: 'Rotinas', exact: true }).click();
  const tiles = page.locator('[data-routine-id]');
  const order = () => tiles.evaluateAll(elements => elements.map(element => element.getAttribute('data-routine-id')));
  const initial = await order(); expect(initial).toHaveLength(5);
  await expect(page.locator('.app-shell')).toHaveCount(1); await expect(page.locator('.tab-bar')).toHaveCount(1);
  await expect(page.getByText('PRINCIPAL', { exact: true })).toBeVisible();
  const right = page.getByRole('button', { name: 'Expandir Em casa · demo', exact: true }); await right.click();
  await expect(page.getByRole('button', { name: 'Recolher Em casa · demo', exact: true })).toHaveAttribute('aria-expanded', 'true');
  expect(await order()).toEqual(['demo-routine', 'demo-home', 'demo-alternative', 'demo-run', 'demo-mobility']);
  const orphan = page.locator('[data-routine-id="demo-mobility"]');
  await expect(orphan).toHaveClass(/is-orphan/);
  await expect.poll(async () => (await orphan.boundingBox())!.width).toBeCloseTo(page.viewportSize()!.width - 36, 0);
  const preview = page.getByRole('region', { name: 'Treinos de Em casa · demo' });
  await preview.getByRole('tab', { name: 'Ter, com treino', exact: true }).click();
  await expect(preview.getByText('TER · 2 EXERCÍCIOS')).toBeVisible();
  await preview.getByRole('tab', { name: 'Seg, dia livre', exact: true }).click();
  await expect(preview.getByRole('heading', { name: 'Sem treino' })).toBeVisible();
  await preview.getByRole('tab', { name: 'Ter, com treino', exact: true }).click();
  const main = page.locator('#main-content');
  await preview.getByRole('button', { name: 'Ver treino', exact: true }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // measured after width/height and contextual scroll settle
  const position = await main.evaluate(element => element.scrollTop);
  await preview.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await expect(page).toHaveURL(/\/treinos\/demo-home-workout\/editar$/);
  await expect(page.getByText('Esta superfície ainda não está disponível.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Salvar', exact: true })).toHaveCount(0);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Voltar', exact: true }).click();
  await expect(page).toHaveURL(/\/rotinas$/);
  await expect(page.getByRole('button', { name: 'Recolher Em casa · demo', exact: true })).toHaveAttribute('aria-expanded', 'true');
  await expect(preview.getByRole('tab', { name: 'Ter, com treino' })).toHaveAttribute('aria-selected', 'true');
  await expect.poll(() => main.evaluate(element => element.scrollTop)).toBeCloseTo(position, 0);
  await page.getByRole('button', { name: 'Recolher Em casa · demo', exact: true }).click();
  expect(await order()).toEqual(initial);
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await page.getByRole('tab', { name: 'Publicações', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Publicações', exact: true })).toBeVisible();
  await page.goBack(); await page.goForward(); await expect(page).toHaveURL(/\/home\/publicacoes$/);
});

test('B3 touch targets, accessible days, empty routine, reduced motion and isolated fixture scenarios', async ({ page }) => {
  await page.goto('/rotinas');
  await page.getByRole('button', { name: 'Expandir Rotina de demonstração', exact: true }).click();
  const preview = page.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
  await expect(preview.getByText('SEG · 1 EXERCÍCIO', { exact: true })).toBeVisible();
  await preview.getByRole('tab', { name: 'Qui, com treino' }).click();
  await expect(preview.getByText('QUI · 2 EXERCÍCIOS')).toBeVisible();
  const tab = preview.getByRole('tab', { name: 'Qui, com treino' }); await tab.press('End');
  await expect(preview.getByRole('tab', { name: 'Dom, dia livre' })).toHaveAttribute('aria-selected', 'true');
  for (const button of await preview.getByRole('tab').all()) {
    const size = await button.boundingBox(); expect(size!.width).toBeGreaterThanOrEqual(44); expect(size!.height).toBeGreaterThanOrEqual(44);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  const accessibility = await new AxeBuilder({ page }).analyze(); expect(accessibility.violations).toEqual([]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Recolher Rotina de demonstração', exact: true }).click();
  await page.getByRole('button', { name: 'Expandir Mobilidade demo', exact: true }).click();
  await expect(page.locator('.routines-v74__item.is-expanded')).toHaveCSS('transition-duration', '0s');
  await expect(page.getByRole('region', { name: 'Treinos de Mobilidade demo' }).getByRole('heading', { name: 'Sem treino' })).toBeVisible();
  await expect(page.getByLabel('Cenário de Rotinas', { exact: true })).toHaveCount(0);
  await page.goto('http://127.0.0.1:4175/rotinas');
  await page.getByLabel('Cenário de Rotinas', { exact: true }).selectOption('one'); await expect(page.locator('[data-routine-id]')).toHaveCount(1);
  await page.getByLabel('Cenário de Rotinas', { exact: true }).selectOption('none');
  await expect(page.getByRole('heading', { name: 'Suas rotinas começam aqui', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Criar rotina', exact: true })).toBeDisabled();
  await page.getByLabel('Cenário de Rotinas', { exact: true }).selectOption('multiple'); await expect(page.locator('[data-routine-id]')).toHaveCount(5);
  await page.reload(); await expect(page.locator('[data-routine-id]')).toHaveCount(5);
});
