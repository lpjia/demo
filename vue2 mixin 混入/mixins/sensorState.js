import { fireSensorStatus } from '../../util/commonData.js'
import { objToArr } from '../../util/commonMethod.js'

export default {
  data() {
    return {
      allFireSensorStateObj: {},
      allFireSensorStateArr: [],
    }
  },
  created() {
    this.getAllFireSensorState()
  },
  methods: {
    // 获取所有火灾传感器状态
    getAllFireSensorState() {
      this.allFireSensorStateObj = fireSensorStatus
      let res = objToArr(fireSensorStatus, { v: 'value' })

      // 把最后面的"全部"项调到最前
      let popItem = res.pop()
      res.unshift(popItem)

      this.allFireSensorStateArr = res
    },
  }
}