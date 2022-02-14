<template>
  <div>
    <b>{{ msg }}</b>
  </div>
</template>

<script>
import { toRefs } from "vue"

export default {
  name: 'child',
  props: {
    msg: {
      type: String,
      require: true
    }
  },
  setup(props, ctx) {
    // console.log('props:', props)
    // console.log('ctx:', ctx)

    // const { msg } = toRefs(props) // 还是感觉变量多了之后, 一个个解构麻烦

    return {
      // msg
      ...toRefs(props)
    }
  }
}
</script>

<style scoped>
</style>