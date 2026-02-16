import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'dist-electron',
    emptyOutDir: true,
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/electron/main.ts'),
        preload: resolve(__dirname, 'src/electron/preload.ts'),
      },
      external: ['electron', 'playwright', 'chromium', 'path'],
      output: {
        format: 'cjs',
        entryFileNames: '[name].js',
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
