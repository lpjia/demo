<template>
  <div class="app-container">
    <h4 class="titleStyle">员工工时统计报表</h4>
    <el-row>
      <el-col :xs="8" :sm="8" :lg="8">
        <div class="operateBtn">
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table max-height="620" :data="tableDataList" class="dataTable" v-loading="loading" :span-method="mergeCell"
      style="width: 100%" ref="table">
      <el-table-column label="序号" fixed align="center" width="75">
        <template slot-scope="scope">
          <span>{{ firstColDisplay(scope.$index) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="staffName" label="姓名" align="center" fixed="left" width="75"></el-table-column>
      <el-table-column prop="staffNo" label="工号" fixed align="center" width="75"
        :show-overflow-tooltip="true"></el-table-column>

      <el-table-column v-for="dayItem in canlendarList" :prop="dayItem.date" :key="dayItem.date"
        :label="dealDate(dayItem.date)" align="center" width="75" :class-name="holidayStyle(dayItem)">
        <el-table-column :label="weekModel[dayItem.dayInWeek]" align="center" width="75"
          :class-name="holidayStyle(dayItem)">
          <template slot-scope="scope">
            <span>{{ scope.row[dayItem.date]}}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <!-- 带有斜线 -->
      <!-- <el-table-column label="合计(分钟)" align="center">
        <template slot-scope="scope">
          <div class="double-diagonal-cell" v-if="scope.$index === tableDataList.length - 1"></div>
          <span v-else>{{ scope.row.actualTimeStatistics }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合计(小时)" align="center">
        <template slot-scope="scope">
          <div class="double-diagonal-cell" v-if="scope.$index === tableDataList.length - 2"></div>
          <span v-else>{{ cellWithHourUnit(scope) }}</span>
        </template>
      </el-table-column> -->

      <!-- 直接给prop的值, 组装好row数据 -->
      <el-table-column label="合计(分钟)" align="center" prop="actualTimeStatistics"></el-table-column>
      <el-table-column label="合计(小时)" align="center" prop="actualTimeStatisticsForHour"></el-table-column>

      <!-- <el-table-column label="合计(分钟)" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.actualTimeStatistics }}</span>
        </template>
      </el-table-column>
      <!~~ 直接给prop的值, 组装好row数据 ~~>
      <el-table-column label="合计(小时)" align="center">
        <template slot-scope="scope">
          <span>{{ cellWithHourUnit(scope) }}</span>
        </template>
      </el-table-column>-->

      <el-table-column label="工时结构(小时)" align="center">
        <el-table-column label="工作日" align="center">
          <template slot-scope="scope">
            <span>{{ lastRowDisplayHour(scope, 'quotaTimeStatistics') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作日加班" align="center">
          <template slot-scope="scope">
            <span>{{ lastRowDisplayHour(scope, 'overTimeStatistics') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="双休" align="center">
          <template slot-scope="scope">
            <span>{{ lastRowDisplayHour(scope, 'restDayOverTimeStatistics') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="节日" align="center">
          <template slot-scope="scope">
            <span>{{ lastRowDisplayHour(scope, 'holidayTimeStatistics') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="超产" align="center">
          <template slot-scope="scope">
            <span>{{ lastRowDisplayHour(scope, 'beyondTimeStatistics') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="复机" align="center">
          <template slot-scope="scope">
            <span>{{ lastRowDisplayHour(scope, 'duplicateTimeStatistics') }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { workingHoursStat } from '@/api/production-report'
import { workhour_stat_list } from '../data/index_duo.js'
import { $toFixed, cloneDeep } from '@/utils/commonMethod.js'
import { numToExcelCol } from '@/utils/excelUtil.js'

export default {
  name: 'Table1',
  components: {
  },
  props: {
  },
  data() {
    return {
      dateStr: '', // 查询月份, YYYY-MM
      monthDays: [], // 几号list canlendarList日历列表
      canlendarList: [],
      tableDataList: [], // 表格数据
      loading: false,
      weekModel: { // 日期对应周几换算
        '7': '日',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六'
      },
    };
  },
  computed: {
    holidayStyle() {
      return (dayItem) => {
        return dayItem.holiday || dayItem.restDay ? 'holiday' : ''
      }
    },
    // 日期格式
    dealDate() {
      return (date) => {
        let day = date.substr(8, 2)
        return (day[0] === '0' ? day[1] : day) + '号'
      }
    },
    // 四舍五入
    toFixed() {
      return (min) => {
        let hour = min / 60
        return $toFixed(hour, (parseInt(hour) === hour ? 0 : 2))
      }
    },
    // 工时结构最后一行显示
    lastRowDisplayHour() {
      return (scope, k) => {
        const length = this.tableDataList.length
        if (scope.$index === length - 2) {
          return 'N/A'
        }
        else if (scope.$index === length - 1) {
          return this.toFixed(this.tableDataList[length - 2][k])
        }
        else {
          return this.toFixed(scope.row[k])
        }
      }
    },
    // // 带小时单位的单元格
    // cellWithHourUnit() { // span
    //   return (scope) => {
    //     /* 合并2行2列 */
    //     /* return this.toFixed(scope.row.actualTimeStatistics)
    //       + ((scope.$index === this.tableDataList.length - 2) ? '小时' : '') */

    //     /* 显示 N/A */
    //     return (scope.$index === this.tableDataList.length - 2) ? 'N/A' : this.toFixed(scope.row.actualTimeStatistics)
    //   }
    // },
    // 底部显示合计
    firstColDisplay() { // rowDisp
      return ($idx) => {
        if ($idx === this.tableDataList.length - 1) { // 最后一行
          return '合计(小时)'
        }
        else if ($idx === this.tableDataList.length - 2) { // 倒数第二行
          return '合计(分钟)'
        }
        else if ($idx < this.tableDataList.length - 2) { // 其他行显示序号
          return $idx + 1
        }
      }
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.getWorkingHoursSummary()
  },
  methods: {
    // 获取统计报表
    getWorkingHoursSummary() {
      let listQuery = {
        dateStr: this.dateStr,
        workshopId: this.workshopId
      }
      workingHoursStat(listQuery).then(res => {
        let { code, data, msg } = workhour_stat_list
        if (code === 200) {
          this.monthDays = cloneDeep(data.canlendarList) // 日历数据
          let hangData = cloneDeep(data.staffWorkHoursDTOList) // 员工行数据
          let sourceData = []

          // 无数据
          if (!hangData.length) {
            this.tableDataList = sourceData
            return false;
          }

          hangData.forEach((hang, index) => {
            // 每行的数据
            let staffName, staffNo
            let rowData = cloneDeep(hang.workHoursDTOList) // 每一行的数据
            // 每行数据对象
            let rowObj = {}
            for (let day of this.monthDays) {
              // 遍历月份的所有天数
              for (let row of rowData) {
                // 循环已有的数据
                staffName = row.staffName
                staffNo = row.staffNo
                if (day.date === row.reportDate) {
                  // 对应某月的day, 命中数据的赋值
                  day.actualTime = row.actualTime
                  day.reportDate = row.reportDate
                  continue;
                }
              }
              // 没某天的数据赋值0
              if (!day.reportDate) {
                day.actualTime = 0
              }
              // 赋值相应的date的值
              rowObj[day.date] = day.actualTime
            }

            // 给其他字段值
            rowObj['staffName'] = staffName
            rowObj['staffNo'] = staffNo
            rowObj['actualTimeStatisticsForHour'] = parseInt(this.toFixed(hang.workHoursStatisticsDTO.actualTimeStatistics))
            if (index === hangData.length - 1) {
              rowObj['actualTimeStatisticsForHour'] = 'N/A'
            }
            Object.assign(rowObj, hang.workHoursStatisticsDTO) // 组装要显示到表格的数据字段
            sourceData.push(rowObj)

            // 清掉多余字段
            for (let day of this.monthDays) {
              delete day['actualTime']
              delete day['reportDate']
            }
          })

          // 组装最后一行数据 合计
          let lastData = sourceData[sourceData.length - 1]
          let cols = Object.keys(lastData)
          let totalRow = {}
          for (let col of cols) {
            let val = parseInt(this.toFixed(lastData[col]))
            if (typeof lastData[col] === 'number') {
              if (col === 'actualTimeStatistics') {
                totalRow['actualTimeStatisticsForHour'] = val
                totalRow[col] = 'N/A'
                continue;
              }
              if (col === 'actualTimeStatisticsForHour') {
                continue;
              }
              totalRow[col] = val
            }
            else {
              totalRow[col] = ''
            }
          }
          sourceData.push(totalRow)

          // 按日历的列
          this.canlendarList = this.monthDays
          this.tableDataList = sourceData
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
    // 合并单元格
    mergeCell({ row, column, rowIndex, columnIndex }) {
      let daysLength = this.canlendarList.length
      if (rowIndex === this.tableDataList.length - 2) { // 合计(分钟)
        if (columnIndex === 0) {
          /* 合并3列, 合并1行
          return [1, 3] 其实就是 [rowspan, colspan]
          完全不渲染单元格：返回 { rowspan: 0, colspan: 0 }（仅用于被合并的单元格） */
          return {
            rowspan: 1,
            colspan: 3,
          }
        }
        else if (columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        }
      }
      if (rowIndex === this.tableDataList.length - 1) { // 合计(小时)
        if (columnIndex === 0) {
          return [1, 3]
        }
        else if (columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        }
      }
    },
    // 导出数据
    exportExcel() {
      import('../1_one/Export2Excel_workhour_stat').then(({ export_json_to_excel }) => {
        let sourceData = this.tableDataList
        const length = sourceData.length
        if (!length) {
          this.$message.error('没有数据可导出!')
          return;
        }
        // 原始表头数据
        let sourceHeaderData = this.canlendarList
        let mergesB = [] /// 节假日的列, excelCol
        sourceHeaderData.forEach((item, index) => {
          if (item.holiday || item.restDay) {
            mergesB.push(`${numToExcelCol(index + 2)}`)
          }
        })

        // 天数
        let dayTotal = sourceHeaderData.length
        // 总列数
        let colTotal = dayTotal + 10 // dayTotal + 2 + 2 + 6

        // 合并单元格
        let merges = [] // 表头+body, 需要合并的单元格编号
        let mergesA = [] // 表头, 需要合并的单元格编号
        let multiHeader = [] // 复杂表头, 单元格的值
        let firstColH = [] // 第一行表头, 单元格的值
        let secondColH = [] // 第二行表头, 单元格的值

        const keys = [
          "countHours",
          "quotaTimeStatistics",
          "overTimeStatistics",
          "restDayOverTimeStatistics",
          "holidayTimeStatistics",
          "beyondTimeStatistics",
          "duplicateTimeStatistics"
        ]
        let list = [] // 表格渲染后, 看到的数据, 是个二维数组, 每个子数组都是一行数据
        let cols = this.getCols(sourceData[0], keys, dayTotal)

        for (let i = 0; i < length; i++) {
          let childArr = []
          for (let col of cols) {
            if (keys.includes(col)) { // 有些列 分钟数据转成小时数据 右侧汇总+合计(小时) 不包括actualTimeStatistics列
              if (col === 'countHours') { // 合计(小时) 列
                if (i === length - 2) { // 倒数第二行
                  childArr.push('N/A')
                }
                else if (i === length - 1) { // 最后一行
                  childArr.push(this.toFixed(sourceData[i - 1]['actualTimeStatistics'])) // 拿倒数第二行的数据
                }
                else { // 其他行
                  childArr.push(this.toFixed(sourceData[i]['actualTimeStatistics']))
                }
              }
              else { // 其他汇总列
                if (i === length - 2) { // 倒数第二行
                  childArr.push('N/A')
                }
                else if (i === length - 1) { // 最后一行
                  childArr.push(this.toFixed(sourceData[i - 1][col])) // 拿倒数第二行的数据
                }
                else { // 其他行
                  childArr.push(this.toFixed(sourceData[i][col]))
                }
              }
            }
            else {
              if (i === length - 2) { // 倒数第二行
                if (col === 'actualTimeStatistics') {
                  childArr.push(sourceData[i][col])
                }
                else {
                  childArr.push(sourceData[i][col])
                }
              }
              else if (i === length - 1) { // 最后一行
                if (col === 'actualTimeStatistics') {
                  childArr.push('N/A')
                }
                else {
                  childArr.push(sourceData[i][col])
                }
              }
              else { // 其他行
                childArr.push(sourceData[i][col])
              }
            }
          }
          list.push(childArr)
        }

        list[length - 2].splice(0, 1, '合计(分钟)')
        list[length - 1].splice(0, 1, '合计(小时)')

        // 左下角合并, 合计(分钟), 合计(小时) A是竖向的
        merges.push(`A${length + 1}:B${length + 1}`)
        merges.push(`A${length + 2}:B${length + 2}`)

        for (let i = 0; i < colTotal; i++) {
          // 第一列
          if (i === 0) {
            merges.push('A1:A2')
            mergesA.push('A1:A2')
            firstColH.push('姓名')
            secondColH.push('')
          }
          else if (i === 1) {
            // 第二列
            merges.push('B1:B2')
            mergesA.push('B1:B2')
            firstColH.push('工号')
            secondColH.push('')
          }
          else if (i < dayTotal + 2) {
            // 几号
            const headerCol = sourceHeaderData[i - 2]
            firstColH.push(this.dealDate(headerCol.date))
            secondColH.push(this.weekModel[headerCol.dayInWeek])
          }
          else if (i === dayTotal + 2) {
            // 合计(分钟)
            const excelCol = numToExcelCol(i)
            const item = `${excelCol}1:${excelCol}2`
            merges.push(item)
            mergesA.push(item)
            firstColH.push('合计(分钟)')
            secondColH.push('')
          }
          else if (i === dayTotal + 3) {
            // 合计(小时)
            const excelCol = numToExcelCol(i)
            const item = `${excelCol}1:${excelCol}2`
            merges.push(item)
            mergesA.push(item)
            firstColH.push('合计(小时)')
            secondColH.push('')
          }
          else if (i === dayTotal + 4) {
            // 工时结构
            const item = `${numToExcelCol(i)}1:${numToExcelCol(i + 5)}1`
            merges.push(item)
            mergesA.push(item)
            firstColH.push('工时结构(小时)')
            secondColH.push('工作日')
            firstColH = firstColH.concat(['', '', '', '', ''])
            secondColH = secondColH.concat(['工作日加班', '双休', '节日', '超产', '复机'])
          }
        }

        multiHeader.push(firstColH)
        multiHeader.push(secondColH)

        export_json_to_excel({
          multiHeader,
          data: list,
          filename: '员工' + parseInt(this.dateStr.substring(0, 5)) + '年' + parseInt(this.dateStr.substring(5)) + '月工时统计报表',
          autoWidth: true,
          bookType: 'xlsx',
          merges,
          mergesA,
          mergesB,
          height: length,
          dayTotal
        })
      })
    },
    getCols(row, keys, dayTotal) {
      const keyArr = Object.keys(row).slice(0, dayTotal);
      return [
        'staffName',
        'staffNo',
        ...keyArr,
        'actualTimeStatistics',
        ...keys
      ]
    },
  },
};
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
/* 斜杠斜线 */
.diagonal-cell {
  width: 100%;
  height: 36px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to bottom right,
    transparent calc(50% - 1px),
    #dee5f5 calc(50% - 1px),
    #dee5f5 calc(50% + 1px),
    transparent calc(50% + 1px)
  );
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
/* 交叉斜线 */
.double-diagonal-cell {
  width: 100%;
  height: 36px;
  position: relative;
}
.double-diagonal-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom right,
    transparent 49%,
    #999 49%,
    #999 51%,
    transparent 51%
  );
}
.double-diagonal-cell::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom left,
    transparent 49%,
    #999 49%,
    #999 51%,
    transparent 51%
  );
}
</style>
<style>
.holiday {
  color: red;
}
.dataTable {
  margin-top: 24px;
}
.dataTable tbody td {
  padding: 0;
  vertical-align: top;
}
.dataTable .cell {
  padding: 0;
}
.dataTable .el-table__fixed td {
  vertical-align: middle;
}
.dataTable td > .cell {
  line-height: 36px !important;
}
</style>
