<template>
  <div class="grandson">
    <h5>孙子组件</h5>
    <span>{{ v }}</span>
    <p>{{ $parent }}</p>
    <p>{{ $attrs }}</p>
  </div>
</template>

<script setup lang='ts'>
import { inject, useAttrs } from 'vue';

const v = inject('fVal')

/* 主动暴露, 上级ref属性才能拿到这里的值 */
defineExpose({
  grandsonVal: v
})

const attrs = useAttrs()
console.log('attrs:', attrs)

</script>

<style scoped lang="scss">
.grandson {
  background-color: orange;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  margin-top: 10px;
}
</style>
