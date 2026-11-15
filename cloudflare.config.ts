import { defineConfig } from 'cf/config';
/** Existing target preserved. Device preview is isolated and unreachable until protection is verified. */
export default defineConfig(({ mode }) => ({
  worker: {
    name: mode === 'device-preview' ? 'goudduo-device-preview' : 'goudduo-p1-preview',
    compatibilityDate: '2026-11-12',
    assets: { notFoundHandling: 'single-page-application' },
    ...(mode === 'device-preview' ? { workersDev: false, previewUrls: false } : {}),
  },
}));
