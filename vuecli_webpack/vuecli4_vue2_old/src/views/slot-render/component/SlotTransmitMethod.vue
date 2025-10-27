<script>
export default {
  name: 'SlotTransmitMethod', // 插槽传方法
  data() {
    return {
      shuxing: '这是一个shuxing',
      pointerStyle: {
        cursor: 'pointer',
      }
    };
  },
  methods: {
    fn() {
      console.log('this is fn() from slot')
    },
    fn_2() {
      console.log('this is fn_2() from slot')
    },
  },
};
</script>

<template>
  <div class="color">
    <slot :shuxing="shuxing" :fn="fn" :fn_2="fn_2" :pointerStyle="pointerStyle"></slot>
  </div>
</template>

<style scoped lang="scss">
.color {
  &:hover {
    color: deepskyblue;
  }
}
</style>
