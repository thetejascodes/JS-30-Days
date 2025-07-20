import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/JS-30-Days/day21-random-quote-generator-React/',
  plugins: [react()],
})
