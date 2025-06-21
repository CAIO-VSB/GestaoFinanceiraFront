import { createApp } from 'vue'
import App from './App.vue'
import {  Quasar } from "quasar"
import quasarLang from 'quasar/lang/pt-BR'
import 'quasar/src/css/index.sass'
import router from './router/router.ts'
import '@quasar/extras/material-icons/material-icons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"


const app = createApp(App)

app.use(Quasar, {
    plugins: {},
    lang: quasarLang,
    framework: {
        iconSet: 'material-icons', 
      },
    cssAddon: true,
})

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  icons: {
    defaultSet: "mdi"
  }
})

app.use(router)
app.use(vuetify)
app.mount('#app')



