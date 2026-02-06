import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components/atoms': path.resolve(__dirname, './src/components/atoms'),
      '@/components/molecules': path.resolve(__dirname, './src/components/molecules'),
      '@/components/organisms': path.resolve(__dirname, './src/components/organisms'),
      '@/components/templates': path.resolve(__dirname, './src/components/templates'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
  },
});
