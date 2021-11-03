let vue = new Vue({
  el: '#app',
  data: {
    list: [
      { finishStatus: 2, name: 'val is 2' },
      { finishStatus: 3, name: 'val is 3' },
      { finishStatus: 1, name: 'val is 1' },
    ],


    rowList: [
      { sensorStatus: true, name: 'sensorStatus is true' },
      { sensorStatus: false, name: 'sensorStatus is false' },
    ],


    tableCellGreenFlag: 'tableCellGreen',
    tableCellRedFlag: 'tableCellRed',
    tableCellFlag: 'tableCell',

    tabList: ['在途模式', '地图模式', '卫星模式', '飞行模式'],
    numActive: 0,
    isActive: true,
    objActive3: {
      active3: true
    },
    active4Class: 'active4',


    styleObj: {
      color: '#fff', backgroundColor: '#ed6d00'
    },
    styleObj2: {
      color: '#fff'
    },
    styleObj3: {
      backgroundColor: 'blue'
    },
    styleObj4: {
      fontSize: 30 + 'px'
    },
    fontSize5: 20,
    // marginLeft: 20,
  },
  computed: {
    productStatusIcon() {
      return status => {
        let obj = null
          , bgColor = null
        switch (status) {
          // case 1: obj = { 'background-color': rgba(98, 175, 251, 0.2) }; break;
          case 1: bgColor = 'rgba(98, 175, 251, 0.2)'; break;
          case 2: bgColor = 'rgba(245, 108, 108, 0.2)'; break;
          case 3: bgColor = 'rgba(38, 166, 154, 0.2)'; break;
          default: break;
        }
        obj = { 'background-color': bgColor }
        return obj
      }
    },
    productStatusTextColor() {
      return status => {
        let obj = null
          , color = null
        switch (status) {
          case 1: color = '#1989fa'; break;
          case 2: color = '#f56c6c'; break;
          case 3: color = '#999999'; break;
          default: break;
        }
        obj = { 'color': color }
        return obj
      }
    },


    switchTab() {
      return i => {
        this.numActive = i
      }
    },
    classObject() {
      return i => {
        return {
          'active2': this.numActive === i,
          'color-c': this.isActive,
        }
      }
    },
    styleObj6() {
      return {
        display: 'inline-block',
        // marginLeft: this.marginLeft + 'px'
        marginLeft: this.fontSize5 + 'px'
      }
    },

  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 
     */
    init() {
    },
    doSomething(msg) {
      console.log(msg)
    },
  }
})