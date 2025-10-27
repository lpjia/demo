<script>
import allTreeData_mock from './allTreeData.js'
import allTreeData_2mock from './allTreeData_2.js'
import selectedTreeData_2mock from './selectedTreeData_2.js'

export default {
  name: 'TreeComp', // 未完
  components: {
  },
  props: {
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      treeData_2: [],
      defaultProps_2: {
        children: 'children',
        label: 'name'
      },
      selectedTreeData_2: []

    };
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.treeData = allTreeData_mock.treeData
    this.loadTreeData_2()
  },
  mounted() {
  },
  methods: {
    loadTreeData_2() {
      this.treeData_2 = allTreeData_2mock.planList
      this.selectedTreeData_2 = selectedTreeData_2mock.planList

      let tempList = allTreeData_2mock.planList
      tempList.map(item => {
        if (item.parentId === '') {
          item.parentId = '0'
        }
      })
      // 渲染
      this.treeData_2 = oneToTree(tempList, '0')
    }
  },
};
</script>

<template>
  <div>
    <el-tree :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"
      :props="defaultProps">
    </el-tree>
    <hr>
    <el-tree :data="treeData_2" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"
      :props="defaultProps_2">
    </el-tree>
  </div>
</template>

<style scoped lang="scss">
</style>
