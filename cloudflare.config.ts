import { defineConfig } from 'cf/config';
/** New, isolated preview target only. No account, bindings, routes, credentials or server code. */
export default defineConfig({
  worker: {
    name: 'goudduo-p1-preview',
    compatibilityDate: '2026-11-12',
    assets: { notFoundHandling: 'single-page-application' },
  },
});
