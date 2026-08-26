<template>
  <div class="flex container" style="transform: scale(0.9)">
    <RightClickMenu
      class="block"
      :menu="[{ label: '添加' }, { label: '编辑' }, { label: '删除' }, { label: '查看' }, { label: '复制' }]"
      @select="choose = $event.label"
    >
      <div class="one">{{ choose }}</div>
    </RightClickMenu>
    <RightClickMenu
      class="block"
      :menu="[{ label: '员工' }, { label: '部门' }, { label: '角色' }, { label: '权限' }, { label: '菜单' }]"
      @select="choose2 = $event.label"
    >
      <div class="two">{{ choose2 }}</div>
      <RightClickMenu
        class="block"
        :menu="[{ label: '菜单1' }, { label: '菜单2' }, { label: '菜单3' }]"
        @select="choose3 = $event.label"
      >
        <div class="three">{{ choose3 }}</div>
      </RightClickMenu>
    </RightClickMenu>
  </div>
</template>

<script setup>
import RightClickMenu from './components/RightClickMenu/index.vue';
import { ref } from 'vue';

const choose = ref('');
const choose2 = ref('');
const choose3 = ref('');
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  font-size: 2rem;
}

.block {
  flex: 1;
  min-width: 0;
}

.one {
  width: 100%;
  height: var(--base);
  background-color: #f45f7c;
}

.two {
  width: 100%;
  height: var(--base);
  background-color: #ffd00d;
  position: relative;
}

.three {
  width: 30%;
  height: calc(var(--base) / 2);
  background-color: #4ba946;
  position: absolute;
  bottom: 30px;
  right: 30px;
}
</style>
