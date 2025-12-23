<template>
  <div :id="id" class="dialogBox" @click="close" :style="{background:`rgba(0, 0, 0, ${opacity || 0.8})`}">
    <div :class="['center', c]" :style="{ width: w, height: h,  background :b ? b : ''}" @click.stop="">
      <i class="el-icon-close" @click.stop="close"></i>
      <!-- 可控制的表头 -->
      <div v-if="params && params.headerType === 1" class="header">
        <span>{{ params.headerTitle || '标题文字' }}</span>
      </div>
      <!--可控的表头切换按钮-->
      <div v-if="params && params.headerType === 2" class="header">
        <span v-for="(item, index) in ['管户概览', '管户类型']" :key="index"
              :class="{ active: currentTabIndex === index }"
              @click="changeTab(index)">{{ item }}</span>
      </div>
      <!-- 内容区域 -->
      <div :class="[params && params.headerType === 1 ? 'content ' : '' , 'wh100']">
        <component :is="currentComponentName" :params_box="params || {}" ref="dialogBox" :style="styles || {}"
                   @updateRowStatus="handleUpdateRowStatus"></component>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'dialogBox',
  props: ['componentname', 'w', 'h', 'c', 'id', 'styles', 'params', 'opacity', 'b'],
  data() {
    return {
      currentTabIndex: 0,
      currentComponentName: this.componentname
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.closeModel({...this.params, ...this.$refs['dialogBox']._data.dialogParams})
    },
    handleUpdateRowStatus(data) {
      // 通过全局事件总线或其他方式通知父组件更新状态
      this.$root.$emit('updateRowStatus', data);
    },
    changeTab(index) {
      this.currentTabIndex = index;
      // 根据选择的tab切换组件名称
      if (index === 0) {
        // 管户概览
        this.currentComponentName = 'qxyxqxj2-gjx-ghqk';
      } else if (index === 1) {
        // 管户类型
        this.currentComponentName = 'qxyxqxj2-gjx-ghlx';
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
