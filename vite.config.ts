import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls} from "@quasar/vite-plugin"
import path from 'path'
import vuetify from "vite-plugin-vuetify"


export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar(),
    vuetify({autoImport: true})
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