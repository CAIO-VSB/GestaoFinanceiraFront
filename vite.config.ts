import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls} from "@quasar/vite-plugin"
import tailwindcss from '@tailwindcss/vite';
import path from 'path'


export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    tailwindcss(),
    quasar(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // ← isso permite usar "@/components/Inicio.vue"
    }
  },

  server: {
    host: true
  }
})