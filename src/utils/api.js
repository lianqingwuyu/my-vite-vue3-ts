// src/utils/api.js
import request from './request'
export const axios =  request
const requestApi = async (options) => {
    const {
        url,
        method = 'GET',
        params,
        data,
        headers = {},
        showLoading = false,
        retry = 0,
        baseURL ='/api'
    } = options

    // 扩展功能1：加载中提示（可替换为自己的Loading组件）
    let loadingInstance = null
    if (showLoading) {
        loadingInstance = ElMessage.loading({
            message: '加载中...',
            duration: 0 // 手动关闭
        })
    }
    // 扩展功能2：失败重试逻辑
    let attempt = 0
    while (attempt <= retry) {
        try {
            // 核心：调用底层axios实例
            const result = await request({
                url,
                method,
                params,
                data,
                headers,
                baseURL,
            })
            return result
        } catch (error) {
            attempt++
            // 最后一次重试失败则抛出错误
            if (attempt > retry) {
                throw error
            }
            // 重试间隔（可选）
            await new Promise(resolve => setTimeout(resolve, 1000))
        } finally {
            // 关闭加载中提示
            if (showLoading && loadingInstance) {
                loadingInstance.close()
            }
        }
    }
}

// 语义化封装：简化GET/POST/PUT/DELETE调用
const api = {
    get: (url, params = {}, options = {}) => {
        return requestApi({...options, url, method: 'GET', params})
    },

    post: (url, data = {}, options = {}) => {
        return requestApi({...options, url, method: 'POST', data})
    },
    put: (url, data = {}, options = {}) => {
        return requestApi({...options, url, method: 'PUT', data})
    },

    delete: (url, params = {}, options = {}) => {
        return requestApi({...options, url, method: 'DELETE', params})
    },
    batch: (requests) => {
        return Promise.all(requests.map(req => requestApi(req)))
    }
}

export default api