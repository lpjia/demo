<template>
  <div class="app-container">
    <h4 class="titleStyle">员工工时统计报表</h4>
    <el-row>
      <el-form>
        <el-col :xs="8" :sm="8" :lg="8">
          <el-form-item :label="$t('table.month')">
            <el-date-picker v-model="dateStr" type="month" :clearable="false" :placeholder="$t('table.month')"
              value-format="yyyy-MM" @change="getWorkingHoursSummary"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8">
          <el-form-item label="车间">
            <el-select v-model="workshop.workshopName" @change="getworkshopList">
              <el-option v-for="item in workshopList" :key="item.id" :label="item.workshopName" :value="item.id" />
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
    <!-- <el-table
      max-height="620"
      :data="dataList.staffWorkHoursDTOList"
      id="dataTable"
      v-loading="loading"
      :span-method="objectSpanMethod"
      style="width: 100%"
      ref="table"
    >-->
    <!-- <el-table
      max-height="620"
      :data="dataList"
      class="dataTable"
      :span-method="objectSpanMethod"
      v-loading="loading"
      style="width: 100%"
      ref="table"
      :cell-style="bgColor"
      :header-cell-style="bgColor2"
    >-->
    <el-table max-height="620" :data="dataList" class="dataTable" :span-method="objectSpanMethod" v-loading="loading"
      style="width: 100%" ref="table">
      <el-table-column label="序号" fixed align="center" width="75">
        <template slot-scope="scope">
          <span>{{ rowDisp(scope.$index) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="staffName" label="姓名" align="center" fixed width="150"></el-table-column>
      <el-table-column prop="staffNo" label="工号" fixed align="center" width="120"
        :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column
        v-for="item in canlendarList"
        :prop="item.date"
        :key="item.date"
        :label="dealDate(item.date)"
        align="center"
        width="75"
      >-->
      <el-table-column v-for="item in canlendarList" :prop="item.date" :key="item.date" :label="dealDate(item.date)"
        align="center" width="75">
        <!-- :render-header="renderHeader(item)" -->

        <el-table-column :label="weekModel[item.dayInWeek]" align="center" width="75"
          :class-name="item.holidayType!==0?'holiday':''">
          <template slot-scope="scope">
            <span>{{ scope.row[item.date]}}</span>
            <!-- <div
              v-else
              style="background-color:red!important;"
            >{{ colProp(scope,item.date,item.holiday) }}</div>-->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="合计/分钟" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.actualTimeStatistics }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合计/时" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ toFixed(scope.row.actualTimeStatistics) }}</span> -->
          <span>{{ span(scope) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工时结构" align="center">
        <el-table-column label="平时(时)" align="center">
          <template slot-scope="scope">
            <span>{{ toFixed(scope.row.quotaTimeStatistics) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平时加班(时)" align="center">
          <template slot-scope="scope">
            <span>{{ toFixed(scope.row.overTimeStatistics) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="双休(时)" align="center">
          <template slot-scope="scope">
            <span>{{ toFixed(scope.row.restDayOverTimeStatistics) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="节日(时)" align="center">
          <template slot-scope="scope">
            <span>{{ toFixed(scope.row.holidayTimeStatistics) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="超产(时)" align="center">
          <template slot-scope="scope">
            <span>{{ toFixed(scope.row.beyondTimeStatistics) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="复机(时)" align="center">
          <template slot-scope="scope">
            <span>{{ toFixed(scope.row.duplicateTimeStatistics) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { workingHoursStat } from '@/api/production-report'
import { removeToken } from '@/utils/auth'
import { $toFixed } from '@/utils/common-method'
import { workshopListAll } from '@/api/workshop'

let objDeepCopy = function (source) {
  var sourceCopy = source instanceof Array ? [] : {}
  for (var item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object'
        ? objDeepCopy(source[item])
        : source[item]
  }
  return sourceCopy
}

export default {
  name: 'WorkhourStat',
  components: {},

  data() {
    return {
      dateStr: '',
      allDayArr: [],
      fixArrLength: 0,
      flag: true,
      canlendarList: [],
      dataList: [],
      loading: false,
      weekModel: {
        '7': '日',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六'
      },
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
    let month = date.getMonth() // 默认上个月
    let day = date.getDate()
    if (day >= 26) {
      month = month + 1
    }
    this.dateStr = year + '-' + (month >= 10 ? month : '0' + month)
    this.getworkshopListAll()
  },
  mounted() {
    // this.getWorkingHoursSummary()
  },
  computed: {
    // 日期格式
    dealDate() {
      return date => {
        let day = date.substr(8, 2)
        if (day[0] === '0') {
          return day[1]
        } else {
          return day
        }
      }
    },
    // 四舍五入
    toFixed() {
      return num => {
        let res = num / 60
        if (parseInt(res) === res) {
          return $toFixed(res, 0)
        } else {
          return $toFixed(res, 2)
        }
      }
    },
    // cell带小时
    span() {
      return param => {
        let $idx = param.$index
        if ($idx === this.dataList.length - 2) {
          return this.toFixed(param.row.actualTimeStatistics) + '小时'
        } else {
          return this.toFixed(param.row.actualTimeStatistics)
        }

        // let res = num / 60
        // if (parseInt(res) === res) {
        //   return $toFixed(res, 0)
        // } else {
        //   return $toFixed(res, 2)
        // }
      }
    },
    // 底部显示合计
    rowDisp() {
      return $idx => {
        if ($idx === this.dataList.length - 1) {
          return '合计/时'
        } else if ($idx === this.dataList.length - 2) {
          return '合计/分钟'
        } else if ($idx < this.dataList.length - 2) {
          return $idx + 1
        }
      }
    },
    // col名
    colProp() {
      return (scope, date, holiday) => {
        // debugger
        let res
        // if (item.holiday) {
        //   res = `${item.date}_${item.dayInWeek}_1`
        // } else {
        //   res = `${item.date}_${item.dayInWeek}_0`
        // }
        res = scope.row[date]
        // debugger
        return res
      }
    }
  },
  methods: {
    // isHoliday(row) {
    //   console.log(row)
    // },
    // renderHeader(item) {
    //   console.log(item)
    //   if (item.holiday) {
    //     return (
    //       <div>
    //         <span>{item.dayInWeek}</span>
    //         <span>假日</span>
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <div>
    //         <span>{item.dayInWeek}</span>
    //       </div>
    //     )
    //   }

    // },
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
    // 获取统计报表
    getWorkingHoursSummary() {
      let that = this
      that.loading = true
      let listQuery = {
        dateStr: that.dateStr,
        workshopId: that.workshopId
      }
      workingHoursStat(listQuery).then(res => {
        setTimeout(() => {
          that.loading = false
        }, 800)

        let { code, data, msg } = res.data
        // let { code, data, msg } = res
        if (code === 200) {
          // 日历
          that.allDayArr = objDeepCopy(data.canlendarList)
          let hangData = objDeepCopy(data.staffWorkHoursDTOList)
          let sourceData = []

          // 无数据
          if (!hangData.length) {
            that.dataList = sourceData
            return false
          }

          for (let i of hangData) {
            // 每行的数据
            let staffName, staffNo
            // i.workHoursDTOList // 已有数据的日期
            let lieData = objDeepCopy(i.workHoursDTOList)
            // 每行数据obj
            let obj = {}
            for (let item of that.allDayArr) {
              // debugger
              // 月的所有天数日期
              for (let item2 of lieData) {
                // 循环已有的数据
                // debugger
                staffName = item2.staffName
                staffNo = item2.staffNo
                if (item.date === item2.reportDate) {
                  // 有数据的给值
                  // debugger
                  item.actualTime = item2.actualTime
                  item.reportDate = item2.reportDate
                  continue
                }
              }
              // 没这一天的数据,给0
              if (!item.reportDate) {
                item.actualTime = 0
              }
              // 赋值相应的date的值
              obj[item.date] = item.actualTime
            }

            // 给其他字段值
            obj['staffName'] = staffName
            obj['staffNo'] = staffNo
            Object.assign(obj, i.workHoursStatisticsDTO)
            sourceData.push(obj)

            // 清掉
            for (let item of that.allDayArr) {
              delete item['actualTime']
              delete item['reportDate']
            }
          }

          // 构造最后一行 时数据
          let obj = sourceData[sourceData.length - 1]
          let objKeyArr = Object.keys(obj)
          let resObj = {}
          for (let i of objKeyArr) {
            if (i === 'actualTimeStatistics') {
              resObj[i] = this.toFixed(obj[i])
            } else {
              resObj[i] = this.toFixed(obj[i])
            }
          }
          // 多余的操作,又把小时除了60
          // if (sourceData.length > 1) {
          //   let row2 = sourceData[sourceData.length - 1]
          //   row2.quotaTimeStatistics = this.toFixed(row2.quotaTimeStatistics)
          //   row2.holidayTimeStatistics = this.toFixed(
          //     row2.holidayTimeStatistics
          //   )
          //   row2.beyondTimeStatistics = this.toFixed(row2.beyondTimeStatistics)
          //   row2.overTimeStatistics = this.toFixed(row2.overTimeStatistics)
          //   row2.restDayOverTimeStatistics = this.toFixed(
          //     row2.restDayOverTimeStatistics
          //   )
          // }
          sourceData.push(resObj)

          // 按日历的列
          that.canlendarList = that.allDayArr
          // console.log('that.canlendarList:', that.canlendarList)
          // let a = sourceData
          // for (let i = 0; i < 9; i++) {
          //   sourceData = sourceData.concat(a)
          // }
          that.dataList = sourceData
          // console.log('sourceData:', sourceData)
          // console.log('sourceData.key:', Object.keys(sourceData[0]))
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
      let leng = this.canlendarList.length
      if (rowIndex === this.dataList.length - 2) {
        if (columnIndex === 0) {
          return [1, 3]
        } else if (
          columnIndex === 1 ||
          columnIndex === 2 ||
          columnIndex === leng + 3
        ) {
          return [0, 0]
        } else if (columnIndex === leng + 4) {
          return [2, 2]
        } else if (columnIndex > leng + 4) {
          return [2, 1]
        }
      }
      if (rowIndex === this.dataList.length - 1) {
        if (columnIndex === 0) {
          return [1, 3]
        } else if (
          columnIndex === 1 ||
          columnIndex === 2 ||
          columnIndex === leng + 3 ||
          columnIndex > leng + 4
        ) {
          return [0, 0]
        } else if (columnIndex === leng + 4) {
          return [0, 2]
        }
      }
    },
    // 导出数据
    exportExcel() {
      require.ensure([], () => {
        // const {
        //   export_json_to_excel
        // } = require('./Export2Excel_workhour_stat')

        let sourceData = this.dataList

        let height = sourceData.length
        if (!sourceData.length) {
          this.$message.error('没有数据可导出!')
          return false
        }
        // 原始表头数据
        let sourceHeaderData = this.canlendarList
        let mergesB = []
        // 判断是否假期
        sourceHeaderData.map((item, index) => {
          if (item.holidayType !== 0) {
            let mergesItem = `${this.createCellPos(index + 2)}`
            mergesB.push(mergesItem)
          }
        })
        // let sourceHeaderData = []

        // 天数
        let dayTotal = sourceHeaderData.length
        // 总列数
        let colNum = dayTotal + 2 + 8

        // 合并单元格
        let merges = []
        let mergesA = [] // 存表头需要改变样式的单元格
        // 复杂表头
        let multiHeader = []
        // 第一行表头
        let firstColH = []
        // 第二行表头
        let secondColH = []
        // 数据
        // 有几行就有几个子数组 二维数组格式
        let list = []
        let colList = this.getErArr(sourceData, dayTotal)

        let getHoursObj = {
          countHours: '1',
          quotaTimeStatistics: '1',
          overTimeStatistics: '1',
          restDayOverTimeStatistics: '1',
          holidayTimeStatistics: '1',
          beyondTimeStatistics: '1',
          duplicateTimeStatistics: '1'
        }
        for (let i = 0; i < sourceData.length; i++) {
          let childArr = []
          for (let item of colList) {
            if (getHoursObj[item] === '1') {
              // 转化为小时
              if (item === 'countHours') {
                if (
                  i === sourceData.length - 2 ||
                  i === sourceData.length - 1
                ) {
                  childArr.push('')
                } else {
                  childArr.push(
                    this.toFixed(sourceData[i]['actualTimeStatistics'])
                  )
                }
              } else {
                if (i === sourceData.length - 1) {
                  childArr.push('')
                } else {
                  childArr.push(this.toFixed(sourceData[i][item]))
                }
              }
            } else {
              if (i === sourceData.length - 2) {
                if (item === 'actualTimeStatistics') {
                  childArr.push(
                    this.toFixed(sourceData[i]['actualTimeStatistics']) + '小时'
                  )
                } else {
                  childArr.push(sourceData[i][item])
                }
              } else if (i === sourceData.length - 1) {
                if (item === 'actualTimeStatistics') {
                  childArr.push('')
                } else {
                  childArr.push(sourceData[i][item])
                }
              } else {
                childArr.push(sourceData[i][item])
              }
            }
          }
          list.push(childArr)
        }
        list[sourceData.length - 2].shift()
        list[sourceData.length - 2].shift()
        list[sourceData.length - 2].unshift('')
        list[sourceData.length - 2].unshift('合计/分钟')
        list[sourceData.length - 1].shift()
        list[sourceData.length - 1].shift()
        list[sourceData.length - 1].unshift('')
        list[sourceData.length - 1].unshift('合计/时')

        // 左下角合并 合计/分钟/时
        merges.push(`A${sourceData.length + 1}:B${sourceData.length + 1}`)
        merges.push(`A${sourceData.length + 2}:B${sourceData.length + 2}`)

        // 右下角合并 xx小时
        // merges.push(
        //   `A${this.createCellPos((dayTotal + 2) % 26)}${sourceData.length +
        //     1}:A${this.createCellPos((dayTotal + 3) % 26)}${sourceData.length +
        //     2}`
        // )
        merges.push(
          `${this.createCellPos(dayTotal + 2)}${sourceData.length +
          1}:${this.createCellPos(dayTotal + 3)}${sourceData.length + 2}`
        )

        // 右下角合并 5个
        for (let i = 0; i < 6; i++) {
          let merg = `${this.createCellPos(
            dayTotal + i + 5
          )}${sourceData.length + 1}:${this.createCellPos(
            dayTotal + i + 5
          )}${sourceData.length + 2}`
          merges.push(merg)
        }

        for (let i = 0; i < colNum; i++) {
          // 第一列
          if (i === 0) {
            merges.push('A1:A2')
            mergesA.push('A1:A2')
            firstColH.push('姓名')
            secondColH.push('')
          } else if (i === 1) {
            // 第二列
            merges.push('B1:B2')
            mergesA.push('B1:B2')
            firstColH.push('工号')
            secondColH.push('')
          } else if (i < dayTotal + 2) {
            // debugger
            // 天
            firstColH.push(this.dealDate(sourceHeaderData[i - 2].date))
            secondColH.push(this.weekModel[sourceHeaderData[i - 2].dayInWeek])
          } else if (i === dayTotal + 2) {
            // 合计/分钟
            let mergesItem = `${this.createCellPos(i)}1:${this.createCellPos(
              i
            )}2`
            merges.push(mergesItem)
            mergesA.push(mergesItem)
            firstColH.push('合计/分钟')
            secondColH.push('')
          } else if (i === dayTotal + 3) {
            // 合计/时
            // let posi = i % 26
            let mergesItem = `${this.createCellPos(i)}1:${this.createCellPos(
              i
            )}2`
            merges.push(mergesItem)
            mergesA.push(mergesItem)
            firstColH.push('合计/时')
            secondColH.push('')
          } else if (i === dayTotal + 4) {
            // 工时结构
            let mergesItem = `${this.createCellPos(i)}1:${this.createCellPos(
              i + 5
            )}1`
            merges.push(mergesItem)
            mergesA.push(mergesItem)
            mergesA.push('AN2')
            firstColH.push('工时结构')
            secondColH.push('平时(时)')
            firstColH = firstColH.concat(['', '', '', '', ''])
            secondColH = secondColH.concat([
              '平时加班(时)',
              '双休(时)',
              '节日(时)',
              '超产(时)',
              '复机(时)'
            ])
          }
        }

        multiHeader.push(firstColH)
        multiHeader.push(secondColH)
        // console.log('multiHeader:', multiHeader)
        // debugger
        export_json_to_excel({
          multiHeader: multiHeader,
          data: list,
          filename:
            '员工' +
            parseInt(this.dateStr.substring(0, 5)) +
            '年' +
            parseInt(this.dateStr.substring(5)) +
            '月工时统计报表',
          autoWidth: true,
          bookType: 'xlsx',
          merges: merges,
          mergesA: mergesA,
          mergesB: mergesB,
          height: height,
          dayTotal: dayTotal
        })
      })
    },
    // 返回列的数组
    getErArr(sourceArr, dayTotal) {
      // 所有天的key数组
      let keyArr = Object.keys(sourceArr[0])
      let resArr = []
      keyArr.splice(dayTotal)

      resArr = resArr.concat(['staffName', 'staffNo'])
      resArr = resArr.concat(keyArr)
      resArr = resArr.concat([
        'actualTimeStatistics',
        'countHours',
        'quotaTimeStatistics',
        'overTimeStatistics',
        'restDayOverTimeStatistics',
        'holidayTimeStatistics',
        'beyondTimeStatistics',
        'duplicateTimeStatistics'
      ])
      return resArr
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
.holiday {
  position: relative !important;
  /* color: #fff !important; */
}
.holiday :after {
  content: '__';
  position: absolute;
  left: 30px;
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
