import { defineConfig } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pluginChecker({
      typescript: true,
    }),
    svgr(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    outDir: '../../backend/public',
  },
  server: {
    port: 3000,
  },
});
