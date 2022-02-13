import { ref } from "vue";

export default function showOrHide() {
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