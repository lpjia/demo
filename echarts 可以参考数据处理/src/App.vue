<template>
  <div style="padding: 30px 30px 0;">
    <el-card class="box-card" style="position: sticky;top: 0;z-index:999">
      <el-row :gutter="20" style="width:100vw">
        <el-col :span="5">
          <el-date-picker
            v-model="listQuery.time"
            size="small"
            type="daterange"
            style="margin-bottom: 20px;width: 100%;"
            value-format="yyyy-MM-dd"
            align="center"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-col>
        <!--      请选择产品-->
        <el-col :span="5">
          <SelectProduct
            :limit="1"
            v-model="listQuery.checkApp"
            :appList="applist"
          />
        </el-col>
        <el-col :span="3">
          <el-select :multiple-limit="1" v-model="checkCountry" size="small" filterable multiple
                     style="margin-bottom: 20px;" placeholder="请选择地区">
            <el-option v-for="(item, key) in countryList" :key="'country' + key" :label="item.label"
                       :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="getData"
            :loading="loading"
          >
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <div style="margin-top: 30px">
      <h5>各地区DAU排序（显示前二十国家）</h5>
      <AggregationTable :data="dauData" :cols="dauCols"/>
    </div>
    <div style="margin-top: 30px">
      <h5>各地区收入情况（按利润排序）(仅显示前二十和后二十国家)</h5>
      <AggregationTable :data="profitData" :cols="profitCols"/>
    </div>
    <div style="margin-top: 30px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <h5>用户数据</h5>
            <Chart
              ref="chart"
              :fullScreenDiaglog.sync="fullScreenDiaglog"
              :chartData="userData"
            />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h5>用户价值</h5>
            <Chart
              ref="chart"
              :fullScreenDiaglog.sync="fullScreenDiaglog"
              :chartData="userValue"
            />
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 20px">
          <el-card>
            <h5>收入趋势</h5>
            <Chart
              ref="chart"
              :fullScreenDiaglog.sync="fullScreenDiaglog"
              :chartData="incomeData"
            />
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 20px">
          <el-card>
            <h5>付费率</h5>
            <Chart
              ref="chart"
              :fullScreenDiaglog.sync="fullScreenDiaglog"
              :chartData="payRateData"
            >
            </Chart>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 20px">
          <el-card>
            <h5>ARPU</h5>
            <Chart
              ref="chart"
              :fullScreenDiaglog.sync="fullScreenDiaglog"
              :chartData="arpuData"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!--    展示全屏的图表-->
    <el-dialog
      :lock-scroll="true" :visible.sync="fullScreenDiaglog" width="75%">
      <div id="fullScreen" style="height: 600px;" ref="fullScreen"></div>
    </el-dialog>
  </div>
</template>
<script>
import AggregationTable from "./components/AggregationTable";
import Chart from "./components/Chart";
import charts from '@/data/charts'
import dau from '@/data/dau'
import profit from '@/data/profit'
import products from '@/data/products'
import countrys from '@/data/countrys'
import SelectProduct from '@/components/SelectProduct'
// import moment from 'moment'

