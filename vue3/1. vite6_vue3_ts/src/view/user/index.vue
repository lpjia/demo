<template>
  <div>
    <p>这是user页面, 路径是{{ $route.path }}, 名字是{{ $route.name }}, 路径参数是{{ $route.params.id }}</p>
    <p>username是{{ userData }}</p>

    <p>嵌套了子路由</p>
    <!-- 命名路由, 好匹配, 非硬编码, 命名必须唯一 -->
    <RouterLink :to="{ name: 'UserProfile' }">profile</RouterLink>
    <br>
    <RouterLink :to="{ name: 'UserPost' }">post</RouterLink>
    <RouterView />
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const userData = ref<string | string[]>('')
const route = useRoute()

/* 一般是用不同的数据id来获取数据, 加载同一个组件
  共用组件默认不执行重新挂载或卸载
  强制重新挂载
占位 */
onBeforeRouteUpdate(async (to, from) => {
  // 对路由变化做出响应...
  // userData.value = await fetchUser(to.params.id)
  userData.value = to.params.id

  console.log('from:', from)
})

// watch(() => route.params.id, (newId, oldId) => {
//   // 对路由变化做出响应...
//   console.log('newId:', newId)
//   console.log('oldId:', oldId)
// })

</script>

<style scoped lang="scss"></style>
