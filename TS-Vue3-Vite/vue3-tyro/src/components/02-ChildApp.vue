<template>
  <div>得到传入的属性: {{ count }}</div>
  <!-- <div>doubleCount: {{ doubleCount }}</div> -->

  <!-- render函数关联了
  props.count
  doubleCount.value -->
</template>

<script setup lang='ts'>
import { computed, ref, watchEffect } from "vue";

interface Props {
  count: number
}

// 不会报错, 正确推断类型
const props = defineProps<Props>()

// // 会提示波浪线, props.count需要加非空断言!
// const props = defineProps({
//   count: Number
// })
// const doubleCount = ref(props.count! * 2)



// 1
// const doubleCount = ref(props.count * 2)




// 2
// const doubleCount = ref(0)
// watchEffect(() => {
//   doubleCount.value = props.count * 2
// })




// 3
// function useDouble(count: number) {
//   const doubleCount = ref(count * 2)
//   watchEffect(() => {
//     doubleCount.value = count * 2
//   })
//   return doubleCount
// }
// const doubleCount = useDouble(props.count)




// 4
// const doubleCount = computed(() => props.count * 2)



// 5
// function useDouble(count: number) {
//   const doubleCount = computed(() => count * 2)
//   return doubleCount
// }
// const doubleCount = useDouble(props.count)



// 6
// function useDouble(props: Props, propName: keyof Props) {
//   const doubleCount = computed(() => props[propName] * 2)
//   return doubleCount
// }
// const doubleCount = useDouble(props, 'count')
</script>

<style scoped lang="scss"></style>
