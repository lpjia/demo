function getRandomColor() {
  let str = Math.random().toString(16).substring(2, 8) // 有可能位数不够
  // 学会使用 while 循环, 很方便
  while (str.length < 6) {
    str += '0'
  }

  return '#' + str
}

function generateString(arr) {
  console.log(
    // arr[0],
  )
  let result = ''
  // 遍历字符串
  for (let i = 0; i < arr[0].length; i++) {
    const str = arr[0][i];
    const newStr = str.replaceAll('\n', '')
    result += newStr
    let idx = i + 1
    if (idx >= arr.length) break;
    result += arr[idx]
  }
  return result
}

const config = {
  url: 'xxx',
  text: '这是text',
}
const height = 60


HTMLElement.prototype.styles = function () {
  console.log(
    // arguments,
    // this,
    // this.getAttribute('style')
  )
  const styles = generateString(arguments)
  let currStyle = this.getAttribute('style')
  // console.log('currStyle:', currStyle)
  if (currStyle) {
    currStyle += styles
  }
  else {
    currStyle = styles
  }
  this.style = currStyle
  // console.log('currStyle:', currStyle)
  return this
}
HTMLElement.prototype.props = function () {
  const propsString = generateString(arguments)
  // console.log('propsString:', propsString)
  const props = propsString.replaceAll(' ', '').split(';')
  if (props[props.length - 1] === '') props.pop()
  // console.log('props:', props)
  for (const propStr of props) {
    const kvArr = propStr.split(':')
    // console.log(kvArr[0], kvArr[1])
    this.setAttribute(kvArr[0], kvArr[1])
  }
  return this
}
HTMLElement.prototype.content = function () {
  const cttString = generateString(arguments)
  this.textContent = cttString
  return this
}

// a.style.color = getRandomColor()

a.styles`
  color: ${getRandomColor()};
  background-color: ${getRandomColor()};
  text-decoration: none;
  height: ${height}px;
  line-height: ${height}px;
  font-size: ${height / 2}px;
`
  .props`
    href: ${config.url};
    target: _blank;
    title: ${config.text};
  `
  .content`跳转到: ${config.text}`


// a.style.color = getRandomColor()
// a.style.backgroundColor = getRandomColor()
// a.style.textDecoration = 'none'
// a.style.height = height + 'px'
// a.style.lineHeight = height + 'px'
// a.style.fontSize = height / 2 + 'px'
// a.href = config.url
// a.target = '_blank'
// a.title = config.text
// a.textContent = config.text