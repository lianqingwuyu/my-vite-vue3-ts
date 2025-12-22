import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/page/home/index.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component:  Home }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router