import { fileURLToPath, URL } from 'url'
import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ reactivityTransform: true }),
  Unocss({
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ]
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // devServer: {
  //   proxy: {
  //     // string shorthand
  //     '/api':
  //      {
  //       target: 'http://localhost:8000',
  //       //changeOrigin: true
  //     },
  //   }
  // }
})
