/* 每次执行该函数, 都要进行判断, 其实没必要
因为一开始的执行环境就确定下来了, 所以可以用闭包来优化性能 */
// function copyText(text) {
//   if (navigator.clipboard) {
//     navigator.clipboard.writeText(text)
//   }
//   else {
//     const input = document.createElement('input')
//     input.setAttribute('value', text)
//     document.body.appendChild(input)
//     input.select()
//     document.execCommand('copy')
//     document.body.removeChild(input)
//   }
// }


/* 利用立即执行函数, 一开始需要的时间多 */
// const copyText = (function () {
//   if (navigator.clipboard) {
//     return (text) => {
//       navigator.clipboard.writeText(text)
//     }
//   }
//   else {
//     return (text) => {
//       const input = document.createElement('input')
//       input.setAttribute('value', text)
//       document.body.appendChild(input)
//       input.select()
//       document.execCommand('copy')
//       document.body.removeChild(input)
//     }
//   }
// })()


/* 推荐
跟执行环境有关的判断都可以用惰性函数来提高性能 */
function createCopyText() {
  if (navigator.clipboard) {
    return (text) => {
      navigator.clipboard.writeText(text)
    }
  }
  else {
    return (text) => {
      const input = document.createElement('input')
      input.setAttribute('value', text)
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
  }
}

const copyText = createCopyText()
copyText('xxx')