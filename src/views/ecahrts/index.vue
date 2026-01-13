<template>
  <div class="echart-demo">
    <!-- 图表容器 -->
    <div id="sales-chart" style="width: 100%; height: 400px;"></div>
    <div ref="profitChartRef" style="width: 100%; height: 400px; margin-top: 20px;"></div>

    <!-- 操作按钮 -->
    <div class="btn-group">
      <button @click="updateSalesChart">更新销量数据</button>
      <button @click="resizeAllCharts">调整图表尺寸</button>
    </div>
  </div>
</template>

<script setup>
// 1. 定义图表ID（唯一标识）
const SALES_CHART_ID = 'sales-chart'
const PROFIT_CHART_ID = 'profit-chart'

// 2. 定义图表配置项
const salesOption = {
  title: { text: '月度销量统计', left: 'center' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['线上', '线下'], top: 30 },
  xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月'] },
  yAxis: { type: 'value' },
  series: [
    { name: '线上', type: 'bar', data: [120, 200, 150, 80, 70] },
    { name: '线下', type: 'bar', data: [80, 150, 100, 60, 90] }
  ]
}

const profitOption = {
  title: { text: '月度利润统计', left: 'center' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月'] },
  yAxis: { type: 'value' },
  series: [{ name: '利润', type: 'line', data: [80, 150, 100, 60, 90] }]
}

// 3. 定义事件处理器
const handleSalesClick = (params) => {
  console.log('点击销量图表：', params)
  alert(`【${params.seriesName}】-${params.name}：${params.value}`)
}

const handleProfitMouseOver = (params) => {
  console.log('悬浮利润图表：', params)
}

// 4. Vue3 生命周期 - 挂载时创建图表
const profitChartRef = ref(null)
onMounted(() => {
  // 创建销量图表（通过ID选择器）
  createEchart(
      SALES_CHART_ID,
      '#sales-chart',
      salesOption,
      null, // 不使用自定义主题
      true, // 开启自适应
      [{ name: 'click', handler: handleSalesClick }] // 绑定点击事件
  )

  // 创建利润图表（通过ref获取DOM）
  if (profitChartRef.value) {
    createEchart(
        PROFIT_CHART_ID,
        profitChartRef.value,
        profitOption,
        null,
        true,
        [{ name: 'mouseover', handler: handleProfitMouseOver }]
    )
  }
})

// 5. 自定义操作函数
// 更新销量图表数据
const updateSalesChart = () => {
  const newOption = {
    series: [
      { name: '线上', type: 'bar', data: [150, 220, 180, 90, 110] },
      { name: '线下', type: 'bar', data: [90, 160, 110, 70, 100] }
    ]
  }
  updateEchart2(SALES_CHART_ID, newOption)
}

// 调整所有图表尺寸
const resizeAllCharts = () => {
  resizeEchart(SALES_CHART_ID)
  resizeEchart(PROFIT_CHART_ID)
}

// 6. Vue3 生命周期 - 卸载时销毁所有实例（关键：防止内存泄漏）
onUnmounted(() => {
  destroyAllEcharts()
})
</script>

<style scoped>
.echart-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.btn-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  background: #409eff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #66b1ff;
}
</style>