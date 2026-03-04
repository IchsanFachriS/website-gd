import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Gunakan VITE_BASE_URL dari .env, fallback ke '/' untuk dev lokal
// Untuk deployment di /website-gd/, set VITE_BASE_URL=/website-gd/ di .env.production
const base = process.env.VITE_BASE_URL ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})