<template>
  <div>
    <!-- <v-table :tableData="tableData" /> -->

    <v-table-three />
  </div>
</template>

<script>
// import VTable from './components/vxe-table-one.vue';
// import VTable from './components/vxe-table-two.vue';
// import tableData from './mock/tableData'

import VTableThree from './components/vxe-table-three.vue';

export default {
  name: 'App',
  components: {
    // VTable

    VTableThree
  },
  data() {
    return {
      // tableData
    };
  },
};
</script>
