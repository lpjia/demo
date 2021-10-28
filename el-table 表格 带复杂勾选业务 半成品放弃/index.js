import { deepClone } from '../util/commonMethod.js'

let vue = new Vue({
  el: '#app',
  data: {
    // 后端给数据, 把同组数据放一起
    tableData: null,
    isCheckAll: false,
    isIndeterminate: false, // 半勾选样式

    childcheckedArr: [], // 表格内所有已勾选的数据
    childcheckedArr2: [],
    allCheckArr: [], // 所有可勾选数据


    spanArr: [], // 存怎么合并行
  },
  computed: {
    // 方便显示行索引和分组, 暂时不用
    checkLable() {
      // return (row) => `${Number(row.id) - 1}-${row.name}`
      return (row) => `${Number(row.id) - 1}-${row.groupNum}`
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取本地 json 数据
    async getList() {
      let response = await fetch('mock/list.json');
      if (!response.ok) throw new Error('response failed')
      let res = await response.json();
      // console.log('res: ', res)
      this.tableData = res

      this.checkingFlag(this.tableData)
      this.getRowspanByGroup(this.tableData)
    },
    /**
     * 合并行/列
     * 这里思路还能学习点
     */
    spanMethodObj({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return [_row, _col] // 用数组简单
        /**
         * 合并行/列, [_row, _col]
         * _row 表示合并的行数, _col 表示列数,
         * 竖着合并, 也就是合并行, 如只合并三行一列, 那么第一行[3, 1], 第二行与第三行[0, 0]
         * 横着合并, 也就是合并列, 如只合并一行四列, 那么第一列[1, 4], 其余列[0, 0]
         */
      }
    },
    /**
     * 给每行做标记
     * 这里思路还能学习点
     */
    checkingFlag(data) {
      for (let i = 0; i < data.length; i++) {
        this.$set(data[i], "flagStr", i + '_')
        // 半勾选控制
        this.$set(data[i], "isInde", false)
        // 给字段来显示上级已勾选内容
        this.$set(data[i], "txt", '')
      }
      for (const item of data) {
        // 把每行的索引当做标识, 实际上也不会让它显示出来
        this.allCheckArr.push(item.flagStr)
        this.allCheckArr.push('_' + item.flagStr)
      }
      console.log('this.tableData: ', this.tableData)
      console.log('this.allCheckArr: ', this.allCheckArr)
    },
    /**
     * 根据分组来确定怎么合并行
     * 这里思路还能学习点
     */
    getRowspanByGroup(data) {
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].groupNum === data[i - 1].groupNum) {
            this.spanArr[this.pos] += 1; //需要合并的行数
            this.spanArr.push(0); //新增被合并的行
          } else {
            this.spanArr.push(1);
            this.pos = i; //新的需要合并的第几行数
          }
        }
      }
      console.log('根据分组来确定怎么合并行: ', this.spanArr)
    },

    // 全/全不勾选
    handleCheckAllChange(val, e2) {
      // console.log('val: ', val)
      // console.log('e2: ', e2)
      // console.log('this.isCheckAll: ', this.isCheckAll)
      // console.log('this.isIndeterminate: ', this.isIndeterminate)

      // 全/全不勾选
      this.childcheckedArr = val ? this.allCheckArr : []
    },
    /**
     * 根据组来分别勾选
     * 勾选下级, 会顺带着勾选上级
     * 勾选上级, 会顺带着勾选所有下级
     */
    handleCheckboxGroupChange(valArr) {
      console.log('valArr: ', valArr)

      // // 每次勾选都要遍历整个数组, 根据组号
      // let data = this.tableData
      // for (let i = 0; i < data.length; i++) {
      //   // this.$set(data[i], "checking", true)
      // }
    },
    /**
     * 处理勾选上级
     * 这里思路还能学习点
     */
    handleTopCheck(isCheck, val, idx) {
      // console.log('val: ', val)
      // 去掉勾选时, 操作的索引
      const valIdx = this.childcheckedArr2.indexOf(val)
      // console.log('valIdx: ', valIdx)

      // 过滤出相同组
      const { groupNum } = this.tableData[idx]
      let newArr = this.tableData.filter(item => item.groupNum === groupNum)
      if (isCheck) {
        // 勾选
        let txt = ''
        for (const item of newArr) {
          this.childcheckedArr.push(item.flagStr)
          txt += item.name + ', '
        }
        txt = txt.slice(0, txt.length - 2)
        // 给上级已勾选的赋值
        // 但是我觉得还有更好的处理方案, 由下级开始, 然后上级再调下级的方法, 遍历, 可以试试
        this.$set(this.tableData[idx], 'txt', txt)
      } else {
        // 去掉勾选
        const leng = newArr.length
        this.childcheckedArr.splice(valIdx, leng)
      }
      // 为了计算上级操作索引
      this.childcheckedArr2 = deepClone(this.childcheckedArr)
    },
    /**
     * 处理勾选下级
     */
    handleBtmCheck(isCheck, val, idx) {
      // 没啥好的方案, 放弃
    }
  }
})