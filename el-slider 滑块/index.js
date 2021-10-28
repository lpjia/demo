
new Vue({
  el: '#app',
  data: {
    valueTop: 0,
    valueTopMin: 0,
    valueTopMax: 50,

    valueBtm: 20,
    valueBtmMin: 0,
    valueBtmMax: 50,

    step: 0.1,
  },
  computed: {
  },
  methods: {
    // 
    changeValTop(val) {
      console.log('val: ', val)
      console.log('this.valueTop:', this.valueTop)
      if (val < this.valueBtm) {
        this.$message.error('上限值不能低于下限值!')
        this.valueTop = this.valueBtm
      }
    },
    changeValBtm(val) {
      console.log('val: ', val)
      console.log('this.valueBtm:', this.valueBtm)
      if (val > this.valueTop) {
        this.$message.error('下限值不能高于上限值!')
        this.valueBtm = this.valueTop
      }
    },
  }
})