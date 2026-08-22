<template>
  <div>
    <p>这是学习pinia页面, 路径是{{ $route.path }}, 名字是{{ $route.name }}</p>
    <button @click="add">解构的count: {{ count }}</button>
    <button @click="$reset" style="margin-left: 10px;">重置count</button>
    <hr>
    <!-- 直接用counterStore.count, 不用解构 -->
    <button @click="counterStore.add">store.count: {{ counterStore.count }}</button>
    <button @click="counterStore.$reset" style="margin-left: 10px;">重置count</button>
    <hr>
    <!-- 直接操作state -->
    <button @click="counterStore.count++">store.count: {{ counterStore.count }}</button>
    <button @click="counterStore.count = 0" style="margin-left: 10px;">重置count</button>
    <hr>
  </div>
</template>

<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/counter';

const counterStore = useCounterStore()
/* 解构保持响应式, 只解构响应式state, storeToRefs从名字得知解构后的变量是Ref类型 */
const { count } = storeToRefs(counterStore)
const { add, $reset } = counterStore // 方法直接从store实例获取

/* 批量更新数据用 $patch */
// counterStore.$patch({
//   aaa:'111',
//   bbb:'222',
//   ccc:'333'
// })
/* 或者处理复杂点的数据 */
// counterStore.$patch((state) => {
//   state.items.push({ name: 'shoes', quantity: 1 })
//   state.hasChanged = true
// })

</script>

<style scoped lang="scss"></style>
