<template>
  <div class="echart-auto-demo">
    <!-- 图表容器 -->
    <div id="auto-chart" style="width: 100%; height: 400px;"></div>

    <!-- 测试数据修改 -->
    <div class="controls">
      <button @click="changeSalesData">修改销量数据</button>
      <button @click="changeTitle">修改图表标题</button>
      <button @click="resetAllData">重置所有数据</button>
    </div>
  </div>
</template>

<script setup lang="ts">

// 1. 定义响应式数据（业务数据）
const salesData = ref([120, 200, 150, 80, 70]) // 销量数据
const chartTitle = ref('月度销量统计（自动更新）') // 图表标题

// 2. 定义完整的ECharts配置项（响应式）
const chartOption = reactive({
  title: { text: chartTitle.value, left: 'center' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月'] },
  yAxis: { type: 'value' },
  series: [
    { name: '线上销量', type: 'bar', data: salesData.value }
  ]
})

// 图表唯一ID
const CHART_ID = 'auto-update-chart'

// 3. 挂载时创建图表 + 监听数据
onMounted(() => {
  // 创建图表实例
  createEchart(
      CHART_ID,
      '#auto-chart',
      chartOption,
      null,
      true,
      [{ name: 'click', handler: (params) => console.log('点击图表', params) }]
  )

  // ========== 场景1：监听单个响应式数据（销量数据） ==========
  watchEchartData(
      CHART_ID,
      salesData, // 监听的数据源
      (newVal) => {
        // 数据变化后，返回需要更新的配置项（增量更新）
        return {
          series: [{ name: '线上销量', data: newVal }]
        }
      }
  )

  // ========== 场景2：监听多个响应式数据（标题 + 销量） ==========
  // watchEchartData(
  //   CHART_ID,
  //   [salesData, chartTitle], // 监听多个数据源
  //   ([newSales, newTitle]) => {
  //     return {
  //       title: { text: newTitle },
  //       series: [{ data: newSales }]
  //     }
  //   }
  // )

  // ========== 场景3：直接监听完整的配置项（最简化） ==========
  // watchEchartOption(CHART_ID, chartOption)
})

// 4. 测试：修改数据（图表会自动更新）
const changeSalesData = () => {
  // 随机修改销量数据
  salesData.value = salesData.value.map(() => Math.floor(Math.random() * 200 + 50))
}

const changeTitle = () => {
  chartTitle.value = `月度销量统计（${new Date().toLocaleTimeString()}）`
  // 如果监听了配置项，这里也可以直接改配置项
  // chartOption.title.text = `月度销量统计（${new Date().toLocaleTimeString()}）`
}

const resetAllData = () => {
  salesData.value = [120, 200, 150, 80, 70]
  chartTitle.value = '月度销量统计（自动更新）'
  chartOption.title.text = chartTitle.value
}

// 5. 卸载时销毁实例（自动销毁所有监听）
onUnmounted(() => {
  destroyEchart(CHART_ID)
})
</script>

<style scoped>
.echart-auto-demo {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  background: #409eff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #66b1ff;
}
</style>