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
    }

})
