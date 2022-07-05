<script>
import dayjs from 'dayjs'
import { calcAges, calcWorkingYears } from '@/utils/commonMethods.js'

export default {
  name: 'EleTable',
  components: {
  },
  props: ['tableData'],
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
    // 对于注释写得少的代码, 直接剪切到顶部查看打印结果
    console.log('---- 最初分割线 ----\n\n\n')




    // 当前时间格式化
    console.log(
      dayjs().format('YYYY-MM-DD')
    )
    console.log(
      dayjs().format('YYYY-MM-DD hh:mm:ss')
    )
    console.log('---- 分割线 ----\n\n\n')




    // 当前时间默认格式化
    // 默认返回的是 ISO8601 格式字符串
    console.log(
      dayjs().format()
    )
    console.log('---- 分割线 ----\n\n\n')




    // 处理国际时间
    console.log(
      dayjs('2018-04-04T16:00:00.000Z').format()
    )
    console.log('---- 分割线 ----\n\n\n')




    // 返回一个封装的新实例
    console.log(
      dayjs()
    )
    console.log(
      dayjs(new Date())
    )
  },
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

<style scoped lang="scss">
</style>
