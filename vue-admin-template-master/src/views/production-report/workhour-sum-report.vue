<template>
  <div class="app-container">
    <h4 class="titleStyle">员工工时汇总报表</h4>
    <el-row>
      <el-form>
        <el-col :xs="8" :sm="8" :lg="8">
          <el-form-item :label="$t('table.month')">
            <el-date-picker
              v-model="dateStr"
              type="month"
              :clearable="false"
              :placeholder="$t('table.month')"
              value-format="yyyy-MM"
              @change="getWorkingHoursSummary"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8">
          <el-form-item label="车间">
            <el-select v-model="workshop.workshopName" @change="getworkshopList">
              <el-option
                v-for="item in workshopList"
                :key="item.id"
                :label="item.workshopName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :xs="8" :sm="8" :lg="8">
        <div class="operateBtn">
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </div>
      </el-col>
    </el-row>
    <!--<el-table
      :max-height="tableHeight"
      :data="dataList"
      id="dataTable"
      v-loading="loading"
      element-loading-text="加载中"
      :span-method="objectSpanMethod"
      style="width: 100%"
      ref="table">
      <el-table-column
        label="序号"
        fixed
        align="center"
        width="75">
        <template slot-scope="scope">
          <span>{{scope.$index!==dataList.length-1?scope.$index + 1:'合计/时'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="staffName"
        label="姓名"
        align="center"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="staffNo"
        label="工号"
        fixed
        align="center"
        width="75">
      </el-table-column>
      <el-table-column
        v-for="(item,index) in workHourList"
        :label="dateFormat(item.label)"
        align="center"
        :key="index">
        <el-table-column
          label="工作内容"
          align="center"
          width="150">
          <template slot-scope="scope" class="ttt">
            <el-table
              v-if="scope.$index!==dataList.length-1&&dataModel[scope.row.staffNo]['dateModel'][item.label]"
              :show-header="false"
              :data="dataModel[scope.row.staffNo]['dateModel'][item.label]"
              empty-text=" "
              lazy
              id="tableList2">
              <el-table-column
                label="工作内容"
                width="150"
                align="center">
                <template slot-scope="scope2">
                  <span>{{scope2.row.taskId}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="记录表号"
                width="120"
                align="center">
                <template slot-scope="scope2">
                  <span>{{scope2.row.projectId}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="定额工时"
                width="85"
                align="center">
                <template slot-scope="scope2">
                  <span>{{scope2.row.quotaTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="超产工时"
                width="85"
                align="center">
                <template slot-scope="scope2">
                  <span>{{scope2.row.beyondTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="加班工时"
                width="85"
                align="center">
                <template slot-scope="scope2">
                  <span>{{scope2.row.overTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合格"
                width="83"
                align="center">
                <template slot-scope="scope2">
                  <span>{{scope2.row.isQualified?'√':''}}</span>
                </template>
              </el-table-column>
            </el-table>
            <span v-if="scope.$index===dataList.length-1">{{item.total+''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="记录表号"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          label="定额工时"
          width="85"
          align="center">
        </el-table-column>
        <el-table-column
          label="超产工时"
          width="85"
          align="center">
        </el-table-column>
        <el-table-column
          label="加班工时"
          width="85"
          align="center">
        </el-table-column>
        <el-table-column
          label="合格"
          width="85"
          align="center">
        </el-table-column>
      </el-table-column>
    </el-table>-->
    <div class="reportTable" ref="reportTable" v-loading="loading" v-if="workshopList.length!==0">
      <table id="reportTableHead" ref="reportTableHead" cellspacing="0" cellpadding="0">
        <thead>
          <tr class="theadRow">
            <th rowspan="2" class="indexCol drag_col_head">序号</th>
            <th rowspan="2" class="nameCol drag_col_head">姓名</th>
            <th rowspan="2" class="staffNoCol drag_col_head">工号</th>
            <th colspan="7" class="dateCol" v-for="item in workHourList">{{dateFormat(item.label)}}</th>
          </tr>
          <tr class="theadRow">
            <template v-for="(item,index) in workHourList">
              <th class="taskCol">工作内容</th>
              <th class="projectCol">记录表号</th>
              <th class="quotaCol">定额工时</th>
              <th class="beyondCol">超产工时</th>
              <th class="overCol">加班工时</th>
              <th class="overCol">复机工时</th>
              <th class="qualifiedCol">合格</th>
            </template>
          </tr>
        </thead>
      </table>
      <div
        class="reportBody"
        ref="reportBody"
        :style="{'max-height':tableHeight-74+'px',width:bodyWidth+'px'}"
      >
        <table id="reportTable" cellspacing="0" cellpadding="0" v-if="dataList.length>1">
          <tbody>
            <tr v-for="(item,index) in dataList" v-if="index !== dataList.length-1">
              <td class="indexCol drag_col">{{index+1}}</td>
              <td class="nameCol drag_col">{{item.staffName}}</td>
              <td class="staffNoCol drag_col">{{item.staffNo}}</td>
              <td
                class="dateCol"
                colspan="6"
                v-for="date in workHourList"
                :style="{height:dataModel[item.staffNo]['dateModel'][date.label].length*36+'px'}"
              >
                <table id="innerTable" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr
                      class="innerRow"
                      v-for="list in dataModel[item.staffNo]['dateModel'][date.label]"
                    >
                      <td class="taskCol innerTask">{{list.taskId}}</td>
                      <td class="projectCol">{{list.projectId}}</td>
                      <td class="quotaCol">{{list.quotaTime}}</td>
                      <td class="beyondCol">{{list.beyondTime}}</td>
                      <td class="overCol">{{list.overTime}}</td>
                      <td class="overCol">{{list.duplicateTime}}</td>
                      <td class="qualifiedCol">{{list.isQualified?'√':''}}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td class="totalTitle drag_col" colspan="3">合计/时</td>
              <td class="totalDate" colspan="6" v-for="date in workHourList">{{date.total}}</td>
            </tr>
          </tbody>
        </table>
        <p class="noData" v-else :style="{width:bodyWidth+'px'}">暂无数据</p>
        <div
          v-if="showFixed&&dataList.length>1"
          class="fixedTableBox"
          :class="{'showShadow':showFixedTable}"
          ref="fixedTableBox"
        >
          <table id="reportTableHead2" cellspacing="0" cellpadding="0">
            <thead>
              <tr class="theadRow">
                <th rowspan="2" class="indexCol drag_col_head">序号</th>
                <th rowspan="2" class="nameCol drag_col_head">姓名</th>
                <th rowspan="2" class="staffNoCol drag_col_head">工号</th>
                <th colspan="7" class="dateCol">{{dateFormat(workHourList[0].label)}}</th>
              </tr>
              <tr class="theadRow">
                <th class="taskCol">工作内容</th>
                <th class="projectCol">记录表号</th>
                <th class="quotaCol">定额工时</th>
                <th class="beyondCol">超产工时</th>
                <th class="overCol">加班工时</th>
                <th class="overCol">复机工时</th>
                <th class="qualifiedCol">合格</th>
              </tr>
            </thead>
          </table>
          <table id="fixedTable" ref="fixedTable" cellspacing="0" cellpadding="0">
            <tbody>
              <tr v-for="(item,index) in dataList" v-if="index !== dataList.length-1">
                <td class="indexCol drag_col">{{index+1}}</td>
                <td class="nameCol drag_col">{{item.staffName}}</td>
                <td class="staffNoCol drag_col">{{item.staffNo}}</td>
                <td
                  class="dateCol"
                  colspan="6"
                  :style="{height:dataModel[item.staffNo]['dateModel'][workHourList[0].label].length*36+'px'}"
                >
                  <table id="innerTable2" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr
                        class="innerRow"
                        v-for="list in dataModel[item.staffNo]['dateModel'][workHourList[0].label]"
                      >
                        <td class="taskCol innerTask">{{list.taskId}}</td>
                        <td class="projectCol">{{list.projectId}}</td>
                        <td class="quotaCol">{{list.quotaTime}}</td>
                        <td class="beyondCol">{{list.beyondTime}}</td>
                        <td class="overCol">{{list.overTime}}</td>
                        <td class="overCol">{{list.duplicateTime}}</td>
                        <td class="qualifiedCol">{{list.isQualified?'√':''}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="totalTitle drag_col" colspan="3">合计/时</td>
                <td class="totalDate" colspan="6">{{workHourList[0].total}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="reportTable" v-else>
      <div class="noData">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { workingHoursSummary } from '@/api/production-report'
import { removeToken } from '@/utils/auth'
import { workshopListAll } from '@/api/workshop'
export default {
  name: 'WorkhourSumReport',
  data() {
    return {
      dateStr: '',
      dataList: [],
      dataModel: {},
      workHourList: [],
      loading: false,
      showFixedTable: false,
      showFixed: false,
      weekModel: {
        '0': '星期天',
        '1': '星期一',
        '2': '星期二',
        '3': '星期三',
        '4': '星期四',
        '5': '星期五',
        '6': '星期六'
      },
      num: 0,
      tableHeight: 0,
      bodyWidth: 0,
      workshopList: [],
      workshop: {
        workshopName: '',
        workshopId: ''
      },
      workshopId: ''
    }
  },
  created() {
    // 初始化查询月份
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    if (day >= 26) {
      month = month + 1
    }
    this.dateStr = year + '-' + (month >= 10 ? month : '0' + month)
    let h = document.documentElement.clientHeight || document.body.clientHeight
    this.tableHeight = h - 260
    this.getworkshopListAll()
  },
  beforeMount() {},
  mounted() {},
  methods: {
    // 获取车间列表
    getworkshopListAll() {
      workshopListAll().then(res => {
        this.workshopList = res.data.data
        this.workshopId = this.workshopList[0].id
        this.workshop.workshopName = this.workshopList[0].workshopName

        this.getWorkingHoursSummary()
      })
    },
    getworkshopList(id) {
      this.workshopId = id
      this.getWorkingHoursSummary()
    },
    // 导出数据
    exportExcel() {
      // this.$print({
      //   printable: 'dataTable',
      //   type: 'html',
      //   style: '@media print{@page {size:landscape}}'
      // })
      require.ensure([], () => {
        const { export_json_to_excel } = require('./Export2Excel_workhour_sum')
        // 天数
        let dayTotal = this.workHourList.length
        let colNum = this.workHourList.length * 7 + 2
        let dataModel = this.exportExcelModel
        let list = []

        // 循环每个人的上报汇总
        for (let k in dataModel) {
          let maxNum = this.reportMaxDateNum(this.exportExcelModel[k])
          for (let i = 0; i < maxNum; i++) {
            let excelCol = []
            for (let colI = 0; colI < colNum; colI++) {
              excelCol.push('')
            }
            // 循环每个人哪些日期有上报
            for (let k2 in dataModel[k]) {
              // 根据最多那天的数量添加表格列数据
              if (dataModel[k][k2][i]) {
                excelCol[0] = dataModel[k][k2][i].staffName
                excelCol[1] = dataModel[k][k2][i].staffNo
                excelCol[this.excelDateList.indexOf(k2) * 7 + 2] =
                  dataModel[k][k2][i].taskId
                excelCol[this.excelDateList.indexOf(k2) * 7 + 3] =
                  dataModel[k][k2][i].projectId
                excelCol[this.excelDateList.indexOf(k2) * 7 + 4] =
                  dataModel[k][k2][i].quotaTime
                excelCol[this.excelDateList.indexOf(k2) * 7 + 5] =
                  dataModel[k][k2][i].beyondTime
                excelCol[this.excelDateList.indexOf(k2) * 7 + 6] =
                  dataModel[k][k2][i].overTime
                excelCol[this.excelDateList.indexOf(k2) * 7 + 7] =
                  dataModel[k][k2][i].duplicateTime
                excelCol[this.excelDateList.indexOf(k2) * 7 + 8] = dataModel[k][
                  k2
                ][i].isQualified
                  ? '√'
                  : ''
              }
            }
            list.push(excelCol)
          }
        }
        let merges = []
        let mergesA = [] // 存表头需要改变样式的单元格
        let mergesB = [] // 存表头不需要合并的一组六个单元格
        let multiHeader = []
        let firstColH = []
        let secondColH = []
        let firstColNum = 3
        // 合并单元格
        for (let i = 0; i < colNum; i++) {
          if (i === 0) {
            merges.push('A1:A2')
            mergesA.push('A1:A2')
            firstColH.push('姓名')
            secondColH.push('')
            for (let key in this.exportExcelModel) {
              let spanNum = this.reportMaxDateNum(this.exportExcelModel[key])
              merges.push(
                'A' + firstColNum + ':A' + (firstColNum + spanNum - 1)
              )
              merges.push(
                'B' + firstColNum + ':B' + (firstColNum + spanNum - 1)
              )
              firstColNum = firstColNum + spanNum
            }
          } else if (i === 1) {
            merges.push('B1:B2')
            mergesA.push('B1:B2')
            firstColH.push('工号')
            secondColH.push('')
          } else if (i % 7 === 2) {
            let s = this.createCellPos(i)
            let e = this.createCellPos(i + 6)
            merges.push(s + '1:' + e + '1')
            mergesA.push(s + '1:' + e + '1')
            firstColH.push(
              this.dateFormat(this.workHourList[parseInt(i / 7)].label)
            )
            secondColH[i] = '工作内容'
            secondColH[i + 1] = '记录表号'
            secondColH[i + 2] = '定额工时'
            secondColH[i + 3] = '超产工时'
            secondColH[i + 4] = '加班工时'
            secondColH[i + 5] = '复机工时'
            secondColH[i + 6] = '合格'
            for (let j = 0; j < 7; j++) {
              let group = this.createCellPos(i + j)
              mergesB.push(group + '2')
            }
          } else {
            firstColH.push('')
          }
        }
        multiHeader.push(firstColH)
        multiHeader.push(secondColH)
        export_json_to_excel({
          multiHeader: multiHeader,
          data: list,
          filename:
            '员工' +
            parseInt(this.dateStr.substring(0, 5)) +
            '年' +
            parseInt(this.dateStr.substring(5)) +
            '月工时报表',
          autoWidth: true,
          bookType: 'xlsx',
          merges: merges,
          mergesA: mergesA,
          mergesB: mergesB,
          dayTotal: dayTotal
        })
      })
    },
    // 查找填报人报工最多的一天的数量
    reportMaxDateNum(model) {
      let maxNum = 0
      for (let k in model) {
        maxNum = maxNum > model[k].length ? maxNum : model[k].length
      }
      return maxNum
    },
    // 将数字转换成excel的字母列
    createCellPos(n) {
      let ordA = 'A'.charCodeAt(0)
      let ordZ = 'Z'.charCodeAt(0)
      let len = ordZ - ordA + 1
      let s = ''
      while (n >= 0) {
        s = String.fromCharCode((n % len) + ordA) + s
        n = Math.floor(n / len) - 1
      }
      return s
    },
    // 格式化时间
    dateFormat(date) {
      let dateStr = date
      let month = parseInt(dateStr.substring(5, 7))
      let day = parseInt(dateStr.substring(8))
      let newDate = new Date()
      newDate.setMonth(month - 1)
      newDate.setDate(day)
      return (
        month +
        '月' +
        day +
        '日' +
        '    ' +
        this.weekModel['' + newDate.getDay()]
      )
    },
    // 监听滚动
    listenerScroll() {
      let that = this
      let tableCont = this.$refs.reportTable
      let reportBody = this.$refs.reportBody
      function scrollHandle(event) {
        let scrollLeft = event.target.scrollLeft
        that.showFixedTable = scrollLeft > 10
        event.target.querySelector('.fixedTableBox').style.transform =
          'translateX(' + scrollLeft + 'px)'
      }
      function scrollHandle2(event) {
        let scrollTop = event.target.scrollTop
        event.target.querySelector('#fixedTable').style.transform =
          'translateY(' + -scrollTop + 'px)'
      }
      tableCont.addEventListener('scroll', scrollHandle)
      reportBody.addEventListener('scroll', scrollHandle2)
    },
    // 获取统计报表
    getWorkingHoursSummary() {
      let that = this
      that.loading = true
      that.showFixed = false
      let listQuery = {
        dateStr: that.dateStr,
        workshopId: that.workshopId
      }

      workingHoursSummary(listQuery).then(res => {
        let { code, data, msg } = res.data
        if (code === 200) {
          let sumList = data.sumList
          let sumKeys = Object.keys(sumList)
          let list = []
          sumKeys.forEach(item => {
            let model = {
              label: item,
              total: sumList[item]
            }
            list.push(model)
          })
          that.excelDateList = Object.keys(data.sumList)
          that.workHourList = list
          let newData = that.setDataFormat(data.workHoursDTOList)
          that.exportExcelModel = that.exportExcelDataFormat(
            data.workHoursDTOList
          )
          that.dataList = newData[0]
          that.dataModel = newData[1]
          that.loading = false
          that.$nextTick(() => {
            that.$refs.reportTable.scrollLeft = 0
            that.showFixed = true
            that.bodyWidth = that.$refs.reportTableHead.offsetWidth
            that.listenerScroll()
          })
        } else if (code === 403) {
          removeToken() // 移除 token
          // 跳到登录页
          this.$message.error(msg)
          setTimeout(() => {
            window.location.href = '/login'
          }, 1000)
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 设置合并单元格数量
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === this.dataList.length - 1) {
        if (columnIndex < 3) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 3
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        } else if (columnIndex % 6 === 3) {
          return {
            rowspan: 1,
            colspan: 6
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else {
        if (columnIndex < 3) {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else if (columnIndex % 6 === 3) {
          return {
            rowspan: 1,
            colspan: 6
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 数据格式化
    setDataFormat(dataList) {
      let showList = []
      let dataModel = {}
      dataList.forEach(item => {
        let listModel = {}
        // 将数据push到对应的日期下面
        if (!dataModel[item.staffNo] || dataModel[item.staffNo] === undefined) {
          dataModel[item.staffNo] = {}
          dataModel[item.staffNo]['staffName'] = item.staffName
          dataModel[item.staffNo]['staffNo'] = item.staffNo
          dataModel[item.staffNo]['dateModel'] = {}
          dataModel[item.staffNo]['dateModel'][item.reportDate] = []
          dataModel[item.staffNo]['dateModel'][item.reportDate].push(item)
          listModel['staffName'] = item.staffName
          listModel['staffNo'] = item.staffNo
          showList.push(listModel)
        } else {
          if (
            !dataModel[item.staffNo]['dateModel'][item.reportDate] ||
            dataModel[item.staffNo]['dateModel'][item.reportDate] === undefined
          ) {
            dataModel[item.staffNo]['dateModel'][item.reportDate] = []
          }
          dataModel[item.staffNo]['dateModel'][item.reportDate].push(item)
        }
      })

      for (let keyN in dataModel) {
        // 给没有数据的日期添加空数据
        this.workHourList.forEach(date => {
          if (
            !dataModel[keyN]['dateModel'][date.label] ||
            dataModel[keyN]['dateModel'][date.label] === undefined
          ) {
            dataModel[keyN]['dateModel'][date.label] = []
          }
        })
        // 取得用户某一天上报最多的个数
        let maxNum = 0
        let keyList = Object.keys(dataModel[keyN]['dateModel'])
        keyList.forEach(k => {
          maxNum =
            maxNum > dataModel[keyN]['dateModel'][k].length
              ? maxNum
              : dataModel[keyN]['dateModel'][k].length
        })
        // 给数据补齐最多数量
        for (let k in dataModel[keyN]['dateModel']) {
          let surplus = maxNum - dataModel[keyN]['dateModel'][k].length
          for (let i = 0; i < surplus; i++) {
            dataModel[keyN]['dateModel'][k].push({
              taskId: '',
              projectId: '',
              quotaTime: '',
              beyondTime: '',
              overTime: '',
              duplicateTime: '',
              isQualified: null
            })
          }
        }
      }

      showList.push({})
      return [showList, dataModel]
    },
    // 格式化导出excel表格数据
    exportExcelDataFormat(dataList) {
      // let showList = []
      let model = {}
      dataList.forEach(item => {
        if (!model[item.staffName] || model[item.staffName] === undefined) {
          model[item.staffName] = {}
          model[item.staffName][item.reportDate] = []
        } else if (
          model[item.staffName] &&
          (!model[item.staffName][item.reportDate] ||
            model[item.staffName][item.reportDate] === undefined)
        ) {
          model[item.staffName][item.reportDate] = []
        }
        model[item.staffName][item.reportDate].push(item)
      })
      // for (let key in model) {
      //   for (let i = 0; i<model[key].length; i++) {
      //     showList.push(model[key][i])
      //   }
      // }
      return model
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0;
}
.titleStyle {
  padding-top: 5px;
  padding-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}
.operateBtn {
  text-align: right;
}
</style>
<style>
/*#dataTable{*/
/*  max-height: calc(100vh - 260px);*/
/*  overflow-y: scroll;*/
/*}*/
#dataTable tbody td {
  padding: 0;
  vertical-align: top;
}
#dataTable .cell {
  padding: 0;
}
#dataTable .el-table__fixed td {
  vertical-align: middle;
}
#dataTable tbody tr:nth-last-child(1) .cell {
  line-height: 50px;
}
#tableList2,
#tableList3 {
  position: relative;
  top: 0;
  /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
  -ms-overflow-style: none;
  /*火狐下隐藏滚动条*/
  overflow: -moz-scrollbars-none;
}
#tableList2::-webkit-scrollbar,
#tableList3::-webkit-scrollbar {
  display: none;
}
#tableList2 tbody > tr > td:nth-last-child(1),
#tableList3 tbody > tr > td:nth-last-child(1) {
  border-right: none;
}
#tableList2 tbody > tr:nth-last-child(1) > td,
#tableList3 tbody > tr:nth-last-child(1) > td {
  border-bottom: none;
}
#tableList2.showBorderBttom tbody > tr:nth-last-child(1) > td {
  border-bottom: 1px solid #dfe6ec;
}
#tableList2 td > .cell,
#tableList3 td > .cell {
  line-height: 36px !important;
  height: 36px;
}
#tableList3 tr:nth-last-child(1) {
  height: 37px !important;
}
.reportTable {
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  position: relative;
  margin-top: 24px;
}
.reportBody {
  width: auto;
  overflow-y: auto;
}
.reportBody::-webkit-scrollbar {
  display: none;
}
.noData {
  text-align: center;
}
#reportTable,
#innerTable,
#reportTableHead,
#reportTableHead2,
#fixedTable {
  border-collapse: collapse;
  table-layout: fixed;
}
.theadRow {
  background-color: #fafafa;
}
.reportTable th {
  font-weight: 500;
  color: #333;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  padding: 0 8px;
}
#reportTable > tbody > tr:nth-of-type(1) > td,
#fixedTable > tbody > tr:nth-of-type(1) > td {
  border-top: none;
}
#reportTable td,
#fixedTable td {
  border: 1px solid #e5e5e5;
  padding: 0;
  text-align: center;
  font-size: 14px;
  color: #333;
}
#innerTable td,
#innerTable2 td {
  text-align: center;
  height: 36px;
  line-height: 36px;
  padding: 0 8px;
  color: #333;
  font-size: 14px;
}
#innerTable tr > td:nth-of-type(1),
#innerTable2 tr > td:nth-of-type(1) {
  border-left: none;
}
#innerTable tr:nth-of-type(1) > td,
#innerTable2 tr:nth-of-type(1) > td {
  border-top: none;
}
#innerTable tr > td:nth-last-child(1),
#innerTable2 tr > td:nth-last-child(1) {
  border-right: none;
}
#innerTable tr:nth-last-child(1) > td,
#innerTable2 tr:nth-last-child(1) > td {
  border-bottom: none;
}
.indexCol,
.nameCol,
.staffNoCol {
  min-width: 100px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dateCol,
.quotaCol,
.beyondCol,
.overCol,
.qualifiedCol {
  min-width: 100px;
  height: 36px;
  line-height: 36px;
}
.taskCol,
.projectCol {
  min-width: 180px;
  height: 36px;
  line-height: 36px;
}
#innerTable .innerTask,
#innerTable2 .innerTask {
  min-width: 179px;
}
.innerRow {
  height: 37px;
}
.totalTitle,
.totalDate {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.noData {
  text-align: center;
  color: #999;
  font-size: 14px;
}
.fixedTableBox {
  width: 301px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
}
.showShadow {
  box-shadow: 10px 0 15px -10px #999;
}
#reportTableHead2 {
  position: relative;
  z-index: 100;
}
</style>
