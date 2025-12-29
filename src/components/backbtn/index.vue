<template>
  <div>
    <div class="backbtn flex-item-cneter flex-center pointer">
      <img src="@/assets/backbtn/icon.png" alt="" @click="init" class="no-inherit">
    </div>
    <div class="yy" v-if="drawer" @click="drawer = false"></div>
    <div class="box " v-if="drawer">
      <div v-for="(item,index) in userStore.MenuData" :key="index" class="b_item">
        <div
            :class="['left',`${item.active_index}`,{left2:!(item.children&&item.children.length>0) , active : MenuData_active.path == item.path  }]"
            @click="handleselect(item,item.path,[item.path],1)"> {{ item.menuName }}
        </div>
        <template v-if="item.children&&item.children.length>0">
          <div class="right">
            <div :class="['r_item',`${n.active_index}`,{ active : MenuData_active.path == n.path }]"
                 :style="{height:item.children.length == 1 ? '100%':'auto'}"
                 v-for="(n, i) in item.children" :key="i" @click="handleselect(n,n.path,[item.path,n.path],2)">
              {{ n.xh }}.{{ n.menuName }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ElMessage, ElMessageBox } from 'element-plus'
import {useAppStore} from '@/stores/app'
//获取 /stores/app 模块的实例
const userStore = useAppStore()
//获取菜单数据
userStore.setMenuData()
//获取路由实例
const route = useRoute()
//当前选择路由菜单
const MenuData_active = ref({})
//获取组件当前状态
const drawer = ref(false)
// 监听响应式变量
watch(
    () => route.path,  // 监听路由路径变化
    (toPath, fromPath) => {
      // 处理路由变化逻辑
      let time;
      time = setInterval(() => {
        if (toRaw(userStore.MenuData).length != 0) {
          toRaw(userStore.MenuData).map(i => {
            if (i.children && i.children.length != 0) {
              i.children.map(j => {
                route_active(old, j)
              })
            } else {
              route_active(old, i)
            }
          })
          clearInterval(time)
        }
      }, 1000)
    }
)
const handleselect = (item, key, keyPath, type) => {
  //debugger
  //return
  //修改密码
  if (item.componentname) {
    let obj = {
      w: item.params.w,
      h: item.params.h,
      c: item.params.c,
      componentname: item.componentname,
    }
    this.showModel(obj)
    return
  }
  if (!key || (type == 1 && item.children && item.children.length != 0)) return
  let url = "";
  if (key == "/mis") {
    open();
    drawer.value = false
    return;
  } else {
    url = key;
    setLocal("path", route.path);
    setLocal("path_name", location.pathname);
  }
  location.replace(url);
  drawer.value = false
}
const route_active = (old, newold) => {
  if (String(newold.path).includes('/fpjg') || String(newold.path).includes('/qxj')) {
    let path = newold.path.split('/#')[1]
    if (old.fullPath == path) {
      MenuData_active.value = newold
    }
  } else if (String(newold.path).includes('/zhjg')) {
    if (old.fullPath == newold.path) {
      MenuData_active.value = newold
    }
  }

}
const open = () => {

  ElMessageBox.confirm("即将退出登录, 是否继续?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(() => {
        this.$ajax({
          method: "GET",
          url: '/misapi/swdp-auth/oauth/logout',
          headers: {
            TenantId: "10000",
          },
          params: {},
        })
            .then((res) => {
              this.$message({
                type: "success",
                message: "退出成功!",
              });
              removeLocal("BladeAuth");
              removeLocal("refresh_token");
              let url = "";
              if (window.location.href.indexOf("localhost") == -1) {
                url = window.location.origin + "/mis/#/login";
              } else {
                url = "http://localhost:1888/mis/#/login";
              }

              location.replace(url);
            })
            .catch((err) => {
            });
      })
      .catch(() => {
      });
}
const init = () => {
  drawer.value = true;
  nextTick(() => {
    if (MenuData_active.value) {
      $(".box ").scrollTop($(`.${MenuData_active.value.active_index}`).offset().top - 40)
    }
  })
}

</script>

<style scoped lang="scss">
@font-face {
  font-family: Chuangxiang;
  src: url("~@/assets/ttf/Yipin_Chuangxiang.ttf");
}

.active {
  background: #4B5CA7 !important;
}

.yy {
  position: absolute;
  z-index: 20999933;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(23, 22, 26, 0.65);
}

::v-deep .el-drawer {
  background: rgba(32, 34, 42, 0.8);
}

::v-deep {
  .el-drawer__body {
    background: rgba(32, 34, 42, 0);
  }
}

::v-deep {
  .el-menu-item {
    text-align: start;
  }
}


::v-deep .el-submenu__title {
  text-align: left;
}

.box {
  background: #2e2d30;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  overflow-y: auto;
  z-index: 20999993;

  .b_item {
    display: flex;
    border-bottom: 1px solid #000;

    .left {
      background: rgba(21, 28, 58, 0.9);
      width: 40px;
      padding: 5px 10px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: MiSans, MiSans;
      font-weight: 500;
      font-size: 14px;
      color: #74D0FF;
      line-height: 18px;
    }

    .left2 {
      width: 100%;
      padding: 15px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: #434246;
        color: #fff;
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 400;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 18px;

      .r_item {
        padding: 15px 20px;
        width: 100%;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
          background: #434246;
          color: #fff;
        }
      }
    }
  }
}

.backbtn {
  z-index: 20000901;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 40px;
  background: #fff;
  border-radius: 0 0px 5px 0px;
  text-align: center;
  line-height: 40px;

  .no-inherit {
    font-size: 24px;
    color: #000;
    display: none;
  }

  &:hover {
    width: 50px;

    .no-inherit {
      display: block;
      width: 30px;
      height: 30px;
      font-size: 24px;
    }
  }
}

::-webkit-scrollbar {
  width: 10px; /* 对于垂直滚动条，设置宽度 */
  height: 10px; /* 对于水平滚动条，设置高度 */
  background-color: #f1f1f1; /* 滚动条背景色 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: rgba(21, 28, 58, 1); /* 轨道背景色 */
}

/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: rgba(21, 28, 58, 1); /* 滑块背景色 */
}

/* 滑块hover效果 */
::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1; /* 滑块hover背景色 */
}

.ttttttt {
  font-size: 18px;
  font-family: Chuangxiang;
}
</style>
