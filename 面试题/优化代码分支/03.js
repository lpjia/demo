/* 高扩展性优化 更通用 */
const config = {
  ball: {
    className: 'c-b',
    content: '小球',
    onclick: function () { // 还可以加事件
      console.log('ball')
    }
  },
  square: {
    className: 'c-s',
    content: '正方形',
    onclick: function () {
      console.log('square')
    }
  },
  triangle: {
    className: 'c-t',
    content: '三角形',
    onclick: function () {
      console.log('triangle')
    }
  },
}

function createElement(item) {
  if (!config[item.type]) {
    throw new Error('Invalid type')
  }
  const itemConfig = config[item.type]
  const div = document.createElement('div')
  div.className = `item ${itemConfig.className}`
  div.textContent = itemConfig.content
  div.onclick = itemConfig.onclick
  return div
}

