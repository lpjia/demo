<template>
  <div class="child">
    <h4>子组件</h4>
    <span>{{ appValue }}</span>
    <p>{{ a }}</p>
    <GrandsonApp ref="comp" v-bind="$attrs" />

    <!-- 一直报错 -->
    <!-- <div style="margin-top: 10px;">{{ comp.grandsonVal }}</div> -->

    <!-- this.$refs 也是非响应式的，因此你不应该尝试在模板中使用它来进行数据绑定 -->
    <p>{{ $refs }}</p>
  </div>
</template>

<script setup lang='ts'>
import { inject, onMounted, ref } from 'vue';
import GrandsonApp from './16-GrandsonApp.vue'

defineProps(['a'])

const appValue = inject('appVal')

/* 主动暴露, 下级$parent才能拿到这里的值 */
defineExpose({
  childVal: appValue
})
const comp = ref()
onMounted(() => {
  // 在组件挂载后才能访问到值
  console.log('comp:', comp.value.grandsonVal)
})
</script>

<style scoped lang="scss">
.child {
  background-color: deepskyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  margin-top: 10px;
}
</style>
