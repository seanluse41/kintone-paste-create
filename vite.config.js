// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'KintonePortalCustomization',
      fileName: () => 'kintone-paste-create.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});