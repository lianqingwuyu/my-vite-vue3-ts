<template>
  <div class="flexColumn flex-j-a-c ">
    <div class="title">{{ table_obj_deep.title }}</div>
    <el-table
        ref="table"
        :data="table_obj_deep.tableData"
        :class="[className,'']"
        :max-height="maxHeight"
        style="width: 100%;"
        @row-click="rowClick"
        @cell-click="cellClick"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :row-key="table_obj_deep['row-key']"
        :cell-class-name="table_obj_deep.cellClassName">
      <el-table-column
          v-for="(i,ix) in table_obj_deep.tableHeaderData"
          :sort-method="i.sortMethod"
          :key="ix"
          :prop="i.key"
          :label="i.label"
          :fixed="i.fixed"
          :show-overflow-tooltip="table_obj_deep.tooltip"
          :align="i.align"
          :sortable="table_obj_deep.sortable == 'element' && i.sortable"
          :width="i.width">
        <template #header="scope">
          <div class="flex-j-a-c" v-if="table_obj_deep.sortable != 'element' && i.sortable">
            <div>{{ scope.column.label }}</div>
            <div class="px  pl-10px pr-10px">
              <div :class="[{sort_active_top:i.sortable_key == 'ascending'},'px-top pointer']"
                   @click="sortChange(i,'ascending',1)"></div>
              <div :class="[{sort_active_bottom:i.sortable_key == `descending`},'px-bottom pointer']"
                   @click="sortChange(i,'descending',2)"></div>
            </div>
          </div>
          <div v-else-if="i.selectflag">
            <el-popover
                placement="bottom"
                ref="popover"
                trigger="click"
            >
              <div class="showPop" slot="reference"><span v-html="scope.column.label"></span> <i
                  class="el-icon-arrow-down"></i></div>
              <div class="list_pop">
                <div class="showPop" :class="selectValue === i.value?'curPop':''" @click="selectChange(i.value)"
                     v-for="(i,index) in i.list" :key="index">{{ i.label }}
                </div>
              </div>
            </el-popover>
          </div>
          <div v-else-if="i.childrenShow !=null" @click="setTable_children(i)" class="pointer">
            <div>{{ scope.column.label }} <i
                :class="[ i.childrenShow == 1? 'childrenShowRight':'childrenShowLeft','el-icon-caret-right ']"></i>
            </div>
          </div>
          <template v-else>
            <span v-html="scope.column.label"></span>
          </template>
        </template>
        <template v-if="!i.children || i.children.length === 0" #default="scope">
          <span v-if="i.render">{{ i.render(scope.row, scope.$index) }}</span>
          <el-tooltip popper-class="custom-tooltip" effect="dark" :enterable="false" placement="top-start"
                      v-else-if="i.cc"
                      :content="scope.row[i.ccname || 'nsrmc']" :disabled="i.tooltip">
            <div @click="i.clickcc?toyhs(scope.row):''" v-html="i.cc(scope.row,scope.$index)"></div>
          </el-tooltip>
          <slot v-else-if="i.type === 'custom'" :name="i.key" :row="{data:scope.row,column:i}"></slot>
          <span v-else-if="i.type === 'html'" v-html="scope.row[i.key]"></span>
          <span v-else-if="scope.row[i.key] == 0 || (scope.row[i.key] && scope.row[i.key]!='--')"
                :class="{'underline':i.underline && scope.row['ydmc']!='合计'}">{{
              scope.row[i.key]
            }}{{ i.dw }}</span>
          <span v-else> {{ table_obj_deep.mrsz }}</span>
        </template>
        <el-table-column v-for="(j,jx) in i.children" :key="jx" :prop="j.key" :label="j.label" :align="j.align"
                         :width="j.width">
          <template #header="scope">
            <div class="flex-j-a-c" v-if="table_obj_deep.sortable != 'element' && j.sortable">
              <div>{{ scope.column.label }}</div>
              <div class="px pl-10px pr-10px">
                <div :class="[{sort_active_top:j.sortable_key == 'ascending'},'px-top pointer']"
                     @click="sortChange(j,'ascending',1)"></div>
                <div :class="[{sort_active_bottom:j.sortable_key == `descending`},'px-bottom pointer']"
                     @click="sortChange(j,'descending',2)"></div>
              </div>
            </div>
            <div v-else-if="j.selectflag">
              <el-popover
                  placement="bottom"
                  ref="popover"
                  trigger="click"
              >
                <div class="showPop" slot="reference"><span v-html="scope.column.label"></span> <i
                    class="el-icon-arrow-down"></i></div>
                <div class="list_pop">
                  <div class="showPop" :class="selectValue === j.value?'curPop':''" @click="selectChange(j.value)"
                       v-for="(i,index) in j.list" :key="index">{{ j.label }}
                  </div>
                </div>
              </el-popover>
            </div>
            <div v-else-if="j.childrenShow !=null" @click="setTable_children(j)" class="pointer">
              <div>{{ scope.column.label }} <i
                  :class="[ j.childrenShow == 1? 'childrenShowRight':'childrenShowLeft','el-icon-caret-right ']"></i>
              </div>
            </div>
            <template v-else>
              <span v-html="scope.column.label"></span>
            </template>
          </template>
          <template #default="scope">
            <span v-if="j.render">{{ j.render(scope.row, scope.$index) }}</span>
            <el-tooltip popper-class="custom-tooltip" effect="dark" :enterable="false" placement="top-start"
                        v-else-if="j.cc"
                        :content="scope.row[j.ccname || 'nsrmc']" :disabled="j.tooltip">
              <div @click="j.clickcc?toyhs(scope.row):''" v-html="j.cc(scope.row,scope.$index)"></div>
            </el-tooltip>
            <slot v-else-if="j.type === 'custom'" :name="j.key" :row="{data:scope.row,column:i}"></slot>
            <span v-else-if="j.type === 'html'" v-html="scope.row[j.key]"></span>
            <span v-else-if="scope.row[j.key] == 0 || (scope.row[j.key] && scope.row[j.key]!='--')"
                  :class="{'underline':j.underline && scope.row['ydmc']!='合计'}">{{
                scope.row[j.key]
              }}{{ j.dw }}</span>
            <span v-else> {{ table_obj_deep.mrsz }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" :width="table_obj_deep.cz.width||80" v-if="table_obj_deep.cz" align="center">
        <template slot-scope="scope">
          <div :class="[table_obj_deep.cz.class,'btn-box']">
            <div v-for="i in table_obj_deep.cz.data"
                 v-if="!table_obj_deep.cz.visible || table_obj_deep.cz.visible(scope.row, i)"
                 :class="[i.class,'btn pointer']"
                 @click="table_obj_deep.cz.click(scope,i)">
              {{ i.label }}
            </div>
          </div>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <div class="table_fy">
      <el-pagination
          v-if="table_obj_deep.fy"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="table_obj_deep.fy.page || 1"
          :page-sizes="table_obj_deep.fy.pageSizeList ||[10, 20, 50, 100]"
          :page-size="table_obj_deep.fy.pageSizeList[table_obj_deep.fy.pageIndex] || 10"
          background
          :layout="table_obj_deep.fy.layout || 'sizes, prev, pager, next'"
          :total="table_obj_deep.fy.total||0">
      </el-pagination>
    </div>
  </div>
</template>
<script setup>

const {table_obj, maxHeight, className} = defineProps({
  table_obj: {
    type: Object,
    default: () => {
      return {
        tableData: [],
        tableHeaderData: [],
        loading: false,
        fy: {},
      }
    }
  },
  maxHeight: {
    type: [Number, String],
    default: 0
  },
  className: {
    type: String,
    default: ''
  },
  tabs_params: {
    type: Object,
    default: () => {
      return {}
    }
  },
})
const table_obj_deep = ref(deepCopy(table_obj))
const params = reactive({})
const selectValue = ref('')
const popover = ref(null)
const emit = defineEmits(['selectChange', 'pageSize', 'rowClick', 'cellClick'])
const toyhs = (row) => {
  // console.log(row)
  let obj = {
    w: '1700px',
    h: '864px',
    c: 'qxyxqxj2-yhs',

    params: {
      class: 'yhs',
      type: 2,
      djxh: row.djxh,
      input_value: row.nsrmc
    },
    componentname: 'qjgc-kp-dialog8'
  }
  showModel(obj)
}
const setTable_children = (i) => {
  i.childrenShow = i.childrenShow == 1 ? 2 : 1
  var arr = null
  arr = i.children
  i.children = i.children2
  i.children2 = arr
}
const selectChange = (i) => {
  selectValue.value = i
  if (popover.value && popover.value[0]) {
    popover.value[0].doClose && popover.value[0].doClose()
  }
  emit('selectChange', i)
}
const rowClick = (row, column, event) => {
  emit('rowClick', row, column, event)
}
const cellClick = (row, column, event) => {
  emit('cellClick', row, column, event)
}
const handleCurrentChange = (val) => {

  emit('pageSize', 0, val)
}
const handleSizeChange = (val) => {
  emit('pageSize', 1, val)
  table_obj_deep.value.fy.page = 1
  table_obj_deep.value.fy.pageIndex = table_obj_deep.value.fy.pageSizeList.indexOf(val)
}
//排序监听
const sortChange = (i, key, type) => {
  table_obj_deep.value.tableHeaderData.map(item => {
    if (i.key != item.key) {
      item.sortable_key = ''
    }
  })
  i.sortable_key = i.sortable_key == key ? '' : key
  params.pxlx = !i.sortable_key ? '' : i.sortable_key == 'ascending' ? `1` : `2`
  emit('sortChange', params)
}


</script>


<style lang="scss">

::v-deep(.el-pagination__total) {
  display: none !important;
}

.wh {
  width: 12px;
  height: 12px;
  margin-left: 5px;
  cursor: pointer;
}

.childrenShowLeft {
  transform: rotate(-180deg);
  color: #fff;
}

/* css  鼠标悬浮时 */
::v-deep(.el-table tbody tr:hover > td) {
  background-color: transparent;

}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

// 滚动条的宽度
.el-table__body-wrapper::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}

