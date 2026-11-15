import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
let errors: string[];
test.beforeEach(async ({ page }) => { errors = []; page.on('pageerror', event => errors.push(event.message)); page.on('console', event => { if (event.type() === 'error') errors.push(event.text()); }); });
test.afterEach(() => expect(errors).toEqual([]));
const pulse = (page: Page) => page.getByTestId('training-pulse-slot');
async function touchDrag(page: Page, x: number, y: number, dx: number, dy: number) {
  const client = await page.context().newCDPSession(page);
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  for (let n = 1; n <= 5; n++) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * n / 5, y: y + dy * n / 5 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await client.detach();
}

test('B7 own and institutional identity have exact contextual geometry, neutral states and no false action', async ({ page }) => {
  await page.goto('/home/treinos'); await page.evaluate(() => document.fonts.ready);
  const row = pulse(page).getByRole('list'), entries = row.getByRole('listitem'); await expect(entries).toHaveCount(2);
  await expect(entries.nth(0)).toHaveAttribute('data-kind', 'own'); await expect(entries.nth(1)).toHaveAttribute('data-kind', 'institutional');
  const own = row.getByRole('button', { name: 'Criar Pulse de Pessoa demonstrativa — indisponível' }); await expect(own).toBeDisabled(); await expect(own).toHaveText('P');
  const mark = entries.nth(1).locator('img'); await expect(mark).toHaveAttribute('src', /goudduo-wordmark-white/); await expect(mark).toHaveJSProperty('complete', true);
  await expect(row.locator('[data-view-state=unknown]')).toHaveCount(2); await expect(row.locator('[data-count],input,video,a')).toHaveCount(0);
  const size = page.viewportSize()!.width <= 355 ? 54 : 58, box = await own.boundingBox(), second = await entries.nth(1).locator('.training-pulse-v53__avatar').boundingBox();
  expect(box!.width).toBe(size); expect(box!.height).toBe(size); expect(second!.x - box!.x - box!.width).toBe(10); await expect(own).toHaveCSS('border-radius', size === 54 ? '18px' : '19px');
  const main = await page.locator('#main-content').boundingBox(), rank = await page.locator('[data-home-card=ranking]').boundingBox();
  expect(rank!.y - main!.y).toBeCloseTo(size === 54 ? 108.8 : 112.8, 1); expect(rank!.height).toBe(218);
  const url = page.url(); await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2); await page.mouse.click(second!.x + second!.width / 2, second!.y + second!.height / 2);
  expect(page.url()).toBe(url); await expect(page.getByRole('dialog')).toHaveCount(0); await expect(row.locator('[data-view-state=unknown]')).toHaveCount(2);
  await row.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab'); await expect(row).toBeFocused(); await expect(row).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Tab'); await expect(page.getByRole('button', { name: 'Expandir Ranking', exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false); expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('B7 native strip overflow in isolated Lab supports touch and keyboard, quantities and canonical ice without media/viewer', async ({ page }) => {
  await page.goto('http://127.0.0.1:4175/'); await page.getByLabel('Viewport', { exact: true }).selectOption(String(page.viewportSize()!.width));
  await page.getByLabel('Cenário técnico de Pulse', { exact: true }).check();
  const scenario = page.getByTestId('pulse-technical-scenario'), row = scenario.getByRole('list');
  await row.scrollIntoViewIfNeeded();
  expect(await row.evaluate(e => e.scrollWidth > e.clientWidth)).toBe(true);
  const bounds = await row.boundingBox(); await touchDrag(page, bounds!.x + bounds!.width - 25, bounds!.y + 25, -150, 0);
  await expect.poll(() => row.evaluate(e => e.scrollLeft)).toBeGreaterThan(0);
  await row.focus(); const left = await row.evaluate(e => e.scrollLeft); await page.keyboard.press('ArrowLeft'); await expect.poll(() => row.evaluate(e => e.scrollLeft)).toBeLessThan(left);
  await expect(scenario.locator('[data-view-state=seen] .training-pulse-v53__avatar')).toHaveCSS('border-top-color', 'rgb(241, 248, 251)');
  await expect(scenario.locator('[data-view-state=unseen]')).toHaveAttribute('data-ring', 'neutral'); await expect(scenario.locator('[data-view-state=unseen] .training-pulse-v53__avatar')).toHaveCSS('background-image', 'none');
  await expect(scenario.getByRole('img', { name: /não visto, estado demonstrativo; gradiente pendente/ })).toHaveCount(1);
  await page.getByLabel('Cenário de Pulse', { exact: true }).selectOption('empty'); await expect(row.getByRole('listitem')).toHaveCount(0); await expect(row).not.toHaveAttribute('tabindex');
  await page.getByLabel('Cenário de Pulse', { exact: true }).selectOption('one'); await expect(row.getByRole('listitem')).toHaveCount(1); await expect(row.getByRole('button')).toBeDisabled();
  await page.getByLabel('Cenário de Pulse', { exact: true }).selectOption('unknown'); await expect(row.getByRole('listitem')).toHaveCount(2); await expect(row.locator('[data-view-state=unknown]')).toHaveCount(2);
  await expect(page.getByRole('dialog')).toHaveCount(0); await expect(scenario.locator('input[type=file],video')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' }); await expect(row).toHaveCSS('scroll-behavior', 'auto');
});

test('B7 native touch from a disabled identity preserves vertical Home scroll and leaves Hero selection intact', async ({ page }) => {
  await page.goto('/home/treinos'); const row = pulse(page).getByRole('list'), own = row.getByRole('button'), hero = page.locator('.home-training-v53__hero'), main = page.locator('#main-content');
  const original = await hero.getAttribute('data-workout-id'), bounds = await own.boundingBox();
  await touchDrag(page, bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2, 0, -100);
  await expect.poll(() => main.evaluate(e => e.scrollTop)).toBeGreaterThan(0); await expect(hero).toHaveAttribute('data-workout-id', original!);
  // Complete the native fling before requesting another navigation action. The
  // browser can consume a touch during momentum solely to stop scrolling.
  await main.evaluate(element => new Promise<void>(resolve => {
    let previous = element.scrollTop, stable = 0;
    const frame = () => {
      const current = element.scrollTop; stable = current === previous ? stable + 1 : 0; previous = current;
      if (stable >= 8) resolve(); else requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }));
  await page.getByRole('link', { name: 'Home', exact: true }).tap(); await expect.poll(() => main.evaluate(e => e.scrollTop)).toBe(0);
  await expect(row).toBeVisible(); await expect(row.getByRole('listitem')).toHaveCount(2); await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('B7 context changes and an actual Editor save preserve Pulse identity, Hero revision and protected navigation', async ({ page }) => {
  await page.goto('/home/treinos'); const hero = page.locator('.home-training-v53__hero'), workout = await hero.getAttribute('data-workout-id');
  for (const context of ['Publicações', 'Business']) {
    await page.getByRole('tab', { name: context, exact: true }).click(); await expect(pulse(page)).toHaveCount(0); await expect(page.locator('[data-pulse-shape]')).toHaveCount(0);
  }
  await page.getByRole('tab', { name: 'Treinos', exact: true }).click(); await expect(pulse(page).getByRole('listitem')).toHaveCount(2);
  await page.getByRole('button', { name: 'Ver treino', exact: true }).click(); await page.getByRole('button', { name: 'Ver treino', exact: true }).click();
  await page.getByLabel('Séries', { exact: true }).fill('4'); await page.getByRole('button', { name: 'Adicionar exercício', exact: true }).click();
  await expect(page.getByRole('searchbox')).toBeFocused(); await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Salvar', exact: true }).click(); await page.getByRole('button', { name: 'Salvar assim mesmo', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome do treino', exact: true }).fill('Treino preservado com Pulse'); await page.getByRole('button', { name: 'Salvar treino', exact: true }).click(); await expect(page).toHaveURL(/\/rotinas$/);
  await page.getByRole('link', { name: 'Home', exact: true }).click(); await expect(hero).toHaveAttribute('data-workout-id', workout!); await expect(hero).toHaveAttribute('data-revision', '2'); await expect(hero.getByRole('heading')).toHaveText('Treino preservado com Pulse');
  await expect(pulse(page).getByRole('button', { name: 'Criar Pulse de Pessoa demonstrativa — indisponível' })).toBeDisabled(); await expect(pulse(page).locator('[data-view-state=unknown]')).toHaveCount(2);
  await expect(page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link')).toHaveCount(5); await expect(page.getByRole('banner')).toHaveCount(1);
});
