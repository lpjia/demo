<template>
  <div>
    <vxe-toolbar ref="xToolbar1" custom></vxe-toolbar>
    <vxe-table border id="vxeTable" ref="xTable1" height="500" :data="tableData"
      :custom-config="{ storage: true, checkMethod: checkColumnMethod }">
      <vxe-column type="seq" width="60" align="right"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'VTableTwo',
  props: ['tableData'],
  mounted() {
    this.$nextTick(() => {
      // 手动将表格和工具栏进行关联
      this.$refs.xTable1.connect(this.$refs.xToolbar1)
    })
  },
  methods: {
    // 返回值用来决定这一列的 checkbox 是否可以选中, true表示可选中
    checkColumnMethod({ column }) {
      return column.property !== 'role'
    }
  },
};
</script>

<style scoped>
/* .vxe-toolbar {
  padding-right: 10px;
} */
</style>
