<script>
export default {
  name: 'EleTable',
  components: {
  },
  props: {
    tableData: {
    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="NO." width="60" align="right" fixed />

      <el-table-column prop="username" label="姓名">
      </el-table-column>
      <el-table-column prop="birthday" label="出生日期">
      </el-table-column>
      <!-- <el-table-column prop="birthday" label="年龄" :formatter="ageFormatter" /> -->
      <el-table-column label="年龄" :formatter="ageFormatter" />
      <el-table-column label="测试 calcAges" :formatter="calcAgesF" />
      <el-table-column prop="workday" label="入职日期">
      </el-table-column>
      <el-table-column label="工龄" :formatter="workingYearsFormatter" />
      <el-table-column label="测试 calcWorkingYears" :formatter="calcWorkingYearsF" />
    </el-table>
  </div>
</template>

<style scoped lang="scss">
</style>
