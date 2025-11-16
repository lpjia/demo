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