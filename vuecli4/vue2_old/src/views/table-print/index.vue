<script>
export default {
  name: 'TablePrint',
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const url = "http://rap2api.taobao.org/app/mock/288967/api/table"
      const response = await fetch(url);
      if (!response.ok) throw new Error('response failed')
      const res = await response.json();
      // res 就是接口返回的 json 数据
      this.list = res.data
    }
  },
};
</script>

<template>
  <div>
    <el-table :data="list" border height="500">
      <el-table-column type="index" label="NO." width="60" align="center" />
      <el-table-column label="ID" prop="name" align="center"></el-table-column>
      <el-table-column label="名字" prop="color" align="center"></el-table-column>
      <el-table-column label="行为" align="center">
        <template slot-scope="{ row }">
          <span>填充 {{ row.color}}</span>
        </template>
      </el-table-column>
      <el-table-column label="颜色" prop="color" align="center"></el-table-column>
    </el-table>

    <!-- 缺分页, 前端分页, 每页15条记录 -->
  </div>
</template>

<style scoped lang="scss">
</style>
