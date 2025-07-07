// 这里要加上获取窗口的高度, 以便来比对 vh
// 应该家里电脑上有一个 demo 是关于这的
console.log('浏览器窗口可视区域的高度:', window.innerHeight + 'px')





const dom = document.querySelector('.jsop')
dom.onclick = (e) => {
  /* 非内联样式, 获取css变量的值, 推荐
  获取任意的dom都行 */
  const cssVar = getComputedStyle(e.target).getPropertyValue('--rotate-2')
  console.log(
    cssVar
  )
  const newCssVar = +cssVar.substring(0, cssVar.length - 3) + 90
  e.target.style.setProperty('--rotate-2', newCssVar + 'deg')
}