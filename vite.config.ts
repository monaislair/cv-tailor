import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // @react-pdf/renderer is a PDF engine — its chunk is large by nature, lazy-loaded on demand
    chunkSizeWarningLimit: 2000,
  },
})
