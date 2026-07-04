<template>
  <div>
    <ElForm ref="formRef">
      <ElInput></ElInput>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElInput } from 'element-plus';
import { useCompRef } from './useCompRef';


// /* 封装成通用工具 */
// const formRef = ref<InstanceType<typeof ElForm>>()
// formRef.value?.validate()


// // 初次封装
// const formRef = useCompRef<typeof ElForm>()
// formRef.value?.validate()


// 优化重构
// const formRef = useCompRef<ElForm>() // 泛型需要传入"类型", ElForm是值, 不是"类型"
// // 所以不能在泛型里传, 得传实参


const formRef = useCompRef(ElForm)
formRef.value?.validate()


</script>

<style scoped></style>
