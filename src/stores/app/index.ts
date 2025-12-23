// src/stores/counter.ts
import {defineStore} from 'pinia'
import axios from 'axios'

export const useAppStore = defineStore('index', {
    state: () => ({
        MenuData: [],
    }),
    getters: {
        getMenuData: (state) => state.MenuData
    },
    actions: {
        setMenuData() {
            axios({
                method: "GET",
                url: "/api/common/user-grant-menu",
                params: {
                    parentId: "0",
                },
            }).then((res) => {
                let data = res.data.data, xh = 0, active_index = 0
                data.forEach((i, ix) => {
                    if (i.children && i.children.length != 0) {
                        i.children.map(j => {
                            active_index += 1
                            j.active_index = 'active_index' + active_index
                            xh += 1
                            j.xh = xh
                        })
                    } else {
                        active_index += 1
                        i.active_index = 'active_index' + active_index
                    }
                })
                let MenuData = data;
                MenuData.push({
                    menuId: -11,
                    menuCode: "setPassWord",
                    menuName: "修改密码",
                    params: {
                        w: '950px',
                        h: '520px',
                        c: 'setPassWord'
                    },
                    componentname: 'setPassWord',
                });
                MenuData.push({
                    menuId: 0,
                    menuCode: "login",
                    menuName: "退出登录",
                    path: "/mis",
                });
                this.MenuData = MenuData
            })
        },
    }

})