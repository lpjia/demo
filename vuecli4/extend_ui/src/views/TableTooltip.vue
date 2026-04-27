<template>
  <div>
    <el-table ref="table" :data="tableData" style="width: 60%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column
        prop="address"
        label="地址"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" v-copy="row.address">
            复制长文本
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" @click="load">换分页数据</el-button>

    <el-divider />
    <el-table-extend ref="table2" :data="tableData" style="width: 40%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column
        prop="address"
        label="地址"
        :show-overflow-tooltip="true"
      />
    </el-table-extend>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address:
            "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address:
            "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address:
            "上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  mounted() {
    console.log(this.$options._scopeId);
    // this.$refs.popover.$refs.popper.setAttribute(this.$options._scopeId, '')
  },
  methods: {
    load() {
      this.tableData = [
        {
          date: "2016-05-02",
          name: "王小虎",
          address:
            "1231231上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address:
            "23452上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address:
            "123123上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "12312上海市普陀区金沙江路 1516 弄",
        },
      ];
    },
  },
};
</script>
<style scoped>
a {
  font-size: 20px;
}
</style>