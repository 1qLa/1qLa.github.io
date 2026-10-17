import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://1qLa.github.io/ はドメイン直下で公開されるので、base は '/' のまま
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,   // 3D表示(Three.js 本体)の別ファイルが約630kBのため
  },
  test: {
    environment: 'node',
  },
})
