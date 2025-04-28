import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Update base path for custom domain
  define: {
    // Define environment variables for conditional rendering
    'import.meta.env.VITE_IS_PROD': JSON.stringify(process.env.NODE_ENV === 'production')
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    assetsInlineLimit: 0, // Ensure all assets are processed as files
  }
})
