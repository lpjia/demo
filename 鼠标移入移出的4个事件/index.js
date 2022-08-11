const maopao = ['mouseover', 'mouseout']

function callback(e) {
  let msg = maopao.includes(e.type) ? '冒泡事件' : ''
  console.log(e.target.id, e.type, msg)
}

// box.onmouseover = callback
// box.onmouseout = callback

// box.onmouseenter = callback
box.onmouseleave = callback

