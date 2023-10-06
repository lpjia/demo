<script setup lang="ts">
import { watch, computed } from 'vue'
import {
  useLocalStorage, useMouse, usePreferredDark,
  useTitle, useDark, debounceFilter,
  throttleFilter
} from '@vueuse/core'
// 使用vueuse


// const { x, y } = useMouse()

// const isDark = usePreferredDark()

const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)

// // 改某一属性值
// store.value.color = 'deepskyblue'

// // 直接把store清空, localStorage也会删除key是my-storage的这一项
// store.value = null

// // 重新给store赋值
// setTimeout(() => store.value = { name: 'sky', color: 'deepskyblue' }, 1000)


// // watch, isDark是ref
// const isDark = useDark()
// const title = useTitle('Set title')
// watch(isDark, () => {
//   console.log('watch: isDark')
//   title.value = isDark.value ? '🌙 Good evening!' : '☀️ Good morning!'
// },
//   // { immediate: true }
// )

// // computed, isDark是ref
// const title = computed(() => isDark.value ? '🌙 Good evening!' : '☀️ Good morning!')
// useTitle(title)

// // 将“Reactive Getter”作为参数传递
// const title = useTitle(() => isDark.value ? '🌙 Good evening!' : '☀️ Good morning!')

// 事件过滤器，以灵活地控制何时触发事件
const { x, y } = useMouse({ eventFilter: debounceFilter(1000) })

</script>

<template>
  <div>pos: {{ x }}, {{ y }}</div>
  <!-- <div>{{ isDark }}</div> -->
  <div>{{ store }}</div>
  <div>{{ store.color }}</div>
  <!-- <div>{{ title }}</div> -->
</template>