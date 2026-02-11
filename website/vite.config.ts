import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use local workspace packages in dev, npm packages in production
      'intent-core': path.resolve(__dirname, '../packages/core/src/index.ts'),
      'intent-react': path.resolve(__dirname, '../packages/react/src/index.ts'),
    },
  },
});
