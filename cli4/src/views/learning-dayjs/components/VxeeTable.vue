<script>
export default {
  name: 'VxeeTable',
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
    this.$nextTick(() => {
      // 手动将表格和工具栏进行关联
      this.$refs.xTable1.connect(this.$refs.xToolbar1)
    })
  },
  mounted() {
  },
  methods: {
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

<template>
  <div>
    <vxe-toolbar ref="xToolbar1" custom>
      <template #buttons>
        <!-- <vxe-button>按钮1</vxe-button>
        <vxe-button>按钮2</vxe-button> -->
      </template>
    </vxe-toolbar>
    <vxe-table border resizable id="vxeTable" ref="xTable1" height="500"
      :custom-config="{storage: true, checkMethod: checkColumnMethod}" :data="tableData"
      @resizable-change="resizableChangeEvent">
      <vxe-column type="seq" width="60" align="right"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>
  </div>
</template>

<style scoped lang="scss">
.vxe-toolbar {
  padding-right: 10px;
}
</style>
