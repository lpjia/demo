function compare(a, b) {
  return a.localeCompare(b);
}

window.onload = function () {
  const domSortBefore = document.getElementById('dom_sort_before')
    , domSortAfter = document.getElementById('dom_sort_after')
    , child = domSortBefore.children // 返回 类数组 HTMLCollection
    , arrDomSortBefore = [...child] // 想调数组的方法得先转成数组
    , arrDomSortAfter = []
    , arrUniqueWords = []
  for (const item of arrDomSortBefore) {
    // arrDomSortAfter.push(item.cloneNode(true)) // 实参要传 true, 否则只会克隆个 <p> 而没有内容, 因为内容也被视为节点信息
    const node = item.cloneNode(true)
    const word = node.innerHTML.split(' ')[0]

    /* 如果数组中包含该词, 那么直接 alert 该词, 
      不包含则继续 push, 遍历 */
    if (arrUniqueWords.includes(word)) {
      alert(node.innerHTML)
    } else {
      arrDomSortAfter.push(node)
      arrUniqueWords.push(word)
    }
  }
  arrDomSortAfter.sort((a, b) => compare(a.innerHTML, b.innerHTML))

  domSortAfter.append(...arrDomSortAfter)
}



// // 自制小工具
// document.querySelector('#dplayed_content')
// const dom_a = document.createElement('a');
// document.body.appendChild(dom_a);
// dom_a.href = '#dplayed_content';
// dom_a.click();
// document.body.removeChild(dom_a);

// javascript: var dom_a = document.createElement('a'); document.body.appendChild(dom_a); dom_a.href = '#dplayed_content'; dom_a.click(); document.body.removeChild(dom_a);



// 需求是
// 输入一个时间后, 计算得到几小时的时间, 精确到分
function clearInput() {
  let domHour = document.querySelector('#hour')
  let domMinute = document.querySelector('#minute')
  let domResult = document.querySelector('#new_time')
  let domTip = document.querySelector('#tip')

  domHour.value = ''
  domMinute.value = ''
  domResult.innerHTML = ''
  domTip.innerHTML = ``

  domHour.focus()
}
function calcNextTime() {
  let domHour = document.querySelector('#hour')
  let domMinute = document.querySelector('#minute')
  let domResult = document.querySelector('#new_time')
  if (!domHour.value) return
  // let currTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  let currTime = new Date().getTime()
  let result = currTime + (Number(domHour.value) * 60 + (domMinute.value ? Number(domMinute.value) : 0)) * 60 * 1000
  domResult.innerHTML = dayjs(result).format('DD号HH:mm')
}




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