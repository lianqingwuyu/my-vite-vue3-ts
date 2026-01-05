<template>
  <div class="flex-between wh100">
    <PublicTabs :tabs_params="tabs_params"></PublicTabs>
    <PublicTable ref="publicTable" @cellClick="cellClick" className="table" :maxHeight="435"
                 :table_obj="table_obj"></PublicTable>
    <router-link to="/ceshi">关于我们</router-link>
    <router-view></router-view>
  </div>
</template>
<script setup>
const table_obj = ref({
  loading: false,
  tableData: [
    {mc: '行业名称1', hymc: '行业名称1', hs: '1', value: '1', tb: '1', pm: 1}
  ],
  tableHeaderData: [
    {
      label: '排名',
      key: 'pm',
      width: 60
    },
    {
      label: '行业名称',
      key: 'mc',
      align: "center",
      children: [
        {
          label: '行业名称',
          key: 'hymc',
          align: "center",
          width: 200,
          sortable: true,
          sortable_key: ''

        },
        {
          label: '户数',
          key: 'hs',
          width: 90,
          align: "center",
        },
      ]
    },
    {
      label: '户数',
      key: 'value',
      align: "center",
      width: 90
    },
    {
      label: '同比',
      key: 'tb',
      width: 90,
      align: "center",
      dw: '%'
    }
  ],
})
const tabs_params = ref({
  list: [
    {label: '行业名称1', value: '0'},
    {label: '行业名称2', value: '1'},
  ],
  index: 0
})
const router = useRoute()
const cellClick = (row, column, cell, event) => {
  console.log(row, column, cell, event)
}
</script>
<style scoped>
.flex-between {
  background: red;
}
</style>
<script>
export default {
  name: 'Home',
  meta: {
    title: '首页',
    requiresAuth: true,
    roles: ['admin', 'user']
  }
}
</script>
