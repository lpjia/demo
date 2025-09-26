<template>
  <div>
    <p>熟悉defineComponent用法, setup()写法</p>
    <p>01-App</p>
    <p>{{ num }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue'

// 这样写是让自己熟悉defineComponent用法, setup()写法, 同步执行
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

    // 如果数据需要用在template模板上, 得手动暴露出去
    return {
      num
    }
  }
})
</script>

<style scoped lang="scss">
div {
  p:last-child {
    color: deepskyblue
  }
}
</style>
