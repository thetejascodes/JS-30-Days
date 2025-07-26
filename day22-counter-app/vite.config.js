import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/JS-30-Days/day22-counter-app/',  
  plugins: [react()],
})
