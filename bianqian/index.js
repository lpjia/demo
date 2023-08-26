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



const doms = {
  domHour: document.querySelector('#hour'),
  domMinute: document.querySelector('#minute'),
  domResult: document.querySelector('#new_time'),
  domTip: document.querySelector('#tip'),

  hour: document.querySelector('#hour2'),
  minute: document.querySelector('#minute2'),
  result: document.querySelector('#new_time2'),
  tip: document.querySelector('#tip2'),
}


function clearInput2() {
  doms.hour.value = ''
  doms.minute.value = ''
  doms.result.innerHTML = ''
  doms.tip.innerHTML = ``
  doms.hour.focus()
}
// 需求是: 输入一个时间, 计算出剩余时间(分钟)
function calcRemainingTime(speed) {
  if (!doms.hour.value) {
    alert('请输入hour')
    return;
  }
  let rawMinute = Number(doms.hour.value) * 60 + (doms.minute.value ? Number(doms.minute.value) : 0)
  doms.result.textContent = `${Math.floor(rawMinute / speed)}分钟`
}


// 需求是: 输入一个时间后, 计算得到几小时的时间, 精确到分
function clearInput() {
  doms.domHour.value = ''
  doms.domMinute.value = ''
  doms.domResult.innerHTML = ''
  doms.domTip.innerHTML = ``
  doms.domHour.focus()
}
function calcNextTime() {
  if (!doms.domHour.value) {
    alert('请输入hour')
    return;
  }
  // let currTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  let currTime = new Date().getTime()
  // 小时必须要输入, 否则还得区分用户输入是否有问题
  let result = currTime + (Number(doms.domHour.value) * 60 + (doms.domMinute.value ? Number(doms.domMinute.value) : 0)) * 60 * 1000
  // doms.domResult.innerHTML = dayjs(result).format('DD号HH:mm')
  doms.domResult.textContent = dayjs(result).format('DD号HH:mm')
}



/* 新方法, 兼容性还可以 */
async function clickForCopy() {
  // let domResult = document.querySelector('#new_time')
  await navigator.clipboard.writeText(doms.domResult.innerHTML) // 就是这行代码
  // let domTip = document.querySelector('#tip')
  doms.domTip.innerHTML = `(复制成功)`
  setTimeout(() => {
    doms.domTip.innerHTML = ''
  }, 2000);
}