import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true, workers: 2, retries: 0,
  reporter: [['list'], ['json', { outputFile: 'test-results/report.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure', screenshot: 'only-on-failure',
    browserName: 'chromium', hasTouch: true,
    launchOptions: { ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}), args: ['--no-sandbox'] },
  },
  projects: [320,375,390,414,430].map(width => ({ name: `chromium-${width}`, use: { viewport: { width, height: 844 } } })),
  webServer: [
    { command: 'node scripts/serve-preview.mjs app 4173', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
    { command: 'node scripts/serve-preview.mjs lab 4175', url: 'http://127.0.0.1:4175', reuseExistingServer: false },
  ],
});