// 滚动条的滑块
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
  -webkit-box-shadow: inset1px1px0rgba(0, 0, 0, .1);
}

.el-table__fixed {
  &:before {
    display: none;
  }
}

.el-table__body-wrapper {
  cursor: pointer;
  z-index: 100;
}

/* 横向滚动条整体样式 */
.el-table__body-wrapper::-webkit-scrollbar:horizontal {
  height: 8px;
}

/* 滚动条轨道 */
.el-table__body-wrapper::-webkit-scrollbar-track:horizontal {
  background: transparent;
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

/* 滚动条滑块 */
.el-table__body-wrapper::-webkit-scrollbar-thumb:horizontal {
  background: rgb(197, 197, 197);
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

/* 滚动条滑块悬停状态 */
.el-table__body-wrapper::-webkit-scrollbar-thumb:horizontal:hover {
  background: linear-gradient(90deg, #337ecc, #409eff);
}

::v-deep(.el-tooltip__popper ) { // 新增自定义 tooltip 样式
  line-height: 30px !important; // 设置行高
  max-width: 400px; // 可选：限制最大宽度
  padding: 8px 12px !important; // 调整内边距
}

.table_fy {
  display: flex;
  margin-top: 10px;
  width: 100%;
  justify-content: flex-end;
}

.btn-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  .btn {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.px {
  margin-left: 5px;

  .px-top {
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: 4px solid #ccc;
  }

  .px-bottom {
    width: 0;
    height: 0;
    margin-top: 5px;
    border-top: 4px solid #ccc;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }

  .sort_active_top {
    border-bottom: 4px solid #409eff !important;
  }

  .sort_active_bottom {
    border-top: 4px solid #409eff !important;
  }
}

::v-deep {

  .green {
    color: rgba(29, 180, 64, 1);
  }

  .red {
    color: rgba(235, 31, 31, 1);
  }

  ::-webkit-scrollbar {
    width: 6px; /* 对于垂直滚动条，设置宽度 */
    height: 6px !important; /* 对于水平滚动条，设置高度 */
    background-color: transparent; /* 滚动条背景色 */
  }

  /* 滚动条轨道 */
  ::-webkit-scrollbar-track {
    background: transparent; /* 轨道背景色 */
  }

  /* 滚动条的滑块 */
  ::-webkit-scrollbar-thumb {
    background-color: rgb(197, 197, 197); /* 滑块背景色 */
  }

  /* 滑块hover效果 */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a1a1a1; /* 滑块hover背景色 */
  }

  :before {
    display: none !important;
  }

}

.showPop {
  cursor: pointer;
}

.list_pop {
  text-align: center;

  .showPop {
    cursor: pointer;
    font-size: 14px;
    color: #333;
    padding: 5px 0;

    &:hover {
      background-color: #f2f2f2;
    }
  }

  .curPop {
    color: #409eff;
    background-color: #f2f2f2;
  }
}

.underline {
  text-decoration: underline;
  text-underline-offset: 5px;
  cursor: pointer;
}
</style>
