<template>
  <div>
    <h3>打开 F12</h3>
    <ele-table :tableData="tableData" />
    <el-divider></el-divider>

    <vxee-table :tableData="tableData_2" />
  </div>
</template>

<script>
import EleTable from './components/EleTable.vue';
import VxeeTable from './components/VxeeTable.vue';
import tableData from './tableData'
import tableData_2 from './tableData_2'

export default {
  name: 'LearningDayjs',
  components: {
    EleTable,
    VxeeTable
  },
  props: {
  },
  data() {
    return {
      tableData,
      tableData_2,
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

<style scoped lang="scss">
</style>
