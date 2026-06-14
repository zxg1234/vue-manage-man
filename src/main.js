import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//路由
import router from './router'
//状态管理
import { createPinia } from 'pinia'
const app = createApp(App);
const pinia = createPinia()
app.use(ElementPlus)
.use(router)
.use(pinia)
.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}