
const frameTime = 1000 / 60 // 每一帧的时长, 单位是ms

let left2 = jsq.offsetLeft // 初始位置
console.log('left2:', left2)

let timerId = setInterval(() => {
  // 计算每次(也就是每帧)的变化量还是按一秒60帧来算
  left2 += 620 / 10 / 60
  jsq.style.left = left2 + 'px'

  // 动画停止条件
  if (left2 >= 620) {
    clearInterval(timerId)
  }
}, frameTime)




/* window.requestAnimationFrame(fn)
它请求浏览器在下次重新绘制之前调用fn
在绘制下一帧前调用fn, 制作一帧动画

如果您想为另一帧制作动画，您的回调函数必须再次调用 requestAnimationFrame() 。 
requestAnimationFrame() 是一次性的。

常见的是60帧, 现在也有多的是120帧和144帧
60FPS的一帧是16.6毫秒

requestAnimationFrame() 返回一个数字, 类似setTimeout返回的
可用cancelAnimationFrame(rafId)来取消动画

requestAnimationFrame() 的回调执行时机是由浏览器控制的，因此你不能确定它何时会被调用，只能确定它会在下一次重绘之前被调用
占位 */


let left = raf.offsetLeft // 初始位置
function fn() {
  let rafId = null
  // 计算每次的变化量还是按一秒60帧来算
  left += 620 / 10 / 60
  raf.style.left = left + 'px'
  rafId = window.requestAnimationFrame(fn)

  // 动画停止条件
  if (left >= 620) {
    window.cancelAnimationFrame(rafId)
  }
}
// 启动
window.requestAnimationFrame(fn)