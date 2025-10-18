<template>
  <el-rate v-model="rateVal" @change="changeVal" :max="total" />
</template>

<script setup lang='ts'>
const rateVal = ref(null)

// defineProps<{
//   total: number
// }>()

defineProps(['total'])

// const emit = defineEmits<{
//   (e: 'zdy', value: number): void
// }>()

const emit = defineEmits(['zdy'])



function changeVal(val: number) {
  emit('zdy', val)
  // console.log(
  //   val,
  // )
}

</script>

<style scoped lang="scss">
.gen_node {
  background-color: deepskyblue;
}
</style>
