import { createRouter, createWebHistory ,createWebHashHistory } from 'vue-router'
import Home from '@/page/home/index.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component:  Home }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router