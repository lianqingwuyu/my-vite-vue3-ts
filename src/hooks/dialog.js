
import { createApp, h } from 'vue'
import dialogBox from "@/components/dialogBox.vue";

// 保持 [dialogChange](file://E:\work\swdpnew\src\api\dialog.js#L9-L20) 函数不变
function dialogChange(data, id, methods = 'get') {
  if (methods == 'get') {
    return JSON.parse(localStorage.getItem(data) || '[]')
  } else if (methods == 'set') {
    let obj = dialogChange(data)
    if (!obj) {
      localStorage.setItem(data, JSON.stringify([id]))
    } else {
      localStorage.setItem(data, JSON.stringify([...obj, id]))
    }
  }
}

export function showModel(props) {
  let id = Math.floor(Math.random(0, 10000) * 10000)
  dialogChange('dialogBoxId', id, 'set')

  // Vue 3 方式创建和挂载组件
  const app = createApp({
    render() {
      return h(dialogBox, { ...props, id: id })
    }
  })

  const vm = app.mount(document.createElement('div'))
  document.getElementsByClassName('roc-scale-box')[0].appendChild(vm.$el)

  vm.remove = () => {
    document.getElementsByClassName('roc-scale-box')[0].removeChild(vm.$el)
    app.unmount() // Vue 3 的卸载方法
  }
  return vm
}

export function closeModel(params) {
  let obj = dialogChange('dialogBoxId')
  $(`#${obj[obj.length - 1]}`).remove();
  obj.pop()
  localStorage.setItem('dialogBoxId', JSON.stringify(obj))
  localStorage.setItem('dialogBoxIdClose', JSON.stringify({length: obj.length, id: obj[obj.length - 1], params}))
}