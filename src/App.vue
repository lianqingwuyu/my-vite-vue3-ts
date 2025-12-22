<template>
  <ScaleBox  :width="1920" :height="1080">
    <Backbtn></Backbtn>
    <router-view></router-view>
  </ScaleBox>
</template>
<script setup>
import ScaleBox from 'vue3-scale-box'
onMounted(()=>{
  refreshToken();
})
</script>