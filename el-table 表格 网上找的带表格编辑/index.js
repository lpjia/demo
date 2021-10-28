let vue = new Vue({
  el: '#app',
  data: {
    rules: {},
    page: 1,
    pageSize: 20,
    pageCount: 10,
    formInline: {
      area: "青岛市",
      year: "2018-2019"
    },
    tableData3: [],
    dialogQuick: false,
    addform: {},
    spanArr: [], // 单独存合并行的索引, 长度和 table 数据一致
    pos: "", // 用来记录处理位置的索引
    spanArrOne: [],
    posOne: "",
    spanArr4Edit: [], // 单独存分组, 长度和 table 数据一致
    pos4Edit: "",
    //快捷填写flag,记录哪一行数据的快捷填写
    quickFlag: "",
    title: '我是表头',
  },
  watch: {
    // 监听数据变化, 主要是计算第一列的合计
    tableData3: {
      handler(newValue, oldValue) {
        let ctx = this;
        let length = oldValue.length;
        let num = 0;

        if (length > 0) {
          for (let i = 0; i < length; i++) {
            num = Number(num) + Number(ctx.tableData3[i].value1);
          }
          // if (num != 0) {
          //   ctx.tableData3[0].all = num;
          // } else {
          //   ctx.tableData3[0].all = "";
          // }

          ctx.tableData3[0].all = num != 0 ? num : ''
        }
      },
      //immediate: true,
      deep: true //深度监听对象里面的属性
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    // this.getData();
  },
  methods: {
    getData() {
      this.getTableDataList();
    },
    // 列表， 
    async getTableDataList() {
      let ctx = this;

      // ctx.$api
      //   .getTableDataList()
      //   .then(res => {

      //     ctx.total = res.totalRows;
      //     ctx.pageCount = ctx.total / ctx.pageSize + 1;
      //     ctx.tableData = res.rows;
      //   })
      //   .catch(() => {

      //   });


      let response = await fetch('mock/list.json');
      if (!response.ok) throw new Error('response failed')
      let res = await response.json();
      console.log('res: ', res)

      //进行赋值，为了后面编辑用，此方法位置不要动
      ctx.getSpanArr4Edit(res);

      console.log("ctx.tableData3: ", ctx.tableData3);
      ctx.getSpanArr(ctx.tableData3);
      ctx.getSpanArrOne(ctx.tableData3);
    },
    //改变分页事件已办理
    clickChangePage(currPage) {
      this.getGateStationList(currPage);
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "height:0";
    },
    searchData: function () {
      let searchVal = this.formInline.searchVal;
    },
    setClass(gateState) {
      if (gateState == 0) {
        return "stateClass-a";
      }

      return "stateClass-b";
    },
    dialogQuickClose() {
      this.dialogQuick = false;
    },

    // 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
    //合并单元格,此方法需要后台进行名字进行排序
    cellMerge({ row, column, rowIndex, columnIndex }) {
      //idx=0 比较特殊，单独合并
      if (columnIndex === 0) {
        const _row = this.spanArrOne[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      // idx=1 2 5列进行合并
      if (columnIndex === 1 || columnIndex === 2 || columnIndex === 5) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    // idx 为 1 2 5 列合并的数据, 都是3行合并
    getSpanArr(data) {
      /**
       * 这个逻辑值得学习, 合并动态行
       * pos 用来记录需要累加的行索引
       */
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].name === data[i - 1].name) {
            this.spanArr[this.pos] += 1; //需要合并的行数
            this.spanArr.push(0); //新增被合并的行
          } else {
            this.spanArr.push(1);
            this.pos = i; //新的需要合并的第几行数
          }
        }
      }
      console.log('idx=1 2 5 的列 this.spanArr: ', this.spanArr)
    },
    // idx=0 列合并的数据
    getSpanArrOne(data) {
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArrOne.push(1);
          this.posOne = 0;
        } else {
          this.spanArrOne[this.posOne] += 1; //需要合并的行数
          this.spanArrOne.push(0); //新增被合并的行
        }
      }

      console.log("idx=0 的列 this.spanArrOne: ", this.spanArrOne);
    },
    //编辑用到的数据
    getSpanArr4Edit(data) {
      let ctx = this;
      let flagNum = 0;

      /**
       * 遍历数组
       */
      for (let i = 0; i < data.length; i++) {
        /**
         * 添加一个自定义属性 editing 来控制编辑状态, false 表示 !编辑中
         */
        //首先不能编辑
        ctx.$set(data[i], "editing", false);

        if (i === 0) {
          ctx.spanArr4Edit.push(flagNum);
        } else {
          /**
           * 用行索引来分组, 根据名称来判断, 同一组有相同的索引
           */
          //判断当前元素与上一个元素是否相同
          if (data[i].name === data[i - 1].name) {
            ctx.spanArr4Edit.push(flagNum); //还是同一个记录
          } else {
            ctx.spanArr4Edit.push(i);
            flagNum = i;
          }
        }
        /**
         * 添加自定义属性 flagNum, 作为分组标记
         */
        //与编辑相对应
        ctx.$set(data[i], "flagNum", flagNum);
      }
      //最终赋值
      ctx.tableData3 = data;
      console.log("根据第二列分组, 存每组第一个索引 this.spanArr4Edit: ", ctx.spanArr4Edit);
    },
    //快捷填写
    clickTodo(index, row) {
      this.dialogQuick = true;
      this.quickFlag = index;
      this.addform = {};
    },
    //快捷填写保存
    addSubmit() {
      let ctx = this;
      //赋值数据,取出哪一行需要进行赋值
      let idx = this.quickFlag;

      let datalength = ctx.tableData3.length;
      //每次快捷填写某一个分水口，所以此变量在此定义
      let initFlag = 0;
      for (let i = 0; i < datalength; i++) {
        // 这里会执行三次, 行是合并后的, 所以有三个一样的索引
        if (idx === ctx.tableData3[i].flagNum) {
          if (initFlag === 0) {
            // value1 只赋值一次
            this.$set(ctx.tableData3[i], "value1", this.addform.w);
          }
          // value2 赋值三次
          initFlag++;
          this.$set(ctx.tableData3[i], "value2", this.addform.q);
        }
      }
      this.dialogQuick = false;
      ctx.$message.success("操作成功");
      console.log(this.addform, "this.addform");
    },
    // 处理编辑操作
    handleEdit(index, row) {
      let ctx = this;
      this.setEditFlag(index, 1);
      console.log(index);
      // this.prevValue = JSON.parse(JSON.stringify(row));//保存之前的数据
    },
    handleCancle(index, row) {
      row.editing = false;
      // let prevContent = this.prevValue.bookname;
      // this.$set(row,"bookname",prevContent);
    },
    savemodify(index, row) {
      this.setEditFlag(index, 0);
      console.log(row, "row");
      console.log(this.tableData3, "改变后的table数据");
      console.log(
        JSON.stringify(this.tableData3),
        "JSON.stringify(this.tableData3)"
      );
    },
    //提交数据到后台
    submitToServe() {
      let ctx = this;
      let dataResult = JSON.parse(JSON.stringify(this.tableData3));
      let result = 0;
      //调用后台保存方法
      // ctx.$api.addWaterApply(dataResult).then(res => {
      //   if (res.code == "0") {
      //       result =1;
      //   }
      // });
      console.log(dataResult, "提交到后台的数据");
      //return result;
      return 1;
    },
    /**
     * 编辑输入框, 显示与隐藏
     * 0 隐藏, 1 显示
     */
    setEditFlag(index, flag) {
      let ctx = this;
      let datalength = ctx.tableData3.length;
      let flagNum = ctx.spanArr4Edit[index];

      for (let i = 0; i < datalength; i++) {
        // if (flag === 1) {
        //   if (flagNum === ctx.tableData3[i].flagNum) {
        //     //循环遍历改变可编辑的标记
        //     this.$set(ctx.tableData3[i], "editing", true);
        //   }
        // } else {
        //   //循环遍历改变可编辑的标记
        //   this.$set(ctx.tableData3[i], "editing", false);
        // }

        flag === 1 ?
          flagNum === ctx.tableData3[i].flagNum && this.$set(ctx.tableData3[i], "editing", true) :
          this.$set(ctx.tableData3[i], "editing", false)
      }
    }
  },

  filters: {
    iswarnFlt(val) {
      return val == 0 ? "否" : "是";
    }
  }

})