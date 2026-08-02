<script>
import { calcAges, calcWorkingYears } from '@/utils/commonMethods.js'

export default {
  name: 'EleTable',
  props: ['tableData'],
  methods: {
    ageFormatter(row) {
      const result = !row.deathday ? calcAges(row.birthday)
        : calcAges(row.birthday, row.deathday) + ' (已去世)'
      return result
    },
    calcAgesF(row) {
      return calcAges(row.birthday, row.deathday)
    },

    workingYearsFormatter(row) {
      const result = !row.deathday ? calcWorkingYears(row.workday)
        : calcWorkingYears(row.workday, row.deathday) + ' (已去世)'
      return result
    },
    calcWorkingYearsF(row) {
      return calcWorkingYears(row.workday, row.deathday)
    },
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