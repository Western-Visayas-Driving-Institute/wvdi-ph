import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Update base path for custom domain
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        '404': 'index.html', // Copy index.html to 404.html for SPA routing on GitHub Pages
      }
    }
  }
})
