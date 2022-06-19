<template>
  <div>
    <ChildOne>
      <!-- 作用域插槽不能传事件, 可以传数据, 类比 el-table-column 插入的 row -->
      <!-- 插槽的显示顺序, 看子组件挖坑的顺序 -->
      <template v-slot:slot_2="dataFromChild">
        这是父组件的 slot_2 插槽
        <span style="color: deepskyblue;">替换了</span>
        <div>从子组件 {{ slotString }} 获取的数据: &nbsp;&nbsp;{{ dataFromChild }}</div>
      </template>
      <template #slot_1="{ data }">
        这是父组件的 slot_1 插槽
        <span style="color: deepskyblue;">插槽 prop 解构出来</span>
        <div>从子组件 {{ slotString }} 获取的数据: &nbsp;&nbsp;{{ data }}</div>
      </template>
      <template #slotTuoFeng="{ dataPointData }">
        这是父组件的 slotTuoFeng 插槽
        <span style="color: deepskyblue;">解构出来</span>
        <div>从子组件 {{ slotString }} 获取的数据: &nbsp;&nbsp;{{ dataPointData }}</div>
      </template>
    </ChildOne>
  </div>
</template>

<script>
import ChildOne from './ChildOne.vue'

export default {
  name: 'ScopeSlot',
  components: {
    ChildOne
  },
  data() {
    return {
      slotString: '<slot>'
    }
  }
};
</script>
