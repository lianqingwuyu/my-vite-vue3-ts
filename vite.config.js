import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// 自动导入路由 需要可以用
import routerPagePlugin from './vite-plugin/vite-plugin-routerPage'
// Vite 的自动导入函数
import autoImportPlugin from './vite-plugin/vite-plugin-auto-import'
// Vite 的按需组件自动导入
import autoComponentsPlugin from './vite-plugin/vite-plugin-auto-components'
import UnoCSS from 'unocss/vite'
import vueScriptExtend from '@ctrlc/vite-plugin-vue-setup-extend';

export default defineConfig({
    base: '/fpjg2/',
    define: {
        global: 'globalThis',
    },
    plugins: [
        vue(),
        vueScriptExtend(),
        routerPagePlugin(),
        autoImportPlugin(),
        autoComponentsPlugin(),
        UnoCSS(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    server: {
        port: 8080,
        proxy: {
            // 代理所有以 /api 开头的请求
            '/api': {
                target: 'http://192.168.100.105:16001', //211.159.182.95
                changeOrigin: true,
                // 重写路径 --> 作用与vue配置pathRewrite作用相同
                rewrite: (path) => path.replace(/^\/api/, "/")
            },
            '/misapi': {
                //本地服务接口地址
                target: 'http://127.0.0.1:16011',
                changeOrigin: true,
                // 重写路径 --> 作用与vue配置pathRewrite作用相同
                rewrite: (path) => path.replace(/^\/misapi/, "/")
            }
        }
    }

})
