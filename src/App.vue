<template>
  <ScaleBox :width="1920" :height="1080" bgc="transparent" :delay="100" @scaleChange="scaleChange">
    <Backbtn></Backbtn>
    <router-view :key="key"></router-view>
  </ScaleBox>
</template>
<script setup>
import ScaleBox from 'vue3-scale-box'
import {useAppStore} from '@/stores/app'
import {userApi} from "@/utils/modules/user.js";
import {getLocal, setLocal} from "@/hooks/methods.js";


const scaleChange = (scale) => {
  document.documentElement.style.setProperty('--box-scale', scale);
}

//获取 /stores/app 模块的实例
const userStore = useAppStore()
//获取路由实例
const route = useRoute()
const key = ref(route.fullPath)
const userType = ref(!key.value.includes('qxyxqxj2'))
watch(
    () => [route.fullPath, userStore.yjs_ldps],
    ([newAge, newCity], [oldAge, oldCity]) => {
      if (newAge) {
        key.value = newAge
      }
      if (newCity) {
        let obj = {
          w: '65%',
          h: '670px',
          c: userType.value ? 'yjs_table' : 'yjs_dialog_table',
          params: {
            type: userType.value ? 1 : 2,
            maxHeight: userType.value ? 555 : 498,
            ...toRaw(userStore.yjs_ldps_params)
          },
          componentname: 'YjsTable1'
        }
        showModel(obj)
      }
    },
    {deep: true}
)
onMounted(() => {
  refreshToken();
  if (!JSON.parse(getLocal('yjs_table') || 'false') && !location.hash.includes('ldps_box') && !location.hash.includes('qxyxqxj2')) {
    //获取默认是否展示领导批示弹出
    userApi.sfczwcldps().then(res => {
      let data = res.data.data
      userStore.setKeyData('setyjsldps', data)
      userStore.setKeyData('saveAppData', {
        key: 'yjs_ldps_params',
        data: {
          title: '领导批示'
        }
      })
      setLocal('yjs_table', true)
    })

  }
})
const refreshToken = () => {
  var url = window.location.href;
  if (url.indexOf("hnredirect") > 0) {
    return
  }
  var refresh_token = "undefined";
  if (getLocal("saber-refreshToken")) {
    refresh_token = JSON.parse(getLocal("saber-refreshToken")).content;
  }
  if (refresh_token == "undefined" || (refresh_token != "undefined" && !refresh_token)) {
    refresh_token = window.localStorage.refresh_token;
  }
  let data = {
    grant_type: "refresh_token",
    refresh_token: refresh_token
  }
  //刷新token
  userApi.refreshToken(data).then((res) => {
    setLocal("refresh_token", res.data.refresh_token);
    setLocal("BladeAuth", res.data.access_token);
  })
}
</script>
<style lang="scss">
@use "@/styles/app.scss";

:root {
  --box-scale: 1;
}
.flex-j-a-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex {
  display: flex;
}

.itemCenter {
  display: flex;
  align-items: center;
}

.flexColumn {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.space-between {
  display: flex;
  justify-content: space-between;
}


.scroll::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/*正常情况下滑块的样式*/
.scroll::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
  -webkit-box-shadow: inset1px1px0rgba(0, 0, 0, .1);
}

/*鼠标悬浮在该类指向的控件上时滑块的样式*/
.scroll:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, .2);
  border-radius: 10px;
  -webkit-box-shadow: inset1px1px0rgba(0, 0, 0, .1);
}

/*鼠标悬浮在滑块上时滑块的样式*/
.scroll::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, .4);
  -webkit-box-shadow: inset1px1px0rgba(0, 0, 0, .1);
}

/*正常时候的主干部分*/
.scroll::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0);
  background-color: white;
}
</style>