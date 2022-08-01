<script>
import AllWatchSyntax from './components/AllWatchSyntax.vue';
import Computed from './components/Computed.vue';
import Watcher from './components/Watcher.vue';

export default {
  name: 'ComputedWatch',
  components: {
    Computed,
    Watcher,
    AllWatchSyntax,
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
    <AllWatchSyntax />
    <p>----分割线----</p>
    <Watcher />
  </div>
</template>
