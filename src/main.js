import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/router";
import { createPinia } from 'pinia'
import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.scss";
//import 'uno.css'



const app = createApp(App)


app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.mount("#app")
document.title = "PySims"

