<template>
  <div class="tabs flex-j-a-c">
    <div class="item" :style="{cursor:tabs_params.list.length>1?'pointer':'context-menu'}"
         :class="[{active:ix == tabs_params.index}]" v-for="(i,ix) in tabs_params.list" :key="ix"
         @click="open(i,ix)">
      {{ i.label }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'qxyxqxj2-sy-tabs',
  props: {
    tabs_params: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  methods: {
    open(i, ix) {
      if (this.tabs_params.index.length == 1) return
      this.tabs_params.index = ix
    }
  }
}
</script>
<style scoped lang="scss">
.tabs {
  .item {
    border-radius: 6px 6px 6px 6px;
    font-weight: 500;
    font-size: 20px;
    color: #fff;
    margin-right: 20px;
    font-family: MiSans;
    &:last-child {
      margin-right: 0;
    }
  }

  .active {
    color: blue;
  }
}
</style>
