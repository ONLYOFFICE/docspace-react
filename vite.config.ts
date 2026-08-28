import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // No index.html, no static assets — this project only builds a bundle.
  publicDir: false,
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'index.cjs' : 'index.js'),
    },
    rollupOptions: {
      // Peer dependencies: the consuming app provides these, never bundle them.
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@onlyoffice\/docspace-sdk-js($|\/)/,
      ],
    },
    sourcemap: true,
  },
})
