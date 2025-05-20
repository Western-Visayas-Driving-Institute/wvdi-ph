import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wvdi-ph/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        '404': 'index.html' // For SPA routing on GitHub Pages
      }
    }
  },
  server: {
    open: true
  }
})
