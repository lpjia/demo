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

    // 这几个看名字就懂
    cellClick(row, column, cell, event) {
      console.log('---- cellClick ----')
      // console.log('row: ', row)
      // console.log('column: ', column)
      // console.log('cell: ', cell)
      // console.log('event: ', event)
    },
    rowClick(row, column, event) {
      console.log('---- rowClick ----')
      // console.log('row: ', row)
      // console.log('column: ', column)
      // console.log('event: ', event)
    },
    rowContextmenu(row, column, event) {
      console.log('---- rowContextmenu ----')
      // console.log('row: ', row)
      // console.log('column: ', column)
      // console.log('event: ', event)
    },
    headerClick(column, event) {
      console.log('---- headerClick ----')
      // console.log('column: ', column)
      // console.log('event: ', event)
    },

    /**
     * 清空已勾选
     * 先获取表格组件
     * 直接调方法
     */
    clearSelect() {
      this.$refs.table_comp.clearSelection()
    },

    // 
    // selectionChange(selection){
    //   // selection 是已勾选行的数组
    //   console.log('---- selectionChange ----')
    //   console.log('selection:', selection)
    //   // // this.chooseList = deepClone(selection)
    //   this.chooseList = selection
    //   this.chooseList.map(item => item.zdy = true)
    //   // debugger
    // },


    // 自带的自定义事件
    selectionChange(selection) {
      // selection 是已勾选行的数组
      console.log('---- selectionChange ----')
      console.log('selection:', selection)
      this.chooseList = selection
    },

    /**
     * 反选
     * 存一份已勾选的数据, 是数组
     * 点击反选按钮, 执行方法
     * 遍历已勾选行, 增加一个自定义属性为 true 来区分, 这些行先做去勾选处理
     * toggleRowSelection 第二个参为 true, 表示该行选中, 省略第二个参, 则自动做相应 勾选/不勾选 处理
     * 遍历所有 table 数据, 不含自定义属性的行做反选处理(选中), 反之则删除自定义属性
     */
    toggleSelect() {
      for (let item of this.chooseList) {
        item.zdy = true
        this.$refs.table_comp.toggleRowSelection(item, false)
      }
      this.list.map(item => {
        if (!item.zdy)
          this.$refs.table_comp.toggleRowSelection(item)
        else
          delete item.zdy
      })
    },

    /**
     * 只能是 全选/全不选 之间切换, 类比手动 勾选/不勾选 全选
     */
    toggleAllSelect() {
      this.$refs.table_comp.toggleAllSelection()
    },
  }
})