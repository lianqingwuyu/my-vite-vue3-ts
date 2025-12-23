<template>
  <div :class="[' yjs_table2','wh100']" v-loading="loading">
    <div class="title" style=" color: #68A7D3;" v-if="params_box.type == 1">
      <div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
        <!--        <span>{{ title }}</span>-->
        <qxyxqxj2-sy-tabs class="tabs" :tabs_params="tabs_params"></qxyxqxj2-sy-tabs>
        <el-select v-model="nd" class="select  select2">
          <el-option v-for="(i,ix) in ndList" :label="i" :value="i" :key="ix"></el-option>
        </el-select>
      </div>
    </div>
    <div v-else :class="['header',className]">
      {{ yjs_ldps_params.title || '领导批示' }}
    </div>
    <div class="nd" v-if="params_box.type == 2">
      <el-select v-model="nd" class="select  select2">
        <el-option v-for="(i,ix) in ndList" :label="i" :value="i" :key="ix"></el-option>
      </el-select>
    </div>
    <div class="el-tables2 scroll  scroll">
      <el-table
          :border="false"
          :data="tableData"
          ref="table"
          class="businessTable"
          :max-height="maxHeight || params_box.maxHeight "
          @expand-change="expandChange"
          style="width: 100%;">
        <el-table-column width="60" label="" prop="dx">
        </el-table-column>
        <el-table-column type="expand" width="1">
          <template #default="scope">
            <div class="t2" v-loading="scope.row.loading2">
              <el-table
                  :border="true"
                  :data="scope.row.psbmList"
                  class="businessTable "
                  style="width: 100%;">
                <el-table-column
                    v-for="(i,ix) in tableHeaderData2" :key="ix"
                    :prop="i.key"
                    :label="i.label"
                    :align="i.align?i.align:'left'"
                    :min-width="i.width"
                    :sortable="i.sortable"
                    key="slot">
                  <template #default="scope2">
                    <span v-if="i.key == 'fksj' || i.key == 'fkrmc' || i.key == 'fknr'">
                      {{ scope2.row.blqk != '已反馈' ? '' : scope2.row[i.key] }}
                    </span>
                    <span v-else>
                      {{ scope2.row[i.key] }}
                    </span>
                    {{ i.dw }}
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                  <template #default="scope2">
                    <!--   <span>{{JSON.stringify(scope2.row)}}</span> -->
                    <el-button
                        size="mini"
                        type="primary"
                        @click="eventBox.debounce(handleEdit(scope.row,scope2.row),1000)"
                        v-if="scope2.row.isOp!= 0">
                      {{ scope2.row.opType == 1 ? '接收' : '反馈' }}
                      <!--     {{scope2.row.isOp}}   {{scope2.row.blqk}} {{scope.row.isOp}}   {{scope.row.blqk}} -->
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="10%">
          <template #default="scope">
            <el-button type=primary class="blqk" @click="toogleExpand(scope)">办理情况</el-button>
          </template>
        </el-table-column>
        <el-table-column
            v-for="(i,ix) in tableHeaderData" :key="ix"
            :prop="i.key"
            :label="i.label"
            :align="i.align?i.align:'left'"
            :min-width="i.width"
            :sortable="i.sortable"
            key="slot">
          <template #default="scope">
            {{ scope.row[i.key] }} {{ i.dw }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :custom-class="params_box.type ==1 ? 'dialoglarge12':'dialoglarge12 dialoglarge122'"
               :visible.sync="showDialogBz" :width="type == 1 ?'80%':'60%'" title=""
               @before-close="showDialogBz = false" :modal-append-to-body="false" :modal="false">
      <div :style="{width:'100%',height: '470px'}">
        <div :class="[{qxjzy_table: params_box.type == 2},'box-item yjs_table yjs_table2 wh100']"
             style="position: relative;">
          <div class="title">领导批示反馈</div>
          <div class="jgbg">
            <div class="jgbg_content">
              <div class="title2" style="margin-bottom: 10px">反馈内容</div>
              <el-input type="textarea" maxlength="500" v-model="jgbg_pamars.fknr" class="textarea"
                        placeholder="控制在300字以内"
                        resize="none"
              />
            </div>
            <div class="jgbg_qfr">
              <div>
                <span>反馈人</span>
                <el-input maxlength="10" disabled v-model="jgbg_pamars.dlrmc"></el-input>
              </div>
              <div>
                <span>反馈时间</span>
                <el-input maxlength="10" disabled v-model="jgbg_pamars.fksj"></el-input>
              </div>
            </div>
            <div class="jgbg_botton">
              <div @click="init_set_ldps(1)">保存</div>
              <div @click="init_set_ldps(2)">反馈</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: 'yjs_table_1',
  computed: {
    ...mapState({
      yjs_ldps_params: state => state.app.yjs_ldps_params,
    }),
    code() {
      let user = JSON.parse(localStorage.getItem("saber-userInfo"))?.content
      return this.swjgdmls(user.swjg_dm)
    }
  },
  props: {
    className: {
      type: String,
      default: () => {
        return ''
      }
    },
    params_box: {
      type: Object,
      default: () => {
        return {
          maxHeight: 600
        }
      }
    },
    type: {
      type: String,
      default: () => {
        return '1'
      }
    },
    maxHeight: {
      type: Number,
      default: () => {
        return 0
      }
    },
  },
  watch: {
    nd: {
      handler() {
        this.pageConfig = {
          page: 1,
          pageSize: 30,
          total: 10
        }
        this.tableData = []
        this.init()
      }
    },
    tabs_params: {
      handler() {
        this.pageConfig = {
          page: 1,
          pageSize: 30,
          total: 10
        }
        this.tableData = []
        this.init()
      }, deep: true
    }
  },
  data() {
    return {
      ndList: [],
      nd: '',
      btn_show: false,
      loading: false,
      showDialogBz: false,
      jgbg_pamars: {},
      scrollTimer: null,
      showLoadMoreButton: true,  //是否显示加载更多数据
      scrollPosition: 0,  //记录滚动条位置
      tableData: [],
      tableHeaderData: [
        {label: '时间', key: 'fssj', align: 'center', width: '15%'},
        {label: '签发人', key: 'qfrmc', align: 'center', width: '15%'},
        {
          label: `承办${this.params_box.title != '工作部署' ? '部门' : '单位'}`,
          key: 'cbbm',
          align: 'center',
          width: '20%'
        },
        {
          label: `${this.params_box.title != '工作部署' ? '批示内容' : '工作批示'}`,
          key: 'psnr',
          align: 'center',
          width: '45%'
        },
      ],
      tableHeaderData2: [
        {
          label: `承办${this.params_box.title != '工作部署' ? '部门' : '单位'}`,
          key: 'psbmmc',
          align: 'center',
          width: '17%'
        },
        {label: '办理情况', key: 'blqk', align: 'center', width: '17%'},
        {label: '接收人', key: 'jsrmc', align: 'center', width: '14%'},
        {label: '反馈内容', key: 'fknr', align: 'center'},
        {label: '反馈人', key: 'fkrmc', align: 'center', width: '18%'},
        {label: '反馈时间', key: 'fksj', align: 'center', width: '20%'},
      ],
      pageConfig: {
        page: 1,
        pageSize: 30,
        total: 10
      },
      title: '领导批示',
      jgbg_pamars_index: 0,
      tabs_params: {
        list: [
          {label: '领导批示', value: 0},
          {label: '处室领导批示', value: 1},
        ],
        index: 0
      },
    }
  },
  created() {
    this.getTime()
  },
  mounted() {
    this.$nextTick(() => {
      $(`.businessTable .el-table__body-wrapper`).scroll(() => {
        this.handleScroll()
      })
    })
  },
  methods: {
    getTime() {
      let time = new Date()
      this.ndList = []
      this.nd = time.getFullYear()
      for (let i = 0; i <= this.nd - 2024; i++) {
        this.ndList.push(this.nd - i)
      }
    },
    toogleExpand(scope) {
      let $table = this.$refs.table;
      $table.toggleRowExpansion(scope.row)
      this.jgbg_pamars_index = scope.$index
    },
    //操作事件
    handleEdit(parent, row) {
      if (row.opType == 1) {
        this.$confirm('确认接收批示内容并进行办理！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.btn_show) return
          this.btn_show = true
          this.$ajax({
            method: 'POST',
            url: '/api/yjsjg/ldps/jsps',
            params: {
              id: row.id
            }
          }).then(res => {
            this.$message.success('接收成功')
            this.expandChange(parent)
            this.btn_show = false
          }).catch(error => {
            this.$message.error(error.msg)
            this.btn_show = false
          })
        }).catch(() => {

        })

      } else {
        row.psid = parent.psid
        this.jgbg_pamars_index = parent.ix - 1
        this.jgbg_pamars = JSON.parse(JSON.stringify(row))
        this.showDialogBz = true
        // let obj = {
        //   w:this.type == 1 ?'40%':'50%',
        //   h:'470px',
        //   c: this.params_box.type == 1 ? 'dialoglarge12':'dialoglarge12 dialoglarge122',
        //   componentname: 'yjs-crad-1',
        //   params:{
        //     type: this.params_box.type,
        //     jgbg_pamars:this.jgbg_pamars,
        //   }
        // }
        // this.showModel(obj)
      }
    },
    //打开子表格懒加载
    expandChange(row) {
      row.loading2 = true
      this.$ajax({
        method: 'GET',
        url: '/api/yjsjg/ldps/psbms',
        params: {
          psid: row.psid,
        }
      }).then(res => {
        let data = res.data.data;
        row.psbmList = data
        row.loading2 = false
        this.$set(this.tableData[this.jgbg_pamars_index], 'psbmList', data)
        this.$forceUpdate()
      }).catch(error => {
        //发生错误，控制台打印错误信息，并将 loading2 属性设置为 false，表示数据加载完成
        row.loading2 = false
      })
    },
    //反馈事件
    init_set_ldps(type) {
      this.jgbg_pamars.czzt = type
      this.jgbg_pamars.fkrq = this.jgbg_pamars.fksj
      if (!this.jgbg_pamars.fknr) {
        this.$message.error('反馈内容不能为空')
        return
      }
      if (type == 1) {
        this.init_fkps(type)
        return
      }
      this.$confirm('确认反馈当前内容？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.init_fkps(type)
      })

    },
    init_fkps(type) {
      if (this.btn_show) return
      this.btn_show = true
      this.$ajax({
        url: '/api/yjsjg/ldps/fkps',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: this.jgbg_pamars
      }).then(res => {
        let data = res.data
        this.showDialogBz = false
        this.$message.success(type == 1 ? '保存成功' : '反馈成功')
        this.jgbg_pamars.type = 999
        this.expandChange(this.jgbg_pamars)
        this.btn_show = false
      }).catch(error => {
        this.btn_show = false
        this.$message.error(error.msg)
      })
    },
    loadMoreData() {
      if (this.pageConfig.page > this.pageConfig.total) {
        return
      }
      //将请求类的页码的pageNum加一，以获取下一页的数据
      //加载数据到后端，以实现无限滚动效果
      this.init()
    },
    //滚动事件
    handleScroll() {

      //这是使用setTimeOut函数来延迟执行，以便在滚动表格的时候节省资源和优化性能
      //设置一个定时器scrollTimer，判断如果之前设置过定时器会清除之前的定时器，以免多次触发滚动事件
      const tableEl = $(`.businessTable .el-table__body-wrapper`)    //表格的DOM元素
      const scrollContainerHeight = tableEl.innerHeight()  //获取表格容器的高度，即当前可见区域的高度
      const scrollContentHeight = tableEl.find('.el-table__body').height()  //获取表格内容的高度，即所有行的高度
      const scrollTop = tableEl.scrollTop()  //获取表格容器滚动的距离，即当前可见区域顶部距离表格顶部的距离
      //判断是否到达底部并且当前没有正在加载更多数据，如果是，则执行方法loadMoreData()
      if (Math.ceil(scrollTop + scrollContainerHeight) >= Math.floor(scrollContentHeight) && !this.loading) {
        this.loadMoreData()
      }
      //将当前滚动位置保存到组件实例的scrollPosition中，以便下次执行定时器能够正确判断滚动事件
      this.scrollPosition = scrollTop
    },
    init() {
      this.loading = true
      this.$ajax({
        method: 'GET',
        url: '/api/yjsjg/ldpses',
        params: {
          startNum: this.pageConfig.page,
          endNum: this.pageConfig.pageSize,
          nd: this.nd,
          pslx: this.params_box.title == '工作部署' ? 'sz' : this.tabs_params.index == 0 ? '' : 'cs'
        }
      }).then(res => {
        let data = res.data.data;
        this.tableData = this.tableData.concat(data.tableData)
        this.tableData.forEach((i, ix) => {
          i['dx'] = data.total - ix
          i['ix'] = ix + 1
          i['zt'] = this.table_type == 26 ? '已发送' : (i['zt'] == 0 ? '未修改' : '已修改')
        })
        this.pageConfig.total = data.total
        this.pageConfig.page += 30
        this.pageConfig.pageSize += 30
        let arr = this.tableData.map(i => {
          return this.init_add(i.psid)
        })
        Promise.all(arr).then(res => {
          this.loading = false
        })
      }).catch(error => {
        //发生错误，控制台打印错误信息，并将 loading 属性设置为 false，表示数据加载完成
        this.loading = false
      })
    },
    init_add(psid = '') {
      return new Promise((resolve, reject) => {
        this.$ajax({
          method: 'POST',
          url: '/api/qjgc/ssx/ldps/ckjl/add',
          params: {
            psid
          }
        }).then((res) => {
          let data = res.data.data
          resolve(data)
        })
      })

    },
  }
}
</script>

