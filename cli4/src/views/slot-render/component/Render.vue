<template>
  <div>
    <child-two>
      <template #slot_3="dataFromChild">
        这是父组件的 slot_3 插槽
        <span style="color: deepskyblue;">从 this.$scopedSlots.slot_3 传来的数据: {{ dataFromChild.id }}</span>
      </template>
      <template #slot_4>
        这是父组件的 slot_4 插槽
        <span style="color: deepskyblue;">替换了</span>
      </template>
      <template #default>
        这是父组件的 default 插槽
        <span style="color: deepskyblue;">替换了</span>
      </template>
    </child-two>
  </div>
</template>

<script>
import ChildTwo from './ChildTwo.vue'

export default {
  name: 'Render',
  components: {
    ChildTwo
  },
  props: {

  },
  data() {
    return {

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
