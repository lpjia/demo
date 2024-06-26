<template>
  <div>
    <span>01-App</span>
    <b>{{ num }}</b>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue'

// 这样写是让自己熟悉defineComponent用法
export default defineComponent({
  setup() {
    console.log('执行了 setup')

    onBeforeMount(() => {
      console.log('执行了 onBeforeMount')
    })
    onMounted(() => {
      console.log('执行了 onMounted')
    })

    const num = 1

    // 如果数据需要用在模板上, 得手动暴露出去
    return {
      num
    }
  }
})
</script>

<style scoped lang="scss">
div {
  span {
    color: deepskyblue
  }
}
</style>