<style scoped lang="scss">
.nd {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.header {
  height: 84px;
  color: #25396F;
  background: #E3EBF9;
  padding: 25px;
  border-radius: 0px 0px 0px 0px;
  font-family: MiSans, MiSans;
  font-weight: 700;
  font-size: 26px;
  text-align: left;
}

.box-title {
  color: #68A7D3 !important;
  background: transparent !important;
}

.qxjzy_table {
  background: #f2f7ff !important;

  .title {
    color: #25396F !important;
  }

  .jgbg_botton {
    div {
      background: rgba(104, 136, 252, 0.8118) !important;
      border: none !important;
      border-radius: 6px;
    }
  }

  .jgbg {
    background: none;
    color: #333;

    .jgbg_qfr {
      ::v-deep {
        input {
          color: #333;
        }
      }
    }

    .textarea {
      border: none !important;
      border-radius: 6px;

      ::v-deep {
        textarea {
          background: #fff !important;
          color: #000 !important;
        }
      }

    }

  }
}

.select2 {
  margin-right: 20px;

  ::v-deep {
    input {
      width: 100px;
      height: 30px;
      color: rgb(104, 167, 211);
    }

    .el-icon-arrow-up:before {
      color: rgb(104, 167, 211);
    }
  }
}

::v-deep {

  .el-table__expand-column {
    pointer-events: none;
  }

  .el-table__expand-icon {
    visibility: hidden;
  }
}

::v-deep .el-table .cell {
  padding: 0 5px;
  text-align: center;
  white-space: pre-line;
}

.blqk {
  width: 88px;
  height: 30px;
  line-height: 30px;
  background: #2d76a8;
  border: 0;
  padding: 0;
  text-align: center;
  border-radius: 2px;
  font-family: PingFang;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}

.t2 {
  padding: 10px 20px;
}

.box-item {
  .title {
    font-size: 28px !important;
    justify-content: center;

    &:before {
      display: none !important;
    }
  }
}

.jgbg {

  background: url("~@/assets/yjsImg/jgbg.png") no-repeat;
  background-size: 100% 100%;
  height: calc(100% - 75px);
  padding: 20px 30px;
  font-family: PingFang;
  font-weight: 400;
  font-size: 14px;
  color: #fff;


  .jgbg_content {

    .title2 {
      padding: 4px 0;
      font-size: 13px;
      letter-spacing: 2px;
      font-family: PingFang;
    }

    .textarea {
      border-radius: 2px 2px 2px 2px;
      border: 1px solid #849BDA;
      height: 205px;

      ::v-deep {
        textarea {
          color: #fff;
          height: 205px;
          background: rgba(104, 167, 211, 0.35);
          border: none;
        }
      }
    }
  }

  .jgbg_botton {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    div {
      width: 85px;
      height: 30px;
      line-height: 30px;
      background: rgba(45, 118, 168, 1);
      border: 0;
      padding: 0;
      text-align: center;
      border-radius: 2px;
      border: 1px solid #06ACFF;
      font-family: PingFang;
      font-weight: 400;
      font-size: 14px;
      color: #FFFFFF;
      cursor: pointer;

      &:last-child {
        margin-left: 30px;
      }
    }
  }

  .jgbg_qfr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 0 0;
    letter-spacing: 2px;

    font-family: PingFang;

    .el-button {
      width: 88px;
      height: 30px;
      line-height: 30px;
      background: rgba(45, 118, 168, 1);
      border: 0;
      padding: 0;
      text-align: center;
      border-radius: 2px;
      font-family: PingFang;
      font-weight: 400;
      font-size: 14px;
      color: #FFFFFF;
    }

    ::v-deep {
      div {
        display: flex;
        align-items: center;
        width: auto;
      }

      input {
        width: 85px;
        background: transparent;
        height: 30px;
        margin-left: 15px;
        border: none;
        padding: 0;
        border-radius: 0;
        border-bottom: 1px solid #43558F;
        color: #fff;
      }

    }
  }
}

