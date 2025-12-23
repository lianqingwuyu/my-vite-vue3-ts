import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import pinia from "@/stores/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';
import $ from 'jquery'
// 全局样式
import 'uno.css'
const app = createApp(App)
app.use(router).use(pinia).use(ElementPlus).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}