export default {
  name: 'AggregationChart',
  components: {
    AggregationTable,
    Chart,
    SelectProduct
  },
  data() {
    this.dauCols = [
      {
        label: '序号',
        type: 'index',
        width: 180
      },
      {
        prop: "country_iso",
        label: "地区",
      },
      {
        label: "DAU",
      },
      {
        label: "ARS安装量",
      },
      {
        label: "自然量",
      }
    ]
    this.profitCols = [
      {
        label: '序号',
        type: 'index',
        width: 180
      },
      {
        prop: "country_iso",
        label: "地区",
      },
      {
        prop: "revenue",
        label: "广告收入",
      },
      {
        prop: "dollar",
        label: "内购收入(收入验证)",
      },
      {
        prop: "expenditure",
        label: "投放花费",
      },
      {
        prop: "profitByInApp",
        label: "利润",
      }
    ]
    return {
      fullScreenDiaglog: false,
      applist: [],
      dauData: [],
      chartData: [],
      userData: {}, // 用户图表数据
      userValue: {}, // 用户价值
      incomeData: {}, // 收入趋势图表
      arpuData: {}, // Arpu图表
      payRateData: {}, // 付费率图表
      profitData: [],
      loading: false,
      listQuery: {
        // checkApp: ['bjlu5rqdxm5lxogmsrvxgwsi'],
        checkApp: [],
        // time: ["2021-07-05", "2021-07-12"],
        time: [],
      },
      // checkCountry: ['US'],
      checkCountry: [],
      countryList: [],
      pickerOptions: {
        disabledDate: (time) => {
          // 往前推只能选择两年
          // date()获取或设置月份的日期。
          // return time.getTime() > Date.now() || time.getTime() < new Date(moment().subtract(1, 'months').date(1)).setHours(0, 0, 0, 0)
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const time = new Date()
            picker.$emit('pick', [time, time])
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const time = new Date()
            time.setTime(time.getTime() - 3600 * 1000 * 24 * 1)
            picker.$emit('pick', [time, time])
          }
        }, {
          text: '最近七天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.getProducts()
    this.getCountrys()
  },
  methods: {
   /*  async getData() {
      try {
        if (this.message) this.message.close()
        if (!this.listQuery.time || !this.listQuery.time.length) {
          this.message = this.$message.warning('请选择日期')
          return
        }
        if (!this.listQuery.checkApp.length) {
          this.message = this.$message.warning('请选择产品')
          return
        }
        // 获取两个日期之间的天数
        let day = moment(this.listQuery.time[1]).diff(this.listQuery.time[0], 'day')
        if (day > 30) {
          this.message = this.$message.warning('日期范围不能大于30天')
          return
        }
        if (!this.checkCountry.length) {
          this.message = this.$message.warning('图表需要选择地区，请选择地区')
          return
        }
        this.loading = true
        // 两个日期之间的天数
        this.listQuery.dayCount = day + 1
        let profitData = getProfit(this.listQuery)
        // dau需要额外一个参数当前日期范围的前7天日期
        let lastTime = [
          moment(this.listQuery.time[0]).subtract(day + 1, 'days').format('YYYY-MM-DD'),
          moment(this.listQuery.time[1]).subtract(day + 1, 'days').format('YYYY-MM-DD')
        ]
        let dauData = getDau(Object.assign({}, this.listQuery, {lastTime}))
        let chartData = getChartData(Object.assign({}, this.listQuery, {checkCountry: this.checkCountry}))
        let [{data: dau}, {data: profit}, {data: chart}] = await Promise.all([dauData, profitData, chartData])
        
        this.dauData = dau
        //取前后20条数据
        let profit40 = [...profit.slice(0, 20), ...profit.slice(profit.length - 20, profit.length)]
        this.profitData = Object.freeze(profit40)
        // 图表数据
        this.chartData = Object.freeze(chart)
        this.mapData()
      } catch (e) {
        console.log(e)
        this.errorMsg()
      }
      this.loading = false
    }, */

     async getData() {
      try {
        this.dauData = dau
        //取前后20条数据
        let profit40 = [...profit.slice(0, 20), ...profit.slice(profit.length - 20, profit.length)]
        this.profitData = Object.freeze(profit40)
        // 图表数据
        this.chartData = Object.freeze(charts)
        this.mapData()
      } catch (e) {
        console.log(e)
        this.errorMsg()
      }
      this.loading = false
    },
    mapData() {
      // 日期
      const date = []
      // 用户数据
      // ARS安装量
      let ars = []
      // 自然量
      let organicInstall = []
      // 日活
      let daus = []
      // 付费人数
      let payUser = []
      // 广告收入
      let revenue = []
      // 内购收入
      let dollar = []
      // 内购ARPU（内购验证）
      let payARPU = []
      // 广告ARPU
      let adARPPU = []
      // 内购付费率(%)
      let payRate = []
      // 用户价值
      let userValueByInApp = []

      this.chartData.forEach(item => {
        date.push(item.day)
        ars.push(item.installCount)
        organicInstall.push(item.organicInstall)
        daus.push(item.daus)
        payUser.push(item.payUser)
        revenue.push(item.revenue)
        dollar.push(item.dollar)
        adARPPU.push(item.adARPPU)
        payARPU.push(item.payARPU)
        payRate.push(item.payRate)
        userValueByInApp.push(item.userValueByInApp)
      })
      // 用户价值
      this.userValue = Object.freeze({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
            label: {
              formatter(res) {
                if (res.axisIndex === 1) {
                  return res.value.toFixed(2)
                } else if (!isNaN(res.value)) {
                  return Math.ceil(res.value)
                } else {
                  return res.value
                }
              }
            }
          },
          formatter(params) {
            let res = params[0].name;
            for (let i = 0; i < params.length; i++) {
              res += "<br>" + params[i].marker + params[i].seriesName + "：" + (params[i].data ? params[i].data : '-');
            }
            return res;
          }
        },
        // 防止90°出现文字不显示全问题
        xAxis: [
          {
            type: 'category',
            data: date,
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: {
              interval: 0,
              rotate: 90
            }
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            smooth: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              formatter(value) {
                let val = value.toFixed(2) == 0 ? 0 : value.toFixed(2)
                return val
              }
            }
          },
        ],
        series: [
          {
            name: '日活',
            data: daus,
            type: 'bar',
            animation: true,
            itemStyle: {
              color: "#9BCB87"
            },
            barWidth: '40%',//柱图宽度
          },
          {
            name: '用户价值',
            data: userValueByInApp,
            type: 'line',
            animation: true,
            yAxisIndex: 1,
            itemStyle: {
              color: "#F47A3F"
            },
          },
        ],
      })
      // 用户数据
      this.userData = Object.freeze({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
            label: {
              formatter(res) {
                if (!isNaN(res.value)) {
                  return Math.ceil(res.value)
                } else {
                  return res.value
                }
              }
            }
          },
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: {
              interval: 0,
              rotate: 90
            }
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            smooth: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
        ],
        series: [
          {
            name: 'ARS安装量',
            stack: 'user',
            data: ars,
            type: 'bar',
            animation: true,
            itemStyle: {
              color: "#F47135"
            },
            barWidth: '40%',//柱图宽度
          },
          {
            name: '自然流量',
            stack: 'user',
            data: organicInstall,
            type: 'bar',
            animation: true,
            itemStyle: {
              color: "#9B9B9B"
            },
          },
          {
            name: '日活',
            type: 'line',
            // yAxisIndex: 1,
            data: daus,
            itemStyle: {
              color: "#5399D0"
            },
            animation: true,
          },
          {
            name: '付费人数',
            type: 'line',
            yAxisIndex: 1,
            data: payUser,
            itemStyle: {
              color: "#FFBD34"
            },
            animation: true,
          },
        ],
      })
      // 收入趋势
      this.incomeData = Object.freeze({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
            label: {
              formatter(res) {
                if (res.axisIndex === 0 && !isNaN(res.value)) {
                  return res.value.toFixed(2)
                } else if (!isNaN(res.value)) {
                  return Math.ceil(res.value)
                } else {
                  return res.value
                }
              }
            }
          },
          /* formatter(params) {
             let res = params[0].name;
             for (let i = 0; i < params.length; i++) {
               res += "<br>" + params[i].marker + params[i].seriesName + "：" + (params[i].data ? params[i].data : '-');
             }
             return res;
           }*/
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: {
              interval: 0,
              rotate: 90
            }
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter(value) {
                return value.toFixed(2)
              },
            },
          },
          {
            type: 'value',
            smooth: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
        ],
        series: [
          {
            name: '广告收入',
            data: revenue,
            type: 'bar',
            animation: true,
            itemStyle: {
              color: "#9BCB87"
            },
            barGap: '0%',
          },
          {
            name: '内购收入',
            data: dollar,
            type: 'bar',
            animation: true,
            itemStyle: {
              color: "#A8C0E2"
            },
          },
          {
            name: 'DAU',
            type: 'line',
            yAxisIndex: 1,
            data: daus,
            itemStyle: {
              color: "#FF2D34"
            },
            animation: true,
          }
        ],
      })
      // ARPU
      this.arpuData = Object.freeze({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
            label: {
              formatter(res) {
                if (res.axisIndex === 1) {
                  return res.value.toFixed(2)
                } else if (!isNaN(res.value)) {
                  return Math.ceil(res.value)
                } else {
                  return res.value
                }
              }
            }
          },
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: {
              interval: 0,
              rotate: 90
            }
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            smooth: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter(value) {
                return value.toFixed(2)
              },
            },
          },
        ],
        series: [
          {
            name: '日活',
            data: daus,
            barWidth: '40%',//柱图宽度
            type: 'bar',
            animation: true,
            itemStyle: {
              color: "#F37237"
            },
          },
          {
            name: '内购ARPU（内购验证）',
            data: payARPU,
            type: 'line',
            animation: true,
            yAxisIndex: 1,
            itemStyle: {
              color: "#9F9F9F"
            },
          },
          {
            name: '广告ARPU',
            type: 'line',
            yAxisIndex: 1,
            data: adARPPU,
            itemStyle: {
              color: "#458FCC"
            },
            animation: true,
          }
        ],
      })
      // 付费率
      this.payRateData = Object.freeze({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
            label: {
              formatter(res) {
                if (res.axisIndex === 1) {
                  return res.value.toFixed(2)
                } else if (!isNaN(res.value)) {
                  return Math.ceil(res.value)
                } else {
                  return res.value
                }
              }
            }
          },
          formatter(params) {
            let res = params[0].name;
            for (let i = 0; i < params.length; i++) {
              res += "<br>" + params[i].marker + params[i].seriesName + "：" + (params[i].data ? params[i].data : '-');
            }
            return res;
          }
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: {
              interval: 0,
              rotate: 90,
            }
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            smooth: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              formatter(value) {
                return value.toFixed(2) == 0 ? 0 : value.toFixed(2)
              }
            }
          },
        ],
        series: [
          {
            name: '日活',
            data: daus,
            barWidth: '40%',//柱图宽度
            type: 'bar',
            animation: true,
            itemStyle: {
              color: "#458FCC"
            },
          },
          {
            name: '内购付费率(%)',
            data: payRate,
            type: 'line',
            animation: true,
            yAxisIndex: 1,
            itemStyle: {
              color: "#F47A3F"
            },
          },
        ],
      })
    },
    // 获取请选择应用下拉列表数据
    async getProducts() {
      this.applist = products
    },
    // 获取地区数据
    async getCountrys() {
      this.countryList = countrys
    },
    // 当数据没有获取到时触发
    errorMsg() {
      if (this.message) {
        this.message.close()
      }
      this.message = this.$message.error('网络超时')
    }
  },
}
</script>

<style >
/*svg样式控制*/
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.4em;
  fill: currentColor;
  overflow: hidden;
}
</style>
<style lang="less" scoped>
h5 {
  color: #1A1A1A;
  font-size: 15px;
}

::v-deep {
  .el-table__fixed, .el-table__fixed-right {
    box-shadow: none !important;
  }

  .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
  }
}

/deep/ .el-tag--info {
  display: flex;
  max-width: 90%;
  align-items: center;

  .el-select__tags-text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-tag__close {
    flex-shrink: 0;
  }
}

</style>
