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