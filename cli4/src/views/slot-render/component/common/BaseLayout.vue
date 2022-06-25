<template functional>
  <div class="container">
    <header>
      header: <slot name="header"></slot>
    </header>
    <main>
      main: <slot></slot>
    </main>
    <footer>
      footer: <slot name="footer"></slot>
    </footer>
    <el-divider></el-divider>
  </div>
</template>

// <script>
export default {
  name: 'BaseLayout',
};
</script>

<style lang="scss" scope>
// 这里用 <style> 是为了注释 <script>

// 使用 <template functional> 就可以不用 export default
// 写下面的代码也没有问题, 为了减少记忆, 统一加 export default
// <script>
// export default {
//   name: 'BaseLayout',
// };
// </script>
</style>