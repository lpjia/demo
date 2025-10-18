<script>
import TwoWayBinding from './components/two-way-binding/TwoWayBinding.vue'

export default {
  name: 'XsAnli',
  components: {
    TwoWayBinding
  },
};
</script>

<template>
  <div>
    <h3>$msgBox 双向绑定问题</h3>
    <TwoWayBinding />
  </div>
</template>

<style scoped lang="scss">
</style>
