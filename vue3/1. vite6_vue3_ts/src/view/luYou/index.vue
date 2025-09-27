<template>
  <nav>
    <!-- RouterLink组件是vue用来代替a元素, 是VueRouter内置组件
      to属性赋值字符串, 跳转
      active-class 表示激活的类样式, 定义好直接赋值, 切换时不需要自己写逻辑来处理样式变化
    占位 -->
    <RouterLink to="/">Go to Home</RouterLink>
    <br>
    <RouterLink to="/about" active-class="active">Go to About</RouterLink>
    <br>
    <RouterLink :to="{ path: '/user/one' }" active-class="active">Go to User One</RouterLink>
    <br>
    <RouterLink :to="{ path: '/user/two' }" active-class="active">Go to User Two</RouterLink>
    <!-- push方法和to属性是等价的, replace方法和replace属性是等价的 -->
    <br>
    <RouterLink :to="{ name: 'MouseXy' }" active-class="active">Go to MouseXy</RouterLink>
    <br>
    <RouterLink to="/pinia" active-class="active">Go to Pinia</RouterLink>
    <br>
    <RouterLink to="/kua_yu_proxy" active-class="active">Go to KuaYuProxy</RouterLink>
  </nav>
  <hr>
  <main>
    <!-- 路由视图, 路由组件在切换时会调生命周期钩子, 重新挂载或卸载 -->
    <RouterView />
  </main>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
nav {
  font-family: 微软雅黑;

  >a {
    display: block;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    letter-spacing: 5px;

    &.active {
      background-color: #64967e;
      color: #ffc268;
      text-shadow: 0 0 1px black;
    }
  }
}
</style>
