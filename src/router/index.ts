import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import pages from '~pages'

console.log(pages)
const routes = [
    {path: '/', redirect: '/home'},
    ...pages,
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router