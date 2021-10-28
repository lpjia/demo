let vue = new Vue({
  el: '#app',
  data() {
    return {
      tableData: [],

      check: false
    }
  },
  computed: {
    checkAllFlag() {
      return this.tableData.every(item => item.check4 === true)
    }
  },
  async created() {
    const treeData = XEUtils.toArrayTree(await this.getList())
    this.toColTreeData(treeData)
  },
  methods: {
    checkChangeEvent(val) {
      for (let item of this.tableData) {
        this.check4ChangeEvent(item, val.value)
      }
    },
    check1ChangeEvent(row, checked) {
      const { tableData } = this
      let childList = tableData.filter(item => item.name1 === row.name1)
      childList.forEach(item => {
        item.check1 = checked
      })
      childList = this.tableData.filter(item => item.id1 === row.id1)
      childList.forEach(item => {
        this.check2ChangeEvent(item, checked)
      })
    },
    check2ChangeEvent(row, checked) {
      const { tableData } = this
      let childList = tableData.filter(item => item.id1 === row.id1 && item.name2 === row.name2)
      childList.forEach(item => {
        item.check2 = checked
      })
      childList = this.tableData.filter(item => item.id2 === row.id2)
      childList.forEach(item => {
        this.check3ChangeEvent(item, checked)
      })
    },
    check3ChangeEvent(row, checked) {
      const { tableData } = this
      let childList = tableData.filter(item => item.id2 === row.id2 && item.name3 === row.name3)
      childList.forEach(item => {
        item.check3 = checked
      })
      childList = tableData.filter(item => item.id3 === row.id3)
      childList.forEach(item => {
        this.check4ChangeEvent(item, checked)
      })
    },
    check4ChangeEvent(row, checked) {
      const { tableData } = this
      let childList = tableData.filter(item => item.id3 === row.id3 && item.name4 === row.name4)
      childList.forEach(item => {
        item.check4 = checked
      })
      childList = tableData.filter(item => item.id3 === row.id3)
      const isChecked3 = childList.every(item => item.check4)
      childList.forEach(item => {
        item.check3 = isChecked3
      })
      childList = tableData.filter(item => item.id2 === row.id2)
      const isChecked2 = childList.every(item => item.check3)
      childList.forEach(item => {
        item.check2 = isChecked2
      })
      childList = tableData.filter(item => item.id1 === row.id1)
      const isChecked1 = childList.every(item => item.check2)
      childList.forEach(item => {
        item.check1 = isChecked1
      })

      // 补充全选的勾选显示
      this.check = this.checkAllFlag
    },
    // 获取本地 json 数据
    async getList() {
      let response = await fetch('mock/list.json');
      if (!response.ok) throw new Error('response failed')
      let res = await response.json();
      console.log('res: ', res)
      return res
    },
    // 将普通树结构转换为横向树列表
    toColTreeData(treeData) {
      const options = { children: 'children' }
      const list = []
      const keyMap = {}
      XEUtils.eachTree(treeData, (item, index, result, paths, parent) => {
        keyMap[item.id] = item
        item.keys = parent ? parent.keys.concat([item.id]) : [item.id]
        if (!item.children || !item.children.length) {
          const row = {}
          item.keys.forEach((key, index) => {
            const level = index + 1
            const obj = keyMap[key]
            row[`check${level}`] = false
            row[`id${level}`] = obj.id
            row[`name${level}`] = obj.name
          })
          list.push(row)
        }
      }, options)
      this.keyMap = keyMap
      this.tableData = list
      console.log('this.tableData: ', this.tableData)
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    rowspanMethod({ row, _rowIndex, column, visibleData }) {
      const fields = ['name1', 'name2', 'name3']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    }
  }
})