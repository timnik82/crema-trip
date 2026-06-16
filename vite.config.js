import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  optimizeDeps:
    command === 'serve'
      ? {
          include: ['react', 'react-dom', 'react/jsx-dev-runtime'],
        }
      : {
          noDiscovery: true,
          include: [],
        },
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:5173/',
      },
    },
    setupFiles: ['./src/test/setup.js'],
  },
}));
