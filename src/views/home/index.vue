  <template>
    <div class="box wh100">
      <PublicTabs :tabs_params="tabs_params"></PublicTabs>
      <PublicTable ref="publicTable" @cellClick="cellClick" className="table" :maxHeight="435"
                   :table_obj="table_obj"></PublicTable>
      <router-link to="/ceshi">关于我们</router-link>
      <el-button>asdsa</el-button>
      <el-button @click="open1">跳转页面</el-button>
      <el-button @click="open">打开弹窗</el-button>
    </div>
  </template>
  <script setup>
  const children = [
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
  ];
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
        children: children
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
  const route = useRoute()
  const router = useRouter()
  console.log(toRaw(route),toRaw(router))
  const cellClick = (row, column, cell, event) => {
    console.log(row, column, cell, event)
  }
  const open = () => {
    let obj = {
      w: '65%',
      h: '670px',
      c: 'yjs_dialog_table',
      params: {
        type: 1,
        maxHeight: 555,
        ...toRaw(table_obj.value)
      },
      componentname: 'YjsCard1'
    }
    showModel(obj)
  }
  const open1 = () => {
    router.push('/ceshi')
  }
  </script>
  <style scoped>
  .box {
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
