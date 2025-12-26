<template>
  <div class="flex-between wh100">

    <PublicTable ref="publicTable" @cellClick="cellClick" className="table" :maxHeight="435" :table_obj="table_obj"></PublicTable>
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
      align: "left",
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
          width: 90
        },
      ]
    },
    {
      label: '户数',
      key: 'value',
      width: 90
    },
    {
      label: '同比',
      key: 'tb',
      width: 90,
      dw: '%'
    }
  ],
})

const cellClick = (row, column, cell, event) => {
  console.log(row, column, cell, event)
}
</script>
<style scoped>
.flex-between {
  background: red;
}
</style>