<script>
import random from "lodash/random";

export default {
  name: 'Num',
  mounted() {
    this.random_()
  },
  methods: {
    // https://www.lodashjs.com/docs/lodash.random
    random_() {
      console.log('---- 分割线 ----\n\n\n')
      console.log("random(0, 5):", random(0, 5))
      console.log("random(1.2, 5.2):", random(1.2, 5.2))

      // 下限不给, 默认是 0
      console.log("random(5):", random(5))
      console.log("random(5, true):", random(5, true))
    },
  },
};
</script>

<template>
  <div>
  </div>
</template>

<style scoped lang="scss">
</style>
