import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'intent-react': path.resolve(__dirname, '../packages/react/src/index.ts'),
      'intent-core': path.resolve(__dirname, '../packages/core/src/index.ts'),
    },
  },
});
