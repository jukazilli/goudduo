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

test('R1 TabBar identity, geometry and local Home scroll contexts', async ({ page }) => {
  await page.goto('http://127.0.0.1:4175/');
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  expect(await nav.getByRole('link').evaluateAll(links => links.map(a => a.getAttribute('aria-label')))).toEqual(['Home','Rotinas','Match','Mensagens','Perfil']);
  for (const [label, icon] of [['Home','house'],['Rotinas','dumbbell'],['Match','map'],['Mensagens','message-circle'],['Perfil','user']]) {
    await expect(nav.getByRole('link', { name: label!, exact: true }).locator(`svg.lucide-${icon}`)).toHaveCount(1);
  }
  const bar = await nav.boundingBox(), match = await nav.getByRole('link', { name: 'Match', exact: true }).boundingBox();
  expect(Math.abs(match!.x + match!.width / 2 - (bar!.x + bar!.width / 2))).toBeLessThan(1);
  expect(bar!.height).toBe(50);
  const frameTop = (await page.locator('.lab-frame').boundingBox())!.y;
  await page.getByLabel('Cenário longo de scroll').check();
  const content = page.locator('#main-content');
  await content.evaluate(el => { el.scrollTop = 360; });
  await expect.poll(() => content.evaluate(el => el.scrollTop)).toBe(360);
  await page.getByRole('tab', { name: 'Publicações' }).click();
  await expect.poll(() => content.evaluate(el => el.scrollTop)).toBe(0);
  await content.evaluate(el => { el.scrollTop = 200; });
  await expect.poll(() => content.evaluate(el => el.scrollTop)).toBe(200);
  await page.getByRole('tab', { name: 'Treinos' }).click();
  await expect.poll(() => content.evaluate(el => el.scrollTop)).toBe(360);
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current','page');
  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect.poll(() => content.evaluate(el => el.scrollTop)).toBe(0);
  await expect(page.getByRole('tab', { name: 'Treinos' })).toHaveAttribute('aria-selected','true');
  const finalBar = (await nav.boundingBox())!, finalFrame = (await page.locator('.lab-frame').boundingBox())!;
  expect(finalBar.height).toBe(bar!.height); expect(finalBar.y - finalFrame.y).toBeCloseTo(bar!.y - frameTop, 1);
  expect(await page.evaluate(() => visualViewport?.scale)).toBe(1);
});

test('R1 direct access, contextual and immersive routes have explicit chrome and preserve back history', async ({ page }) => {
  for (const path of ['/acesso/splash','/acesso/login','/acesso/cadastro','/acesso/otp','/acesso/recuperacao','/acesso/termos','/acesso/privacidade','/onboarding']) {
    await page.goto(path);
    await expect(page.getByRole('banner')).toHaveCount(0);
    await expect(page.getByRole('navigation')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Esta superfície ainda não está disponível.')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.reload(); await expect(page).toHaveURL(/\/onboarding$/);
  for (const path of ['/treinos/demo-workout/editar','/perfil/editar','/perfil/interesses','/configuracoes','/perfil/demo-other','/rotinas/demo-routine','/historico']) {
    await page.goto(path);
    await expect(page.getByRole('banner')).toHaveCount(1);
    await expect(page.getByRole('navigation')).toHaveCount(path.startsWith('/treinos/') ? 1 : 0);
    await expect(page.getByRole('button', { name: 'Buscar' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Salvar' })).toHaveCount(0);
    const header = await page.locator('.app-header').boundingBox(), title = await page.locator('.header-title').boundingBox();
    expect(Math.abs(title!.x + title!.width / 2 - (header!.x + header!.width / 2))).toBeLessThan(1);
  }
  for (const path of ['/sessao/demo-session','/pulse/demo-pulse']) {
    await page.goto(path); await page.reload();
    await expect(page.getByRole('banner')).toHaveCount(0);
    await expect(page.getByRole('navigation')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Voltar' })).toBeVisible();
  }
  await page.goto('/home/publicacoes');
  await page.getByRole('link', { name: 'Rotinas', exact: true }).click();
  await expect(page.locator('[data-header="contextual"]')).toBeVisible();
  await page.getByRole('button', { name: 'Voltar' }).click();
  await expect(page.getByRole('tab', { name: 'Publicações' })).toHaveAttribute('aria-selected','true');
  await page.goForward(); await expect(page).toHaveURL(/\/rotinas$/);
});

test('R1 safe-area ownership, scoped styles and overlay on a surface without global chrome', async ({ page }) => {
  await page.goto('/acesso/login?panel=search');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('app-shell')).not.toHaveAttribute('inert','');
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--safe-top','47px');
    document.documentElement.style.setProperty('--safe-bottom','34px');
  });
  expect(await page.locator('#main-content').evaluate(el => getComputedStyle(el).paddingTop)).toBe('47px');
  expect(await page.locator('#main-content').evaluate(el => getComputedStyle(el).paddingBottom)).toBe('34px');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.goto('/home/publicacoes');
  await page.evaluate(() => {
    const outside = document.createElement('section'); outside.id = 'isolation-probe';
    outside.innerHTML = '<button class="button">Sentinela técnica</button><input class="field">'; document.body.append(outside);
  });
  const snapshot = () => page.locator('#isolation-probe button').evaluate(el => {
    const css = getComputedStyle(el); return { borderRadius: css.borderRadius, background: css.backgroundColor, padding: css.padding };
  });
  const before = await snapshot();
  await page.getByRole('tab', { name: 'Treinos' }).click();
  expect(await snapshot()).toEqual(before);
  await expect(page.locator('[data-pulse-shape]')).toHaveCount(0);
  await page.getByRole('tab', { name: 'Publicações' }).click();
  await expect(page.locator('[data-pulse-shape]')).toHaveCount(0);
  expect(await snapshot()).toEqual(before);
  await page.locator('#isolation-probe').evaluate(el => el.remove());
});
