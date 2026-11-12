import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: `dist/${mode === 'lab' ? 'lab' : 'app'}`,
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: { input: resolve(mode === 'lab' ? 'lab/index.html' : 'index.html') },
  },
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  test: { environment: 'jsdom', setupFiles: ['./tests/setup.ts'], include: ['src/**/*.test.{ts,tsx}'], maxWorkers: 2 },
}));
