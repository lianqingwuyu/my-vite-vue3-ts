import Vue from 'vue'
import dialogBox from "@/customComponents/dialogBox.vue";

/**
 * @param Component 组件实例的选项对象
 * @param props 组件实例中的prop
 */
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
  const comp = new (Vue.extend(dialogBox))({propsData: Object.assign({}, props, {id: id})}).$mount()
  document.getElementsByClassName('vue2-scale-box')[0].appendChild(comp.$el)
  comp.remove = () => {
    document.getElementsByClassName('vue2-scale-box')[0].removeChild(comp.$el)
    comp.$destroy()
  }
  return comp
}

export function closeModel(params) {
  let obj = dialogChange('dialogBoxId')
  $(`#${obj[obj.length - 1]}`).remove();
  obj.pop()
  localStorage.setItem('dialogBoxId', JSON.stringify(obj))
  console.log(params)
  localStorage.setItem('dialogBoxIdClose', JSON.stringify({length: obj.length, id: obj[obj.length - 1], params}))
}
