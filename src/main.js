import "bootstrap/dist/css/bootstrap.css";
import "bootstrap"
import router from "./router/router";
import { createPinia } from 'pinia'
import { createApp } from "vue";
import App from "./App.vue";



const app = createApp(App)

app.component(
    // the registered name
    'NavVue',
    // the implementation
    {

    })


app.use(router)
app.use(createPinia())
app.mount("#app")
document.title = "PySims"

