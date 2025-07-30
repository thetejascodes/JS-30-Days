import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/JS-30Days/day25-music-player-app/',
  plugins: [react()],
})
