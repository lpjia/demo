let vue = new Vue({
  el: '#app',
  data: {
    list: null,
    chooseList: [],
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      let response = await fetch('mock/list.json');
      if (!response.ok) throw new Error('response failed')
      let res = await response.json();
      // console.log('res: ', res)
      this.list = res
    },
    validatorRulesFn(row) {
      let { val, max, min, errorTxt } = row
        , num = Number(val)
      // 是否显示错误提示信息
      row.err = Number.isNaN(num) ? "请输入正确金额" :
        (num >= min && num <= max) ? '' : errorTxt
    },
    getList2() {
      console.log('this.list: ', this.list)
    },
    validate() {
      let flag = true
      for (let item of this.list) {
        if (item.err !== '') flag = false
        break
      }
      flag && this.$message.success('校验通过!')
    }
  }
})