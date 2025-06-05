/* 一般优化思路 */
function createElement(item) {
  const types = ['ball', 'square', 'triangle', 'rectangle']
  if (!types.includes(item.type)) {
    throw new Error('Invalid type')
  }

  const div = document.createElement('div')
  div.className = `item ${item.type}`
  div.textContent = item.type
  return div
}