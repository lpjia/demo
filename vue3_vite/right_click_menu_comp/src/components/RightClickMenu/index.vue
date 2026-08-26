<template>
  <div ref="containerRef">
    <slot></slot>
    <Teleport to="body">
      <Transition @beforeEnter="handleBeforeEnter" @enter="handleEnter" @afterEnter="handleAfterEnter">
        <div
          v-if="showMenu"
          class="context-menu"
          :style="{
            left: x + 'px',
            top: y + 'px'
          }"
        >
          <div class="menu-list">
            <div class="menu-item" v-for="(item, i) in menu" :key="item.label" @click="handleClick(item)">
              {{ item.label }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue';
import useRightClickMenu from './useRightClickMenu.js';

const props = defineProps({
  menu: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['select']);

const containerRef = useTemplateRef('containerRef');

const { x, y, showMenu } = useRightClickMenu(containerRef);

function handleClick(item) {
  showMenu.value = false;
  emit('select', item);
}

function handleBeforeEnter(el) {
  el.style.height = 0;
}

function handleEnter(el) {
  el.style.height = 'auto';
  const h = el.clientHeight; // 先变为auto, 算出那个高度值
  el.style.height = 0; // 再从0变成那个高度值, 应用动画
  // 双层 requestAnimationFrame, 跳过浏览器同一帧合并渲染，保证上面 `height:0` 生效后，下一帧再赋值目标高度，触发过渡动画
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.height = h + 'px';
      el.style.transition = '0.5s';
    });
  });
}

function handleAfterEnter(el) {
  el.style.transition = 'none';
}
</script>

<style scoped>
.context-menu {
  position: fixed;
  min-width: 140px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  padding: 4px 0;
  overflow: hidden;
}
.menu-list {
  display: flex;
  flex-direction: column;
}
.menu-item {
  padding: 6px 16px;
  cursor: pointer;
  font-size: 14px;
}
.menu-item:hover {
  background-color: deepskyblue;
  color: #fff;
}
</style>
