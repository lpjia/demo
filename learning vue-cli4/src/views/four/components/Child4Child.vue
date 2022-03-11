<template>
  <div>
    <p>
      走两步<br>
      <slot name="five" :msg="childData"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Child4Child',
  data() {
    return {
      childData: 'Child4Child.vue 通过插槽传的数据'
    };
  },
};
</script>

<style scoped lang="scss">
</style>
