<template>
  <div>
    <p>
      走两步<br>
      <slot name="fifth" :msg="grandsonData"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SlotChild',
  data() {
    return {
      grandsonData: '孙组件通过插槽传的数据'
    };
  },
};
</script>

<style scoped lang="scss">
</style>
