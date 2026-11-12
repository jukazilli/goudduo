import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
let errors: string[];
test.beforeEach(async ({ page }) => {
  errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
});
test.afterEach(() => { expect(errors).toEqual([]); });

test('five destinations, Home contexts, direct routes, browser back/forward and reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link')).toHaveCount(5);
  for (const [label, path] of [['Rotinas','rotinas'],['Match','match'],['Mensagens','mensagens'],['Perfil','perfil']] as const) {
    await page.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${path}$`));
    await expect(page.getByRole('heading', { name: label, exact: true })).toBeVisible();
  }
  await page.goBack(); await expect(page).toHaveURL(/\/mensagens$/);
  await page.goForward(); await expect(page).toHaveURL(/\/perfil$/);
  await page.reload(); await expect(page.getByTestId('demo-user-name')).toHaveText('Pessoa demonstrativa');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await page.getByRole('tab', { name: 'Publicações' }).click();
  await expect(page.getByRole('heading', { name: 'Publicações' })).toBeVisible();
  await page.getByRole('tab', { name: 'Business' }).click();
  await expect(page.getByText('Os recursos profissionais dependem de elegibilidade e verificação.')).toBeVisible();
  await page.getByRole('link', { name: 'Perfil', exact: true }).click();
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.getByRole('tab', { name: 'Business' })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('tab', { name: 'Treinos' }).click();
  await page.getByRole('tab', { name: 'Treinos' }).press('ArrowRight');
  await expect(page).toHaveURL(/\/home\/publicacoes$/);
  await page.goto('/rota-inexistente');
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
});

test('overlays preserve history, trap focus, exit smoothly and restore the trigger', async ({ page }) => {
  await page.goto('/home/treinos');
  const trigger = page.getByRole('button', { name: 'Criar', exact: true });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByTestId('app-shell')).toHaveAttribute('inert', '');
  await page.keyboard.press('Tab'); await expect(page.getByRole('button', { name: 'Fechar' })).toBeFocused();
  await page.keyboard.press('Shift+Tab'); await expect(page.getByRole('button', { name: 'Fechar' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page).toHaveURL(/\/home\/treinos$/);
  await page.getByRole('button', { name: 'Buscar', exact: true }).click();
  await page.getByTestId('overlay-backdrop').click({ position: { x: 8, y: 8 } });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.goto('/home/publicacoes?panel=activity');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Fechar' }).click();
  await expect(page).toHaveURL(/\/home\/publicacoes$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Criar', exact: true }).click();
  const handle = await page.locator('.sheet-handle').boundingBox();
  const client = await page.context().newCDPSession(page);
  const point = { x: handle!.x + handle!.width / 2, y: handle!.y + 10 };
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...point, y: point.y + 100 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Atividade', exact: true }).click();
  await page.goBack(); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.goForward(); await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Fechar' }).evaluate(button => { if (button instanceof HTMLButtonElement) { button.click(); button.click(); } });
  await expect(page).toHaveURL(/\/home\/publicacoes$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('shared scenario and scroll survive navigation; Lab is isolated from the app', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Visual Lab · P1' })).toHaveCount(0);
  await expect(page.getByLabel('Nome sintético do cenário')).toHaveCount(0);
  await page.goto('http://127.0.0.1:4175/');
  await page.getByLabel('Nome sintético do cenário').fill('Cenário compartilhado');
  await page.getByRole('link', { name: 'Perfil', exact: true }).click();
  await expect(page.getByTestId('demo-user-name')).toHaveText('Cenário compartilhado');
  await page.getByRole('button', { name: 'Alterar treino sintético' }).click();
  await expect(page.getByTestId('shared-workout')).toHaveText('Cenário 2 · revisão 2');
  await page.getByLabel('Cenário longo de scroll').check();
  const content = page.locator('#main-content');
  await content.evaluate(element => { element.scrollTop = 480; });
  await expect.poll(() => content.evaluate(element => element.scrollTop)).toBe(480);
  await page.getByRole('link', { name: 'Rotinas', exact: true }).click();
  await expect.poll(() => content.evaluate(element => element.scrollTop)).toBe(0);
  await page.goBack();
  await expect(page.getByTestId('demo-user-name')).toHaveText('Cenário compartilhado');
  await expect.poll(() => content.evaluate(element => element.scrollTop)).toBe(480);
  await page.getByRole('button', { name: 'Testar bottom sheet' }).click();
  await page.getByRole('button', { name: 'Fechar' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect.poll(() => content.evaluate(element => element.scrollTop)).toBe(480);
});

test('layout, keyboard, reduced motion and automated accessibility', async ({ page }) => {
  await page.goto('/home/treinos');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const link of await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link').all()) {
    const box = await link.boundingBox(); expect(box!.width).toBeGreaterThanOrEqual(44); expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  await page.evaluate(() => { document.documentElement.style.setProperty('--safe-top', '47px'); document.documentElement.style.setProperty('--safe-bottom', '34px'); });
  expect(await page.locator('.app-header').evaluate(el => parseFloat(getComputedStyle(el).paddingTop))).toBeGreaterThanOrEqual(47);
  expect(await page.locator('.tab-bar').evaluate(el => parseFloat(getComputedStyle(el).paddingBottom))).toBeGreaterThanOrEqual(34);
  const violations = (await new AxeBuilder({ page }).analyze()).violations;
  expect(violations).toEqual([]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Atividade', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
});
