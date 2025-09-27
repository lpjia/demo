<template>
  <div>
    这是home页面, 路径是{{ $route.path }}, 名字是{{ $route.name }}
  </div>
</template>

<script setup lang='ts'>
// import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

console.log('router:', router)
console.log('route:', route)

setTimeout(() => {
  // router.push('/about') // 编程式导航

  // router.push({ path: '/about' })

  router.push({ name: 'About' })

  /* 常用的属性名
  path
  name
  params
  query
  hash

  `params` 不能与 `path` 一起使用
  属性 to 与 router.push 接受的对象种类相同，所以两者的规则完全相同
  占位 */
}, 1000);

</script>

<style scoped lang="scss"></style>
