/* 多条分支, 冗余代码很多 */
function createElement(item) {
  if (item.type === 'ball') {
    const div = document.createElement('div')
    div.className = 'item ball'
    div.textContent = 'ball'
    return div
  }
  else if (item.type === 'square') {
    const div = document.createElement('div')
    div.className = 'item square'
    div.textContent = 'square'
    return div
  }
  else if (item.type === 'triangle') {
    const div = document.createElement('div')
    div.className = 'item triangle'
    div.textContent = 'triangle'
    return div
  }
  else if (item.type === 'rectangle') {
    const div = document.createElement('div')
    div.className = 'item rectangle'
    div.textContent = 'rectangle'
    return div
  }
  else {
    throw new Error('Invalid type')
  }
}