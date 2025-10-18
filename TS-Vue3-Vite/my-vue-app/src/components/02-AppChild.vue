<template>
  <!-- 评分组件 -->
  <el-rate v-model="rateVal" @change="changeVal" :max="total" />
</template>

<script setup lang='ts'>
const rateVal = ref(null)

defineProps(['total'])

function changeVal(val: number) {
  emit('update:val', val)
}

/* v-model 语法 */
const emit = defineEmits(['update:val'])
</script>

<style scoped lang="scss">
.gen_node {
  background-color: deepskyblue;
}
</style>
