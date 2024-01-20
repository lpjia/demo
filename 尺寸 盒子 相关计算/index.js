const doms = {
  devicePixelRatio: document.querySelector('#devicePixelRatio'),
  one: document.querySelector('.one'),
  one2: document.querySelector('.one2'),
  two: document.querySelector('.two'),
  two2: document.querySelector('.two2'),
  three: document.querySelector('.three'),
  three2: document.querySelector('.three2'),
  three3: document.querySelector('.three3'),
  four: document.querySelector('.four'),
  four2: document.querySelector('.four2'),
  four3: document.querySelector('.four3'),
}
console.log(
  'clientWidth offsetWidth scrollWidth',
  '\none:',
  doms.one.clientWidth,
  doms.one.offsetWidth,
  doms.one.scrollWidth,
  '\none2:',
  doms.one2.clientWidth,
  doms.one2.offsetWidth,
  doms.one2.scrollWidth,
  '\ntwo:',
  doms.two.clientWidth,
  doms.two.offsetWidth,
  doms.two.scrollWidth,
  '\ntwo2:',
  doms.two2.clientWidth,
  doms.two2.offsetWidth,
  doms.two2.scrollWidth,
  '\nthree:',
  doms.three.clientWidth,
  doms.three.offsetWidth,
  doms.three.scrollWidth,
  '\nthree2:',
  doms.three2.clientWidth,
  doms.three2.offsetWidth,
  doms.three2.scrollWidth,
  '\nthree3:',
  doms.three3.clientWidth,
  doms.three3.offsetWidth,
  doms.three3.scrollWidth,
)
const rect = doms.four.getBoundingClientRect()
const rect2 = doms.four2.getBoundingClientRect()
const rect3 = doms.four3.getBoundingClientRect()
console.log(
  'dom.getBoundingClientRect()',
  '\nfour:',
  rect.width,
  '\nfour2:',
  rect2.width,
  '\nfour3:',
  rect3.width,
)

function addGap() {
  doms.four3.style.margin = '30px'
}

doms.devicePixelRatio.textContent = `window.devicePixelRatio: ${window.devicePixelRatio}`

function getDomBorder(dom, isScroll) {
  /* 没有找到计算滚动条默认尺寸的api, 直接写死 17px
  三元表达式的运算优先级没有 - 高
  因为横向滚动条比较少出现, 所以用高度来计算, 宽度是一样的 */
  return (dom.offsetHeight - dom.clientHeight - (isScroll ? 17 : 0)) / 2
}