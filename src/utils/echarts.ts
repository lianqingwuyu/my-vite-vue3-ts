// src/utils/echarts.ts
import * as echarts from 'echarts'
import type {ECharts, EChartsOption} from 'echarts'

// 存储所有创建的实例，方便批量管理
const echartsInstances = new Map<string, ECharts>()

/**
 * 创建 ECharts 实例
 * @param id 唯一标识（用于后续更新/销毁）
 * @param container 容器DOM/选择器
 * @param option 图表配置项
 * @param theme 图表主题（可选）
 * @param autoResize 是否开启窗口自适应（默认true）
 * @param events 需要绑定的事件（可选）
 * @returns ECharts 实例
 */
export const createEchart = (
    id: string,
    container: HTMLElement | string,
    option: EChartsOption,
    theme?: string | object,
    autoResize: boolean = true,
    events?: { name; handler: (params: any) => void }[]
): ECharts | null => {
    // 校验容器
    let el: HTMLElement | null = null
    if (typeof container === 'string') {
        el = document.querySelector(container)
    } else {
        el = container
    }

    if (!el) {
        console.error(`ECharts容器不存在：${container}`)
        return null
    }

    // 销毁已存在的同ID实例，避免重复创建
    if (echartsInstances.has(id)) {
        destroyEchart(id)
    }

    // 创建实例
    const instance = echarts.init(el, theme)
    // 设置配置项
    instance.setOption(option, true)
    // 存储实例
    echartsInstances.set(id, instance)

    // 绑定事件
    if (events && events.length) {
        events.forEach(({name, handler}) => {
            instance.on(name, handler)
        })
    }

    // 开启窗口自适应
    if (autoResize) {
        const resizeHandler = () => instance.resize()
        window.addEventListener('resize', resizeHandler)
        // 把resize事件处理器也存储起来，方便销毁时解绑
        ;(instance as any)._resizeHandler = resizeHandler
    }

    return instance
}

/**
 * 更新 ECharts 配置
 * @param id 实例唯一标识
 * @param option 新的配置项
 */
export const updateEchart = (id: string, option: EChartsOption): void => {
    const instance = echartsInstances.get(id)
    if (instance) {
        instance.setOption(option, true)
    } else {
        console.warn(`未找到ID为${id}的ECharts实例`)
    }
}
/**
 * 更新 ECharts 配置
 * @param id 实例唯一标识
 * @param option 新的配置项
 */
export const updateEchart2 = (id: string, option: EChartsOption): void => {
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
 * 手动调整图表尺寸
 * @param id 实例唯一标识
 */
export const resizeEchart = (id: string): void => {
    const instance = echartsInstances.get(id)
    instance?.resize()
}

/**
 * 销毁指定 ECharts 实例
 * @param id 实例唯一标识
 */
export const destroyEchart = (id: string): void => {
    const instance = echartsInstances.get(id)
    if (instance) {
        // 解绑resize事件
        if ((instance as any)._resizeHandler) {
            window.removeEventListener('resize', (instance as any)._resizeHandler)
        }
        // 销毁实例
        instance.dispose()
        // 移除存储
        echartsInstances.delete(id)
    }
}

/**
 * 销毁所有 ECharts 实例（适合页面卸载时调用）
 */
export const destroyAllEcharts = (): void => {
    echartsInstances.forEach((_, id) => {
        destroyEchart(id)
    })
}

/**
 * 获取 ECharts 实例
 * @param id 实例唯一标识
 * @returns ECharts 实例
 */
export const getEchartInstance = (id: string): ECharts | null => {
    return echartsInstances.get(id) || null
}