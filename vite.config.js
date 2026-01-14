import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// 自动导入路由 需要可以用
import routerPagePlugin from './vite-plugin/vite-plugin-routerPage'
// Vite 的自动导入函数
import autoImportPlugin from './vite-plugin/vite-plugin-auto-import'
// Vite 的按需组件自动导入
import autoComponentsPlugin from './vite-plugin/vite-plugin-auto-components'

/**
 * 导入 unplugin-vue-setup-extend-plus 插件的 Vite 集成模块
 * 该插件用于扩展 Vue 3 的 setup 语法，提供更多的功能和便利性
 * @module VueSetupExtend
 */
import VueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
/**
 * 导入UnoCSS Vite插件，用于在Vite项目中提供原子化CSS功能
 * 该插件将UnoCSS集成到Vite构建流程中，支持即时编译和热更新
 */

import UnoCSS from 'unocss/vite'
/**
 * 导入Vue布局插件，用于在Vite项目中自动注册和管理页面布局组件
 * 该插件提供了基于文件系统的布局路由功能
 */
import Layouts from 'vite-plugin-vue-layouts';


export default defineConfig({
    base: '/fpjg/',
    define: {
        global: 'globalThis',
    },
    build: {
        minify: 'esbuild',
        target: 'es2015',
        outDir: 'dist',
        assetsDir: 'assets',
        cssCodeSplit: true,
        sourcemap: false,
        chunkSizeWarningLimit: 500,
        assetsInlineLimit: 4096,
        rollupOptions: {
            output: {
                // chunks
                manualChunks: {
                    'vue': ['vue', 'vue-router'],
                    'imba-packages': ['imba-cache'],
                    'lodash-es': ['lodash-es'],
                    'echarts': ['echarts', 'echarts-gl'],
                },
            },
        },
    },
    plugins: [
        vue(),
        VueSetupExtend(),
        routerPagePlugin(),
        autoImportPlugin(),
        autoComponentsPlugin(),
        UnoCSS(),
        Layouts(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '#': resolve(__dirname, 'types'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
        port: 8080,
        proxy: {
            // 代理所有以 /api 开头的请求
            '/api': {
                target: 'http://211.159.182.95:16001', //211.159.182.95
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
