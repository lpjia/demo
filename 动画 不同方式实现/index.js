
const frame = 1000 / 60
let l = jsq.offsetLeft
console.log('l:', l)
let count = 0
let timerId = setInterval(() => {
  count++
  l += 620 / 10 / 60
  jsq.style.left = l + 'px'
  if (count === 1) {
    console.log(jsq.offsetLeft)
  }
  if (l >= 620) {
    clearInterval(timerId)
  }
}, frame)






let left = raf.offsetLeft
function fn() {
  let rafId = null
  // 计算每次的变化量还是按一秒60帧来算
  left += 620 / 10 / 60
  raf.style.left = left + 'px'
  rafId = window.requestAnimationFrame(fn)
  if (left >= 620) {
    cancelAnimationFrame(rafId)
  }
}
// 启动
window.requestAnimationFrame(fn)