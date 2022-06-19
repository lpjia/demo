import { ref } from "vue";

// 箭头函数只能这样写
export default () => {
  // 功能一
  const showDiv = ref(true)

  function show() {
    showDiv.value = true
  }

  function hide() {
    showDiv.value = false
  }

  return {
    showDiv,
    show,
    hide,
  }
}