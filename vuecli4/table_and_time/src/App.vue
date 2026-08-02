<template>
  <div>
    <ele-table :tableData="tableData" />
    <el-divider></el-divider>

    <v-table :tableData="tableData_2" />
    <el-divider></el-divider>

    <NativeTable />
  </div>
</template>

<script>
import EleTable from './components/ele-table.vue';
import NativeTable from './components/native-table.vue';
import VTable from './components/vxe-table.vue';
import tableData from './mock/tableData'
import tableData_2 from './mock/tableData_2'

export default {
  name: 'App',
  components: {
    EleTable,
    VTable,
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
