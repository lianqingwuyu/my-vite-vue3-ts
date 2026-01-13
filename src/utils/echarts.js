// src/utils/echarts.js
import * as echarts from 'echarts'
import {watch} from 'vue'

// 存储所有创建的实例
const echartsInstances = new Map()
// 存储监听的回调函数（用于销毁）
const echartWatchers = new Map()

/**
 * 创建 ECharts 实例
 * @param {string} id - 唯一标识
 * @param {HTMLElement|string} container - 容器DOM/选择器
 * @param {object} option - 图表配置项
 * @param {Array<{name: string, handler: Function}>} events - 绑定的事件
 * @returns {ECharts|null} ECharts 实例
 */
export const createEchart = (id, container, option, events) => {
    let el = null
    if (typeof container === 'string') {
        el = document.querySelector(container)
    } else {
        el = container
    }

    if (!el) {
        console.error(`ECharts容器不存在：${container}`)
        return null
    }

    // 销毁旧实例和旧监听
    if (echartsInstances.has(id)) {
        destroyEchart(id)
    }

    const instance = echarts.init(el)
    instance.setOption(option, true)
    echartsInstances.set(id, instance)

    // 绑定事件
    if (events && events.length) {
        events.forEach(({name, handler}) => {
            instance.on(name, handler)
        })
    }

    // 自适应
    const resizeHandler = () => instance.resize()
    window.addEventListener('resize', resizeHandler)
    instance._resizeHandler = resizeHandler

    return instance
}

/**
 * 监听响应式数据，自动更新图表
 * @param {string} id - 图表实例ID
 * @param {object|Array} sources - 要监听的响应式数据（支持单个/多个）
 * @param {Function} optionGenerator - 数据变化后生成新配置的函数
 * @param {boolean} deep - 是否深度监听（默认true）
 */
export const watchEchartData = (id, sources, optionGenerator, deep = true) => {
    // 校验实例是否存在
    if (!echartsInstances.has(id)) {
        console.warn(`未找到ID为${id}的ECharts实例，无法监听数据`)
        return
    }

    // 创建监听回调
    const watchCallback = (newVal, oldVal) => {
        const newOption = optionGenerator(newVal, oldVal)
        updateEchart(id, newOption)
    }

    // 执行Vue的watch，并存储停止监听的函数
    const stopWatch = watch(sources, watchCallback, {deep})

    // 把停止函数存入缓存
    if (!echartWatchers.has(id)) {
        echartWatchers.set(id, [])
    }
    echartWatchers.get(id).push(stopWatch)
}

/**
 * 直接监听ECharts配置项（简化版）
 * @param {string} id - 图表实例ID
 * @param {object} optionRef - 响应式的配置项ref
 */
export const watchEchartOption = (id, optionRef) => {
    watchEchartData(id, optionRef, (newOption) => newOption)
}

/**
 * 更新 ECharts 配置
 * @param {string} id - 实例ID
 * @param {object} option - 新配置项
 */
export const updateEchart = (id, option) => {
    const instance = echartsInstances.get(id)
    if (instance) {
        instance.setOption(option, true)
    } else {
        console.warn(`未找到ID为${id}的ECharts实例`)
    }
}
/**
 * 更新 ECharts 配置
 * @param {string} id - 实例ID
 * @param {object} option - 新配置项 某个对象
 */
export const updateEchart2 = (id, option) => {
    const instance = echartsInstances.get(id)
    var option2 = instance.getOption()
    for (var i in option) {
        option2[i] = option[i]
    }
    if (instance) {
        instance.setOption(option2, true)
    } else {
        console.warn(`未找到ID为${id}的ECharts实例`)
    }
}
/**
 * 调整图表尺寸
 * @param {string} id - 实例ID
 */
export const resizeEchart = (id) => {
    const instance = echartsInstances.get(id)
    if (instance) instance.resize()
}

/**
 * 销毁指定 ECharts 实例（含监听）
 * @param {string} id - 实例ID
 */
export const destroyEchart = (id) => {
    // 停止所有监听
    if (echartWatchers.has(id)) {
        const stopWatches = echartWatchers.get(id)
        stopWatches.forEach(stop => stop())
        echartWatchers.delete(id)
    }

    // 销毁实例
    const instance = echartsInstances.get(id)
    if (instance) {
        if (instance._resizeHandler) {
            window.removeEventListener('resize', instance._resizeHandler)
        }
        instance.dispose()
        echartsInstances.delete(id)
    }
}

/**
 * 销毁所有 ECharts 实例
 */
export const destroyAllEcharts = () => {
    echartsInstances.forEach((_, id) => {
        destroyEchart(id)
    })
}

/**
 * 获取 ECharts 实例
 * @param {string} id - 实例ID
 * @returns {ECharts|null} ECharts 实例
 */
export const getEchartInstance = (id) => {
    return echartsInstances.get(id) || null
}
