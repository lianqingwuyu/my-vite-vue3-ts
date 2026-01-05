import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router';
import {setupLayouts} from 'layouts-generated';
import generatedRoutes from 'virtual:generated-pages'
import pages from '~pages'

const routes = setupLayouts([
    {path: '/', redirect: '/home'},
    ...pages,
]);
// const routes = [
//     {path: '/', redirect: '/home'},
//     {
//         path: '/home',
//         component: () => import('@/views/home/index.vue'), // 使用我们之前创建的布局组件
//         children: [
//             {
//                 path: '/a',
//                 component: () => import('@/views/home/a/index.vue') // 使用我们之前创建的页面组件
//             },
//             // 其他嵌套路由配置
//         ]
//     }
//     ...pages,
// ]
generatedRoutes.forEach(v => {
    routes.push(v?.meta?.layout != false ? setupLayouts([v])[0] : v)
})
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
console.log(routes)
export default router;
