<template>
  <div>
    这是子组件props.num的值 {{ props.num }}, 可以不用声明props, 直接用num {{ num }}
  </div>
  <button @click="emit('zdy', '从子组件传过来的值')">按钮</button>
</template>

<script setup lang='ts'>
// 使用"基于类型的声明"
interface NumItf {
  num: number
}


/* 几种语法 */
// const props = defineProps(['num'])

// const props = defineProps<NumItf>()

// 可利用withDefaults宏来赋默认值
const props = withDefaults(defineProps<NumItf>(), {
  // num: 999 // 可直接写对应类型的值
  num: () => 999 // 也可以写函数, 更灵活
})

// const props = defineProps({
//   num: Number
// })

// const props = defineProps({
//   num: {
//     type: Number,
//     required: true,
//     default: 0
//   }
// })



/* 几种语法 */
interface OneItf {
  (e: 'zdy', val: string): void
}
// 子传父的时候需要先定义好这个方法
const emit = defineEmits<OneItf>()
// emit('zdy', 1)

// const emit = defineEmits(['zdy'])

// const emit = defineEmits({
//   zdy: (msg) => {
//     // 通过返回值为 `true` 还是为 `false` 来判断
//     // 验证是否通过
//     console.log(
//       msg
//     )
//     return true
//   }
// })

</script>

<style scoped lang="scss"></style>
