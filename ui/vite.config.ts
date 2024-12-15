import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import TanStackRouterVite from '@tanstack/router-plugin/src/vite.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [viteReact(), TanStackRouterVite()],
});
