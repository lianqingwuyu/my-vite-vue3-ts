import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import pinia from "@/stores/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局样式
import 'uno.css'
createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')
