<script>
import Computed from './components/Computed.vue';
import Watcher from './components/Watcher.vue';

export default {
  name: 'ComputedWatch',
  components: {
    Computed,
    Watcher,
  },
};
</script>

<template>
  <div>
    <h3>计算属性 默认是 getter, 可以带实参, 语法不一样<br>
      也可以用 setter</h3>
    <Computed />

    <el-divider></el-divider>
    <h3>watch</h3>
    <Watcher />

    <!-- 下面还要增加关于 计算属性和监听器 -->
  </div>
</template>
