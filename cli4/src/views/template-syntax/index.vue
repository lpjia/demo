<template>
  <div>
    <Chazhi />
    <Zhiling />
  </div>
</template>

<script>
import Chazhi from './component/chazhi.vue'
import Zhiling from './component/zhiling.vue'

export default {
  name: 'TemplateSyntax',
  components: {
    Chazhi,
    Zhiling,
  },
};
</script>

<style scoped lang="scss">
</style>
