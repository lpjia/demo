import { onMounted, onUnmounted, ref } from 'vue';

export default function useRightClickMenu(containerRef) {
  const showMenu = ref(false);
  const x = ref(0);
  const y = ref(0);

  function handleContextMenu(e) {
    e.preventDefault(); // 阻止默认行为, 浏览器自带有个右键菜单
    e.stopPropagation(); // 阻止冒泡, 否则嵌套组件时, 祖先级的菜单也会打开
    showMenu.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  }

  function closeMenu() {
    showMenu.value = false;
  }

  onMounted(() => {
    const div = containerRef.value;
    div.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', closeMenu, true);
    window.addEventListener('contextmenu', closeMenu, true);
  });

  onUnmounted(() => {
    const div = containerRef.value;
    div?.removeEventListener('contextmenu', handleContextMenu);
    window.removeEventListener('click', closeMenu, true);
    window.removeEventListener('contextmenu', closeMenu, true);
  });

  return { showMenu, x, y };
}
