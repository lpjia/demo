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

<script>
export default {
  name: 'BaseLayout',
};
</script>
