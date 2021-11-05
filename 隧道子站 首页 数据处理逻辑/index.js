import { device_type_reverse, getGroupByDevice, getImgGroupByDevice } from '../util/commonData.js'
import { judgeNotEmpty } from '../util/commonMethod.js'



let vue = new Vue({
  el: '#app',
  data: {
    sensorSum: null,
    showNameMap: { // 显示传感器文本
      '一氧化碳': 'CO &nbsp;传感器',
      '氧气': 'O<sub>2</sub> &nbsp;&nbsp;传感器',
      '硫化氢': 'H<sub>2</sub>S&nbsp;传感器',
      '甲烷': 'CH<sub>4</sub>&nbsp;传感器',
      '温度': '温度传感器',
      '湿度': '湿度传感器',
      '液位': '液位传感器',
    },

    sensorAlarmList: [],
    sensorWarningList: [],
    sensorHintList: [],
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getSensorCountInfo()
      this.getSensorAlarm()
    },
    // 获取传感器数量统计
    async getSensorCountInfo() {
      let response = await fetch('mock/map.json')
      if (!response.ok) throw new Error('response failed')
      let res = await response.json()
      console.log('数据源 res: ', res)

      let sensorData = this.getSensorData(res)
      console.log('初加工数据 sensorData: ', sensorData)

      let cardAmount = this.getCardAmount(sensorData)
      console.log('显示几种 card cardAmount: ', cardAmount)

      let cardBaseData = this.getCardBaseData(sensorData, cardAmount)
      console.log('每种 card 有什么数据 cardBaseData: ', cardBaseData)

      this.sensorSum = this.getCardData(sensorData, cardBaseData)
      console.log('组装好数据, 遍历即可 this.sensorSum: ', this.sensorSum)
    },
    // 获取报警等传感器数据
    async getSensorAlarm() {
      let response = await fetch('mock/alarm.json')
      if (!response.ok) throw new Error('response failed')
      let sourceData = await response.json()
      console.log('数据源 sourceData: ', sourceData)

      if (judgeNotEmpty(sourceData)) {
        for (let item of sourceData) {
          item.imgType = getImgGroupByDevice(item.category)
          switch (item.level) {
            case 2:
              this.sensorAlarmList.push(item)
              break;
            case 1:
              this.sensorWarningList.push(item)
              break;
            case 0:
              this.sensorHintList.push(item)
              break;
            default: break;
          }
        }

        console.log('报警 this.sensorAlarmList: ', this.sensorAlarmList)
        console.log('预警 this.sensorWarningList: ', this.sensorWarningList)
        console.log('提示 this.sensorHintList: ', this.sensorHintList)
      }
    },

    // 组装 sensor 数据
    getSensorData(sensorSourceData) {
      let result = []
        , kArr = Object.keys(sensorSourceData)
        , vArr = Object.values(sensorSourceData)

      for (let index = 0; index < kArr.length; index++) {
        let element = kArr[index]
          , obj = {
            name: this.showNameMap[element] ? this.showNameMap[element] : element, // 为了显示, 带 html 结构
            amount: vArr[index],
            key: device_type_reverse[element][0], // 为了后续分组, 4种气体是一组, 温湿度是一组, 其他各自为组
          }
        result.push(obj)
      }

      return result
    },
    // 获取 card 类型数量, 去掉重复的
    getCardAmount(sensorData) {
      let cardAmount = new Set()

      for (const item of sensorData) {
        let imgType = getImgGroupByDevice(item.key) // 分组, 对应图片分组
        cardAmount.add(imgType)
      }

      return cardAmount
    },
    // 组装 card 基础数据
    getCardBaseData(sensorData, cardAmount) {
      let result = []

      for (const x of cardAmount) {
        let obj = {
          imgType: x, // 正确引入分组各自的图片
          sensor: []
        }

        for (const y of sensorData) {
          if (getImgGroupByDevice(y.key) === x) obj.groupType = getGroupByDevice(y.key)
        }

        result.push(obj)
      }

      return result
    },
    // 组装 card 数据
    getCardData(sensorData, cardBaseData) {
      for (let x of cardBaseData) {
        for (let y of sensorData) {
          if (getImgGroupByDevice(y.key) === x.imgType) x.sensor.push(y) // 初加工数据放到对应的 card 中
        }
      }

      return cardBaseData
    },
  }
})