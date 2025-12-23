<template>
  <ScaleBox :width="1920" :height="1080"  bgc="transparent" :delay="100" @scaleChange="scaleChange">
    <Backbtn></Backbtn>
    <router-view :key="key"></router-view>
  </ScaleBox>
</template>
<script setup>
import ScaleBox from 'vue3-scale-box'

const scaleChange = (scale) => {
  document.documentElement.style.setProperty('--box-scale', scale);
}
// fullPath

//获取路由实例
const route = useRoute()
const key = ref(route.fullPath)
watch(
    () => route.fullPath,
    (toPath, fromPath) => {
      key.value = toPath
    }
)

onMounted(() => {
  refreshToken();
})
</script>
<style lang="scss">
@use "@/styles/app.scss";

:root {
  --box-scale: 1;
}
.wh100{
  width: 100%;
  height: 100%;
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