import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/Assets',
      '@components': '/src/Components',
      '@hooks': '/src/Hooks',
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: './src/test/setup.ts',
  },
});
