/* 打印的数字就是触发顺序 */

/* load 事件在整个页面及所有依赖资源如样式表和图片都已完成加载时触发。 */
window.onload = function () {
  console.log('onload 444')
  // 一般不用实参e
}
// document.addEventListener('load', (e) => {})


/* 这俩是一样的, 推荐用简写 */
/* 在DOM载入就绪能够读取并操纵时立即调用你所绑定的函数，而99.99%的JavaScript函数都需要在那一刻执行。 */
$(function () {
  console.log('$$$ 333 简写')
})
$(document).ready(function () {
  console.log('ready 333')
})


/* 当dom被完全加载以及解析时，DOMContentLoaded 事件会被触发，而不必等待样式表，图片或者子框架完成加载。 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded 222')
});


console.log('同步 111')