::v-deep {
  .el-table td.el-table__cell div {
    color: #fff;
  }
}

.yjs_table2 {
  ::v-deep {
    .el-table tr {
      background: transparent;
    }

    .el-table::before {
      display: none;
    }

    .title {

      font-family: MiSans_Bold;
      font-weight: 800;
      font-size: 24px;
      color: #333333;
      display: flex;
      align-items: center;
      text-shadow: none;
      text-align: left;

      &::before {
        display: block;
        width: 6px;
        content: ' ';
        background: #264598;
        height: 24px;
        margin-right: 8px;
        transform: translateY(1px);
      }
    }

    tbody td {
      color: #fff;
      white-space: pre-line;
    }

    .el-table__header {
      th.el-table__cell {
        background: transparent;
        border-top: 1px solid rgb(83, 107, 172);
        border-bottom: 1px solid rgb(83, 107, 172);
        color: #68A7D3;
        font-weight: 800;
      }

    }

    .el-table::before {
      background-color: rgb(83, 107, 172);
    }
  }
}

.yjs_table {

  background: url("~@/assets/yjsImg/yjsbox.png") no-repeat;
  background-size: 100% 100%;
  padding: 15px 40px;

  ::v-deep {
    .title {
      color: #68A7D3;

      &::before {
        background: #68A7D3;
      }
    }
  }
}

