import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const field = (page: Page, name: string) => page.getByLabel(name, { exact: true });
async function close(page: Page) { await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0); }
async function nameAndSave(page: Page, name: string) {
  await page.getByRole('button', { name: 'Salvar', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill(name);
  await page.getByRole('button', { name: 'Salvar treino', exact: true }).click();
  await expect(page).toHaveURL(/\/rotinas$/); await expect(page.getByRole('dialog')).toHaveCount(0);
}

test('B8 integrated two-exercise creation, reordered prescription and second revision reach the same Home entity', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/home/treinos');
  const hero = page.locator('.home-training-v53__hero');
  await expect(hero).toHaveAttribute('data-workout-id', 'demo-workout');
  await hero.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByRole('tab', { name: 'Ter, dia livre', exact: true }).click();
  await page.getByRole('button', { name: 'Adicionar treino', exact: true }).click();
  const editorPath = new URL(page.url()).pathname;
  await expect(page.getByRole('button', { name: 'Salvar', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Adicionar exercício', exact: true }).click();
  const search = page.getByRole('searchbox');
  await search.fill('AGACHAMENTO'); await page.locator('[data-exercise-id="demo-squat"]').click();
  await expect(page.locator('[data-exercise-id="demo-squat"]')).toHaveAttribute('aria-disabled', 'true');
  await search.fill('prancha'); await page.locator('[data-exercise-id="demo-plank"]').click();
  await expect(page.getByText('2 exercícios no treino', { exact: true })).toBeVisible();
  await expect(search).toHaveValue('prancha'); await close(page);
  await field(page, 'Séries').fill('3'); await field(page, 'Rep min').fill('8'); await field(page, 'Rep max').fill('12');
  await field(page, 'Carga (kg)').fill('7.5'); await field(page, 'Descanso (HH:MM:SS)').fill('00:01:15');
  await page.getByRole('button', { name: 'Próximo exercício', exact: true }).click();
  await field(page, 'Séries').fill('2'); await field(page, 'Duração (s)').fill('45'); await field(page, 'Descanso (HH:MM:SS)').fill('00:00:30');
  await page.getByRole('button', { name: 'Opções do exercício', exact: true }).click();
  const move = page.getByRole('button', { name: 'Mover para cima', exact: true }); await move.focus(); await page.keyboard.press('Enter');
  await expect(page.getByText('1 / 2', { exact: true })).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await nameAndSave(page, 'Treino integrado B8');
  await expect(page.getByRole('tab', { name: 'Ter, com treino', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(hero).toHaveAttribute('data-day', 'tue'); await expect(hero).toHaveAttribute('data-revision', '1');
  await expect(hero.getByRole('heading')).toHaveText('Treino integrado B8');
  await expect(hero.getByText('2 exercícios', { exact: true })).toBeVisible();
  const id = await hero.getAttribute('data-workout-id'); expect(id).toBeTruthy();
  await expect(page.getByRole('group', { name: 'Selecionar treino' }).getByRole('button')).toHaveCount(3);
  await page.screenshot({ path: testInfo.outputPath('home-revision-1.png') });
  await hero.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); expect(new URL(page.url()).pathname).toBe(editorPath);
  await expect(page.getByRole('heading', { name: 'Prancha — demonstração', exact: true })).toBeVisible();
  await expect(field(page, 'Duração (s)')).toHaveValue('45'); await field(page, 'Duração (s)').fill('60');
  await page.getByRole('button', { name: 'Próximo exercício', exact: true }).click();
  await expect(field(page, 'Carga (kg)')).toHaveValue('7.5'); await expect(field(page, 'Descanso (HH:MM:SS)')).toHaveValue('00:01:15');
  await field(page, 'Séries').fill('4'); await nameAndSave(page, 'Treino integrado B8 revisado');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(hero).toHaveAttribute('data-workout-id', id!); await expect(hero).toHaveAttribute('data-revision', '2');
  await expect(hero.getByRole('heading')).toHaveText('Treino integrado B8 revisado');
  await expect(page.getByRole('group', { name: 'Selecionar treino' }).getByRole('button')).toHaveCount(3);
  await page.screenshot({ path: testInfo.outputPath('home-revision-2.png') });
  await hero.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByRole('tab', { name: 'Seg, com treino', exact: true }).click(); await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await expect(field(page, 'Séries')).toHaveValue('1'); // original Monday was never changed
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  expect(errors).toEqual([]);
});

test('B8 cancelled naming, tab navigation and reload never commit or silently discard a draft', async ({ page }) => {
  await page.goto('/home/treinos'); await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await field(page, 'Séries').fill('6');
  await page.getByRole('button', { name: 'Salvar', exact: true }).click(); await page.getByRole('button', { name: 'Salvar assim mesmo', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill('Nunca confirmado');
  await close(page);
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  const hero = page.locator('.home-training-v53__hero'); await expect(hero).toHaveAttribute('data-revision', '1');
  await expect(hero.getByRole('heading')).toHaveText('Treino de demonstração');
  await page.getByRole('tab', { name: 'Publicações', exact: true }).click(); await expect(page.locator('.training-pulse-v53')).toHaveCount(0);
  await page.getByRole('tab', { name: 'Treinos', exact: true }).click();
  await hero.getByRole('button', { name: 'Ver treino', exact: true }).click(); await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await expect(field(page, 'Séries')).toHaveValue('6');
  const url = new URL(page.url()); expect(url.search).toBe(''); expect(url.pathname).not.toContain('Nunca');
  await page.reload(); await expect(page.getByRole('button', { name: 'Salvar', exact: true })).toHaveCount(0);
  await expect(page.getByRole('dialog')).toHaveCount(0); // ephemeral context is not reconstructed onto an arbitrary prescription
});
