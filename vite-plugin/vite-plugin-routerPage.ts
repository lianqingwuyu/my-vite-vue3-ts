import routerPages from 'vite-plugin-pages'
import {camelCase} from 'change-case'

export default () => {
    return routerPages({
        extendRoute(route, parent) {
            // 优化路由名称转换逻辑
            if (route.name && route.name.includes('-')) {
                route.name = camelCase(route.name)
            }

            // 优化路径处理逻辑
            if (route.path && route.path.lastIndexOf('/') > 0) {
                const pathSegments = route.path.split('/').filter(segment => segment)
                if (pathSegments.length > 0) {
                    route.path = `/${pathSegments[pathSegments.length - 1]}`
                }
            }
            return route
        },
        // 修正目录配置
        dirs: [
            {dir: 'src/views', baseRoute: ''}, // 改为正确的目录路径
        ],
        exclude: ['**/error/*.vue'], // 使用更明确的排除模式
        extensions: ['vue'],
    })
}
