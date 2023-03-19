// 点击复制文本
// function clickForCopy() {
//   let domResult = document.querySelector('#new_time')
//   const url = domResult.innerHTML
//   let oInput = document.createElement('input')
//   oInput.value = url
//   document.body.appendChild(oInput)
//   oInput.select() // 选择对象;
//   document.execCommand('Copy') // 执行浏览器复制命令
//   this.$message({
//     message: '复制成功',
//     type: 'success'
//   })
//   oInput.remove()
// }
// 新方法, 兼容性还可以
async function clickForCopy() {
  let domResult = document.querySelector('#new_time')
  await navigator.clipboard.writeText(domResult.innerHTML) // 就是这行代码
  let domTip = document.querySelector('#tip')
  domTip.innerHTML = `(复制成功)`
  setTimeout(() => {
    domTip.innerHTML = ''
  }, 2000);
}

async function copyByClick() {
  await navigator.clipboard.writeText(domResult.innerHTML)
}