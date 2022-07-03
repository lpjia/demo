<template>
  <div>
    <h3>打开 F12</h3>

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
    <el-divider></el-divider>

    <vxe-toolbar ref="xToolbar1" custom>
      <template #buttons>
        <!-- <vxe-button>按钮1</vxe-button>
        <vxe-button>按钮2</vxe-button> -->
      </template>
    </vxe-toolbar>
    <vxe-table border resizable id="vxeTable" ref="xTable1" height="1000"
      :custom-config="{storage: true, checkMethod: checkColumnMethod}" :data="tableData_2"
      @resizable-change="resizableChangeEvent">
      <vxe-column type="seq" width="60" align="right"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { calcAges, calcWorkingYears } from '@/utils/commonMethods.js'
// const customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)
import tableData from './tableData'
import tableData_2 from './tableData_2'

export default {
  name: 'LearningDayjs',
  components: {
  },
  props: {
  },
  data() {
    return {
      tableData: tableData,
      tableData_2: tableData_2,
    };
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.$nextTick(() => {
      // 手动将表格和工具栏进行关联
      this.$refs.xTable1.connect(this.$refs.xToolbar1)
    })
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
    console.log('---- 分割线 ----\n\n\n')
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

    checkColumnMethod({ column }) {
      if (column.property === 'role') {
        return false
      }
      return true
    },
    resizableChangeEvent() {
      const columns = this.$refs.xTable1.getColumns()
      const customData = columns.map(column => {
        return {
          width: column.renderWidth
        }
      })
      console.log(customData)
    }
  },
};
</script>

<style scoped lang="scss">
.vxe-toolbar {
  padding-right: 10px;
}
</style>
