<template>
  <div>
    <hx-comp :level="2">这是 h2, 没有 v-slot,
      用的默认插槽, this.$slots.default</hx-comp>
    <hx-comp :level="3">
      <template #slot_5>
        <p>测试静态插槽</p>
      </template>
      <template #default="dataFromChild">
        <i>{{ dataFromChild.text }}</i>
      </template>
    </hx-comp>
    <hx-comp :level="2">
      <template #default="dataFromChild">
        <i>只匹配到一个作用域插槽: {{ dataFromChild.text }}</i>
      </template>
    </hx-comp>
    <el-divider></el-divider>
  </div>
</template>

<script>
import HxComp from './common/HxComp.vue'

export default {
  name: 'ChildThree',
  components: {
    HxComp
  },
};
</script>
