import router from './router/router';
//import from '@/store/store.js';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import '@/style.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/index.scss';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

/* This block is for entering - hiddening elements in dom. It was used on vue-animation*/
import type { Directive, DirectiveBinding, VNode } from 'vue';

export const appear: Directive = {
  beforeMount(element: HTMLElement) {
    element.style.visibility = 'hidden';
  },
  updated(element: HTMLElement, binding: DirectiveBinding<boolean>, node: VNode) {
    if (!binding.value === !binding.oldValue || null === node.transition) {
      return;
    }
    if (!binding.value) {
      node.transition.leave(element, () => {
        element.style.visibility = 'hidden';
      });
      return;
    }
    node.transition.beforeEnter(element);
    element.style.visibility = '';
    node.transition.enter(element);
  }
};
/* end block */

app.use(pinia);
app.use(autoAnimatePlugin);
app.use(ElementPlus);
app.use(router).directive('appear', appear);
app.mount('#app');
