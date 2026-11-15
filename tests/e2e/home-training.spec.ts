import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
let errors: string[];
test.beforeEach(async ({ page }) => { errors = []; page.on('pageerror', error => errors.push(error.message)); page.on('console', event => { if (event.type() === 'error') errors.push(event.text()); }); });
test.afterEach(() => expect(errors).toEqual([]));
const order = ['ranking', 'status', 'weight', 'workout', 'measures', 'library', 'photos', 'records', 'consistency'];
const card = (page: Page, id: string) => page.locator(`[data-home-card="${id}"]`);
const ids = (page: Page) => page.locator('[data-home-card]').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-home-card')));
async function home(page: Page) { await page.goto('/home/treinos'); await page.evaluate(() => document.fonts.ready); }
async function configure(page: Page) {
  await page.getByLabel('Séries', { exact: true }).fill('3'); await page.getByLabel('Rep min', { exact: true }).fill('8'); await page.getByLabel('Rep max', { exact: true }).fill('12'); await page.getByLabel('Descanso (HH:MM:SS)', { exact: true }).fill('00:01:00');
}
async function saveOne(page: Page, name: string) {
  await page.getByRole('button', { name: 'Salvar', exact: true }).click(); await page.getByRole('button', { name: 'Salvar assim mesmo', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill(name); await page.getByRole('button', { name: 'Salvar treino', exact: true }).click();
  await expect(page).toHaveURL(/\/rotinas$/); await expect(page.getByRole('dialog')).toHaveCount(0);
}

test('B6 A: new workout from B5 Library reaches the same Home Hero, then reflects the next saved revision', async ({ page }) => {
  await home(page); await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByRole('tab', { name: 'Dom, dia livre', exact: true }).click(); await page.getByRole('button', { name: 'Adicionar treino', exact: true }).click();
  const editorPath = new URL(page.url()).pathname;
  await page.getByRole('button', { name: 'Adicionar exercício', exact: true }).click(); await page.getByRole('searchbox').fill('elevação');
  await page.locator('[data-exercise-id="demo-raise"]').click(); await expect(page.locator('[data-exercise-id="demo-raise"]')).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0); await configure(page); await saveOne(page, 'Meu treino integrado');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  const hero = page.locator('.home-training-v53__hero');
  await expect(hero.getByRole('heading')).toHaveText('Meu treino integrado'); await expect(hero).toHaveAttribute('data-day', 'sun'); await expect(hero).toHaveAttribute('data-revision', '1');
  const workoutId = await hero.getAttribute('data-workout-id'); expect(workoutId).toBeTruthy(); await expect(hero.getByText('1 exercício', { exact: true })).toBeVisible();
  await hero.getByRole('button', { name: 'Ver treino' }).click(); await expect(page.getByRole('tab', { name: 'Dom, com treino', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); expect(new URL(page.url()).pathname).toBe(editorPath);
  await page.getByLabel('Séries', { exact: true }).fill('4'); await saveOne(page, 'Meu treino revisado');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(hero.getByRole('heading')).toHaveText('Meu treino revisado'); await expect(hero).toHaveAttribute('data-workout-id', workoutId!); await expect(hero).toHaveAttribute('data-revision', '2');
});

test('B6 B: asymmetric cluster, top/lower in-place expansion, orphan fill and canonical restoration', async ({ page }) => {
  await home(page); expect(await ids(page)).toEqual(order);
  const ranking = await card(page, 'ranking').boundingBox(), status = await card(page, 'status').boundingBox(), weight = await card(page, 'weight').boundingBox();
  expect(ranking!.height).toBeCloseTo(218, 0); expect(ranking!.x).toBeLessThan(status!.x); expect(status!.x).toBe(weight!.x); expect(weight!.y).toBeGreaterThan(status!.y);
  expect((await card(page, 'workout').boundingBox())!.height).toBeGreaterThanOrEqual(236);
  const gap = page.viewportSize()!.width <= 355 ? 8 : 10; expect(status!.x - ranking!.x - ranking!.width).toBeCloseTo(gap, 0);
  await page.getByRole('button', { name: 'Expandir Ranking' }).click(); await expect(card(page, 'ranking')).toHaveClass(/is-expanded/); await page.getByRole('button', { name: 'Fechar Ranking' }).click();
  await page.getByRole('button', { name: 'Expandir Status' }).click(); expect((await ids(page)).slice(0, 3)).toEqual(['status', 'ranking', 'weight']);
  await expect(page.getByRole('heading', { name: 'Em construção' })).toBeVisible();
  expect((await card(page, 'status').boundingBox())!.width).toBeCloseTo(page.viewportSize()!.width - (gap === 8 ? 20 : 26), 0);
  await page.getByRole('button', { name: 'Fechar Status' }).click(); await expect(page.getByRole('button', { name: 'Expandir Status' })).toBeFocused();
  await page.getByRole('button', { name: 'Expandir Fotos' }).click(); await expect(card(page, 'records')).toHaveClass(/is-orphan/); expect((await ids(page)).slice(0, 5)).toEqual(['ranking', 'status', 'weight', 'workout', 'photos']);
  expect((await card(page, 'records').boundingBox())!.width).toBeCloseTo((await card(page, 'workout').boundingBox())!.width, 0);
  expect((await card(page, 'ranking').boundingBox())!.height).toBeCloseTo(218, 0);
  await page.getByRole('button', { name: 'Fechar Fotos' }).click(); expect(await ids(page)).toEqual(order);
  await expect(page.locator('.is-expanded,.is-orphan')).toHaveCount(0);
});

test('B6 C: real indicator selection, context isolation, scroll and navigation without a fake session', async ({ page }) => {
  await home(page); const hero = page.locator('.home-training-v53__hero');
  await expect(page.getByRole('group', { name: 'Selecionar treino' }).getByRole('button')).toHaveCount(2);
  const heading = hero.getByRole('heading'); await heading.scrollIntoViewIfNeeded(); const box = await heading.boundingBox();
  const x = box!.x + box!.width - 8, y = box!.y + 10;
  await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x - 60, y + 2); await page.mouse.up();
  await expect(hero).toHaveAttribute('data-day', 'thu');
  await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x - 12, y + 60); await page.mouse.up();
  await expect(hero).toHaveAttribute('data-day', 'thu'); // vertical intent must not select a prescription
  await page.getByRole('button', { name: 'Selecionar treino de segunda-feira' }).click();
  await page.getByRole('button', { name: 'Selecionar treino de quinta-feira' }).click(); await expect(hero).toHaveAttribute('data-workout-id', 'demo-primary-thu'); await expect(hero.getByText('2 exercícios', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Publicações' }).click(); await expect(page.getByTestId('home-training')).toHaveCount(0); await expect(page.locator('[data-pulse-shape]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Publicações' })).toBeVisible();
  await page.getByRole('tab', { name: 'Business' }).click(); await expect(page.getByTestId('home-training')).toHaveCount(0); await expect(page.getByText('Os recursos profissionais dependem de elegibilidade e verificação.')).toBeVisible();
  await page.getByRole('tab', { name: 'Treinos' }).click(); await expect(hero).toHaveAttribute('data-workout-id', 'demo-primary-thu');
  const content = page.locator('#main-content'); await content.evaluate(element => { element.scrollTop = 200; }); await expect.poll(() => content.evaluate(element => element.scrollTop)).toBe(200);
  await hero.getByRole('button', { name: 'Ver treino', exact: true }).click(); await expect(page).toHaveURL(/\/rotinas$/); await expect(page.getByRole('tab', { name: 'Qui, com treino', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.goBack(); await expect(hero).toHaveAttribute('data-workout-id', 'demo-primary-thu'); await expect.poll(() => content.evaluate(element => element.scrollTop)).toBe(200);
  await page.getByRole('link', { name: 'Home', exact: true }).click(); await expect.poll(() => content.evaluate(element => element.scrollTop)).toBe(0);
  // P3-S1 adds a real session entry; selecting a day alone still must not start one.
  await expect(page.getByRole('button', { name: 'Começar treino' })).toBeVisible(); await expect(page.locator('[data-session-id]')).toHaveCount(0); await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('B6 D: empty selected day stays empty and opens the real organizing flow without fabricating workouts', async ({ page }) => {
  await home(page); await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); await page.getByRole('tab', { name: 'Dom, dia livre', exact: true }).click();
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  const hero = page.locator('.home-training-v53__hero'); await expect(hero.getByRole('heading')).toHaveText('Sem treino'); await expect(hero).not.toHaveAttribute('data-workout-id');
  await hero.getByRole('button', { name: 'Organizar treinos' }).click(); await expect(page.getByRole('tab', { name: 'Dom, dia livre', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Sem treino', exact: true })).toBeVisible(); await page.getByRole('button', { name: 'Adicionar treino' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino está vazio' })).toBeVisible(); await expect(page.getByRole('button', { name: 'Salvar', exact: true })).toBeDisabled();
});

test('B6 E: keyboard focus, neutral progress, safe-area ownership and reduced motion preserve the protected Shell', async ({ page }) => {
  await home(page); await expect(page.getByTestId('training-pulse-slot').getByRole('listitem')).toHaveCount(2); await expect(page.getByTestId('training-pulse-slot').getByRole('button')).toBeDisabled();
  await expect(page.getByRole('banner')).toHaveCount(1); await expect(page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link')).toHaveCount(5);
  await expect(page.getByRole('spinbutton')).toHaveCount(0); await expect(page.locator('input[type=file]')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' }); const toggle = card(page, 'weight').locator('[aria-expanded]'); await toggle.focus(); await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true'); await expect(card(page, 'weight').locator('.home-training-v53__reveal')).toHaveCSS('transition-duration', '0s');
  await page.keyboard.press('Escape'); await expect(toggle).toHaveAttribute('aria-expanded', 'false'); await expect(toggle).toBeFocused();
  await page.getByRole('button', { name: 'Expandir Biblioteca' }).click(); await expect(card(page, 'library').getByText('Ainda não disponível.')).toBeVisible(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Fechar Biblioteca' }).click();
  await page.evaluate(() => { document.documentElement.style.setProperty('--safe-top', '47px'); document.documentElement.style.setProperty('--safe-bottom', '34px'); });
  expect(await page.locator('.app-header').evaluate(e => parseFloat(getComputedStyle(e).paddingTop))).toBe(55);
  expect(await page.locator('.tab-bar').evaluate(e => parseFloat(getComputedStyle(e).paddingBottom))).toBe(34);
  expect(await page.getByTestId('home-training').evaluate(e => parseFloat(getComputedStyle(e).paddingBottom))).toBe(24);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
