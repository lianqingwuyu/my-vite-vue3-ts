import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import pinia from "@/stores/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';
// 全局样式
import 'uno.css'
// 导入组件注册函数
import { registerComponents } from './hooks/customComponents.js'

const app = createApp(App)
// 注册自定义组件
registerComponents(app)
app.use(router).use(pinia).use(ElementPlus).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}