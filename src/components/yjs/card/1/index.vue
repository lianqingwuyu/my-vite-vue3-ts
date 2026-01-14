<template>
  <div class="wh100 box">yjsCard1</div>
</template>
<script setup >
const {params_box} = defineProps({
  params_box: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
console.log(toRaw(params_box))
</script>
<style scoped lang="scss">
.box {
  background: red;
}
</style>

