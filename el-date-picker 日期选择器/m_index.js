import { formatTime } from '../util/commonMethod.js'

let vm = new Vue({
  el: '#app',
  data: {
    form: {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
    },
    pickerVal: null, // 第一次选中的时间
    isEnable: true,
    /*
    pickerOptionsObj: {
      onPick: ({ maxDate, minDate }) => {
        console.log('maxDate: ', maxDate)
        console.log('minDate: ', minDate)
        vm.pickerVal = minDate
      },
      disabledDate: time => vm.pickerOptionsDisabledDate({ time, anyTime: vm.pickerVal, hmDay: 3, isEnable: vm.isEnable })
    }, */
    pickerOptionsObj2: {
      disabledDate: time => vm.pickerOptionsDisabledDate({ time, hmDay: 7 })
    },
    /*
    pickerOptionsObj2: {
      disabledDate: time => { // time 是把日历上所显示的天都遍历一遍
        let nowTime = new Date(formatTime(new Date(), 'Y-M-D')).getTime()
          // 前后一周范围内应该是前后各六天
          // 直接判断当天日期, 不用考虑时分秒
          , day = 1000 * 3600 * 24
          , minTime = nowTime - day * 7
          , maxTime = nowTime + day * 6
        // 落后于小的时间和提前于大的时间, 都被禁用
        return time < minTime || time > maxTime
      }
    }, */
    pickerOptionsObj3: {
      disabledDate: time => vm.pickerOptionsDisabledDate({ time, hmDay: 14 })
    },
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    pickerChange(val) {
      console.log(val)
    },
    pickerFocus(comp) {
      this.pickerVal = null
      this.isEnable = true
    },


    // 用方法返回对象来替代, 可以用 this, 不过得调用
    pickerOptionsObj() {
      return {
        onPick: ({ minDate }) => {
          this.pickerVal = minDate
          this.isEnable = false
        },
        disabledDate: time => this.pickerOptionsDisabledDate({ time, anyTime: this.pickerVal, hmDay: 3, isEnable: this.isEnable })
      }
    },

    log(time) {
      console.log('-- start log --')
      console.log(time)

      let arr = []
        , arrVal = Object.values(vm.$data.form)

      let leng = arrVal.length
      for (let i = 0; i < leng; i++) {
        let obj = {
          value: String(arrVal[i])
        }
        arr.push(obj)
      }

      console.table(arr)
    },

    // 封装个日期的范围判断
    pickerOptionsDisabledDate({ time, anyTime = new Date(), hmDay, isEnable = false }) {
      if (!isEnable) {
        let nowTime = new Date(formatTime(anyTime, 'Y-M-D')).getTime()
          // 前后一周范围内应该是前后各六天
          // 直接判断当天日期, 不用考虑时分秒
          , day = 86400000 // 1000 * 3600 * 24
          , minTime = nowTime - day * hmDay
          , maxTime = nowTime + day * (hmDay - 1)
        // 落后于小的时间和提前于大的时间, 都被禁用
        return time < minTime || time > maxTime
      }
      return false
    },


    // 赋值数组
    setArrValue5() {
      console.log('this.form: ', this.form)
      this.form.value5 = ['2021-11-08', '2021-11-12']

      setTimeout(() => {
        // 这里想用下 this.$data
        console.log('this.$data: ', this.$data)
        this.$data.form.value5 = ['2021-11-01', '2021-11-22']
      }, 2000);
    },

    // 赋值 date 对象
    setDateValue6() {
      this.form.value6 = new Date()
    },

    // 赋值 date 对象
    setDateValue7() {
      let start = new Date(new Date().getTime() - 1000 * 3600 * 24 * 6)
        , end = new Date()
      this.form.value7 = [start, end]
    },

    // 赋值 date 对象
    setStringValue7() {
      let start = new Date().getTime() - 1000 * 3600 * 24 * 6
        , end = new Date()
        , startStr = formatTime(start, 'Y-M-D')
        , endStr = formatTime(end, 'Y-M-D')
      this.form.value7 = [startStr, endStr]
    },
  }
})