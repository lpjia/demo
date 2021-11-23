import { getImgGroupByDevice } from '../util/commonData.js'

const vm = new Vue({
  el: '#app',
  data: {
    sensorList: [],

  },
  computed: {
    longName() {
      return item => item.sectionName + " " + item.equipmentName
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let url = "mock/data.json"
      let response = await fetch(url);

      if (!response.ok) throw new Error('response failed')
      let res = await response.json();
      this.dealwithData(res)
    },
    dealwithData(sourceData) {
      let alarmList = []
        , warningList = []
        , hintList = []
      for (let item of sourceData) {
        item.imgType = getImgGroupByDevice(item.category)
        switch (item.level) {
          case 2:
            alarmList.push(item)
            break;
          case 1:
            warningList.push(item)
            break;
          // case 0:
          //   hintList.push(item)
          //   break;
          default: hintList.push(item)
            break;
        }
      }
      this.sensorList.push({
        sectionName: '报警',
        type: 'alarm',
        list: alarmList,
        count: alarmList.length,
      })
      this.sensorList.push({
        sectionName: '预警',
        type: 'warning',
        list: warningList,
        count: warningList.length,
      })
      this.sensorList.push({
        sectionName: '提示',
        type: 'hint',
        list: hintList,
        count: hintList.length,
      })
    }
  },
})