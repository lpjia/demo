import { ref } from "vue";

export default function changeFontColor() {
  // 功能二
  const fontColor = ref('')
  function changeRed() {
    fontColor.value = 'red'
  }
  function changeYellow() {
    fontColor.value = 'blue'
  }

  return {
    fontColor,
    changeRed,
    changeYellow,
  }
}