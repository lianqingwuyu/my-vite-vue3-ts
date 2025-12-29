// src/api/modules/user.js
import api from '@/utils/api'
import {refreshToken} from "@/hooks/methods.js";

// 用户相关接口（二次封装后）
export const userApi = {
    //POST请求，关闭加载中提示，重试1次
    login: (data) => api.post('/user/login', data, {showLoading: false, retry: 1}),
    // GET请求
    getUserInfo: () => api.get('/user/info'),
    // PUT请求
    updateUserInfo: (data) => api.put('/user/update', data),
    // DELETE请求
    deleteUser: (id) => api.delete(`/user/${id}`),
    // 批量请求
    getUserAndRole: (userId) => api.batch([
        {url: `/user/${userId}`, method: 'GET'},
        {url: `/role/user/${userId}`, method: 'GET'}
    ]),

    refreshToken: (data) => api.post("/swdp-auth/oauth/swdp-token", data, {baseURL: '/misapi'}),
    //获取默认是否展示领导批示弹出
    getuserMenu: (data) => api.get("/common/user-grant-menu", data),
    //获取默认是否展示领导批示弹出
    sfczwcldps: (data) => api.get('/yjsjg/ldps/sfczwcldps', data),
}
