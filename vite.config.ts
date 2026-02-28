import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/website-gd/', // ← WAJIB jika bukan custom domain
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  // server.proxy hanya untuk dev, tidak perlu diubah
})
