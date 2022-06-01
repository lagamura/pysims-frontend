import { fileURLToPath, URL } from 'url'
import Unocss from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ reactivityTransform: true }),Unocss({ /* options */ })], // Experimental feature UNSTABLE!!!
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //server: {port:8000}
})
