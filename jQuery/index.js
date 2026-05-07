/* 打印的数字就是触发顺序
  在不同版本的浏览器, 触发顺序有差别, 建议在不同版本的浏览器分别运行看看
占位 */


/* 还有这种写法, 和window.onload触发顺序差不多, 谁在前先触发 */
$(window).on("load", function (e) {
  console.log('$(window).on("load":', e)
})
/* load 事件在整个页面及所有依赖资源如样式表和图片都已完成加载时触发。 */
window.onload = function (e) {
  // console.log('onload 444')
  console.log('onload:', e)
}


/* 这俩是一样的, 推荐用简写 */
/* 在DOM载入就绪能够读取并操纵时立即调用你所绑定的函数，而99.99%的JavaScript函数都需要在那一刻执行。 */
$(function () {
  // console.log('$$$ 333 简写')
  console.log('$$$ 简写')
  // 有在function($)传参, 其实和外面的$是同一个东西, 建议省略传参
})
/* jQuery3.0版本已废除该写法, 推荐 jQuery(function() { }) */
/* $(document).ready(function () {
  console.log('ready 333')
}) */


/* 当dom被完全加载以及解析时，DOMContentLoaded 事件会被触发，而不必等待样式表，图片或者子框架完成加载。 */
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOMContentLoaded 222:', e)
});


console.log('同步 111')