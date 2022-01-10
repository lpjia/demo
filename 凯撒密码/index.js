const ming = 'abcdefghijklmnopqrstuvwxyz'
const mi = 'nopqrstuvwxyzabcdefghijklm'

/**
 * rot13 加密解密
 * @param {string} str 
 * @returns {string}
 */
function rot13(str) {
  /**
   * 先循环字符串
   * 转为 unicode
   * 判断在不在需要处理的字符范围内, 在就进行移位, 不在就原地保留
   * 再把 unicode 转为字符
   */
  let arr = []
  for (let item of str) {
    let num = item.charCodeAt()
    if (num >= 97 && num <= 109)
      num = num + 13;
    else if (num > 109 && num <= 122)
      num = num - 13;
    arr.push(String.fromCharCode(num))
  }
  return arr.join('')
}


const inputDom = document.querySelector('#shu1ru4')
const pDom = document.querySelector('.inlineB')
// 失焦则转成密文
inputDom.onblur = e => {
  pDom.innerHTML = rot13(inputDom.value)
  // pDom.outerHTML = `<b>${rot13(inputDom.value)}</b>`
}


function jujiao() {
  // 触发聚焦事件
  inputDom.focus()
}


function clearInput() {
  inputDom.value = ''
  pDom.innerHTML = ''
}