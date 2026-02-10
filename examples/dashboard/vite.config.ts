import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'intent-react': '../../packages/react/src/index.ts',
      'intent-core': '../../packages/core/src/index.ts',
    },
  },
});
