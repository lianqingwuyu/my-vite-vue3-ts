import { createApp } from 'vue'
import 'echarts-gl'  // 引入 echarts-gl 扩展
import './style.css'
import App from './App.vue'
import router from "./router"
import pinia from "@/stores/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css';
// 全局样式
import 'uno.css'
// 导入组件注册函数

const app = createApp(App)
// 注册自定义组件
// registerComponents(app)
app.use(router).use(pinia).use(ElementPlus).mount('#app')