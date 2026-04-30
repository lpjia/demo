<template>
  <div>
    <h3>打开 F12</h3>
    <ele-table :tableData="tableData" />
    <el-divider></el-divider>

    <vxee-table :tableData="tableData_2" />
    <el-divider></el-divider>

    <NativeTable />
  </div>
</template>

<script>
import EleTable from './components/EleTable.vue';
import NativeTable from './components/NativeTable.vue';
import VxeeTable from './components/VxeeTable.vue';
import tableData from './mock/tableData'
import tableData_2 from './mock/tableData_2'

export default {
  name: 'App',
  components: {
    EleTable,
    VxeeTable,
    NativeTable
  },
  data() {
    return {
      tableData,
      tableData_2,
    };
  },
};
</script>
