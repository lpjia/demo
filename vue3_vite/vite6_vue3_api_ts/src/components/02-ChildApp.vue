<template>
  <p>子组件: 得到传入的属性: {{ count }}、{{ cNumVal }}</p>
  <p>doubleCount: {{ doubleCount }}</p>

  <!-- render函数关联了
  props.count
  doubleCount.value -->
</template>

<script setup lang='ts'>
import { computed, ref, watchEffect } from "vue";

// /* defineProps 全局宏, 不需要显式声明 */
// defineProps(['count', 'cNumVal'])



// // 后面的1 2 3 4, 类型推断有问题
// const props = defineProps({
//   count: Number, // 不能用number, 这里是值, 不是类型
//   cNumVal: Number,
// })
// /* props.count需要加非空断言!, 否则会提示波浪线报错
// doubleCount不能响应式变化, 只最初计算了一次 */
// const doubleCount = ref(props.count! * 2) // 看下面的1, 会提示波浪线, 就是类型推断有问题



interface Props {
  count: number;
  cNumVal: number;
}

// 后面的1 2 3 4, 正确推断类型
const props = defineProps<Props>()


// 1
// const doubleCount = ref(props.count * 2)




// 2
// const doubleCount = ref(0)
// watchEffect(() => {
//   doubleCount.value = props.count * 2
// })

// /* 自己加的 */
// let doubleCount: unknown
// watchEffect(() => {
//   doubleCount = ref(props.count * 2)
// })

// /* 自己加的 */
// let doubleCount: unknown // 非响应式数据, 是组件顶层的变量
// /* 当template模板中直接使用 doubleCount 时，Vue 的模板编译会自动追踪这个变量的使用，并在它被 watchEffect 更新时触发重新渲染 */
// watchEffect(() => {
//   doubleCount = props.count * 2
// })




// 3
// function useDouble(count: number) { // count是独立的局部变量, 是个原始值, 不是响应式数据
//   const doubleCount = ref(count * 2) // 响应式数据
//   watchEffect(() => {
//     doubleCount.value = count * 2 // count是非响应式数据, 所以函数没有重新运行, doubleCount.value没有改变
//   })
//   return doubleCount // 响应式数据
// }
// const doubleCount = useDouble(props.count) // 调用useDouble时, 传递的是当前时刻的值, 复制给了count局部变量

// /* 自己加的 */
// function useDouble(props: Props) {
//   let doubleCount: unknown // 非响应式数据
//   watchEffect(() => {
//     doubleCount = props.count * 2
//   })
//   return doubleCount // 非响应式数据
// }
// const doubleCount = useDouble(props)

// /* 自己加的 */
// function useDouble(props: Props) {
//   const doubleCount = ref(0) // 响应式数据
//   watchEffect(() => {
//     doubleCount.value = props.count * 2
//   })
//   return doubleCount // 响应式数据
// }
// const doubleCount = useDouble(props)



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
