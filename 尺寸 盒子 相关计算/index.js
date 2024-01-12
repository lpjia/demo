doms = {
  one: document.querySelector('.one'),
  one2: document.querySelector('.one2'),
  two: document.querySelector('.two'),
  two2: document.querySelector('.two2'),
  three: document.querySelector('.three'),
  three2: document.querySelector('.three2'),
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