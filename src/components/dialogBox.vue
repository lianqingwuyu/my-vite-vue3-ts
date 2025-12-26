<template>
  <div :id="id" class="dialogBox" @click="close" :style="{background:`rgba(0, 0, 0, ${props.opacity || 0.8})`}">
    <div :class="['center', props.c]" :style="{ width: props.w, height: props.h,  background :props.b ? props.b : ''}"
         @click.stop="">
      <i class="el-icon-close" @click.stop="close"></i>
      <!-- 内容区域 -->
      <div :class="[props.params && props.params.headerType === 1 ? 'content ' : '' , 'wh100']">
        <component :is="currentComponentName" :params_box="props.params || {}" ref="dialogBox"
                   :style="props.styles || {}"
                 ></component>
      </div>
    </div>
  </div>
</template>

<script setup>
const getComponentNameFromPath = (pathStr) => {
  if (!pathStr) return
  let str = pathStr.replace(/^\.\//, '').replace('/index.vue', '').replace(/\.vue$/, '');
  if(str){
    return str.split('/').join('').toLowerCase()
  }
  return ''
}
const dialogBox = ref(null)
const props = defineProps({
  componentname: {
    type: String,
    default: ''
  },
  w: {
    type: String,
    default: '500px'
  },
  h: {
    type: String,
    default: '500px'
  },
  c: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  styles: {
    type: Object,
    default: () => ({})
  },
  params: {
    type: Object,
    default: () => {
      return {}
    }
  },
  opacity: {},
  b: {
    type: String,
    default: ''
  }
})
const currentComponentName = ref(props.componentname)
const close = () => {
  closeModel({...props.params})
}
onMounted(() => {
  const components = import.meta.glob('../components/**/*.vue');

  Object.entries(components).forEach(([path, component]) => {
    if (getComponentNameFromPath(path) === props.componentname.toLowerCase()) {
      currentComponentName.value =  defineAsyncComponent(component)
    }

  });
})
</script>
<style scoped lang="scss">

.dialogBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .8);
  z-index: 21111112;

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 40px 20px 40px;
  }

  .el-icon-close {
    color: #fff;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    font-size: 24px;
  }
}
</style>
