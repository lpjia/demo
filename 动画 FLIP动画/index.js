/* 外层 requestAnimationFrame 会在下一帧执行其回调。
内层 requestAnimationFrame 会再延迟一帧执行 callback。
最终效果‌：callback 会在 ‌两帧后‌ 执行，而不是立即执行。

可用于确保某些操作（如 DOM 更新）在浏览器完成布局计算后再执行。

function raf(callback) {
  window.requestAnimationFrame(callback); // 直接单帧延迟
}
占位 */
function raf(callback) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback)
  })
}

const doms = {
  btn: document.querySelector('button'),
  list: document.querySelector('.list'),
  firstItem: document.querySelector('.item:first-child'),
  lastItem: document.querySelector('.item:last-child'),
}

function getLocation() {
  const rect = doms.firstItem.getBoundingClientRect()
  return rect.top
}

const start = getLocation()
console.log('First:', start)

function delay(duration) {
  var start = Date.now()
  while (Date.now() - start < duration) { }
}

doms.btn.onclick = () => {
  // doms.list.appendChild(doms.firstItem)
  // doms.list.insertBefore(doms.firstItem, null)
  doms.list.insertBefore(doms.firstItem, doms.lastItem)
  const end = getLocation()
  console.log('Last:', end)
  // delay(2000)
  const distance = start - end
  doms.firstItem.style.transform = `translateY(${distance}px)`
  console.log('Invert:', distance)
  raf(() => {
    doms.firstItem.style.transition = 'transform 1s'
    doms.firstItem.style.removeProperty('transform')
    console.log('play')
  })
}