<template>
  <div>
    <div>
      <slot>我是默认插槽: {{ description }}</slot>
    </div>
    <div>
      <slot name="slot_1" :data="'绑定的数据: ' + chinese">我是 slot_1 插槽: {{ description }}</slot>
    </div>
    <div>
      <slot name="slot_2" data="直接写属性">我是 slot_2 插槽: {{ description }}</slot>
    </div>
    <div>
      <slot name="slotTuoFeng" dataPointData="驼峰式命名的数据">我是 slotTuoFeng 插槽: {{ description }}</slot>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>

export default {
  name: 'ChildOne',
  data() {
    return {
      description: 'this is childOne',
      chinese: '第一个局部组件'
    };
  },
};
</script>

<style scoped lang="scss">
</style>

