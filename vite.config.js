import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  // GitHub Pages 배포 시에만 /aishop-frontend/ 사용, 로컬 dev는 /
  base: mode === 'production' ? '/aishop-frontend/' : '/',
}))