.title {
  color: #fff;
  margin: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  margin-bottom: 20px;
}

.c1 {
  ::v-deep .el-table tr {
    background: transparent !important;
  }

  ::v-deep .el-table tr th {

    color: #fff;
  }

  ::v-deep .el-table__header-wrapper th {
    background: rgb(179, 203, 234) !important;
    color: rgb(179, 203, 234);
  }
}

.c2 {
  ::v-deep .el-table__header-wrapper th {
    background: rgba(69, 70, 80, 0.8) !important;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
}

.scztTable {
  ::v-deep .el-table__header-wrapper th {
    background: #003317 !important;
    color: #BFBFBF;
  }
}

.scztTable {

}

.el-tables2 {
  //height: calc(100% - 18%);
  //margin-top: 3.5%;
  ::v-deep {

    .el-table, .el-table__expanded-cell {
      background: transparent;
    }

    .el-table__body-wrapper .el-table__row {
      background: transparent;
      color: #fff;
    }

    .el-table__header-wrapper thead tr th {
      text-align: center;
      font-size: 18px;
    }
  }
}

.el-pagination {
  text-align: right;
  margin-top: 15px;
}

::v-deep .el-table__header-wrapper {
  //position: fixed;
  //width:100%;
  ////  left:0px;
  //z-index: 2000;
  //top: 23%;
}

::v-deep .el-table__body td.el-table__cell {
  font-size: 18px !important;
}

/* css  鼠标悬浮时 */
::v-deep .el-table tbody tr:hover > td {
  background-color: rgb(65, 111, 180) !important;
  color: #ffffff;
}

.scroll::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

// 滚动条的宽度
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}

// 滚动条的滑块
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
  -webkit-box-shadow: inset1px1px0rgba(0, 0, 0, .1);
}

::v-deep .ydylTable {
  padding: 20px 40px !important;
  background: #394865 !important;
}

::v-deep .dialoglarge12 {
  border-radius: 15px;
  overflow: hidden;

  .el-dialog__body {
    padding: 0 !important;
  }
}

::v-deep {
  .dialoglarge122 {
    border: 1px solid #ccc;
  }

  .tabs {
    margin-top: 0;
    .item {
      background: transparent;
      font-family: MiSans, MiSans;
      font-weight: 500 !important;
      font-size: 22px !important;
      color: #fff;
      border: none;
      width: auto;
      padding: 0;
    }

    .active {
      font-size: 24px !important;
      font-weight: 800 !important;
      color: rgb(104, 167, 211);
    }
  }
}

</style>
