
import router from "./router/router";
import store from "@/store/store.js";
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'
import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import 'element-plus/theme-chalk/dark/css-vars.css'
import "./styles/index.scss"
import 'uno.css'


import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
app.use(autoAnimatePlugin)
app.use(ElementPlus)
app.use(router)

app.mount("#app")

