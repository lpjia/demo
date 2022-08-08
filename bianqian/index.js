
function compare(a, b) {
  return a.localeCompare(b);
}

window.onload = function () {
  const dom = document.getElementById('sec')
    , dom_2 = document.getElementById('sec_2')
    , child = dom.children // 返回 类数组 HTMLCollection
    , arr = [...child] // 想调数组的方法得先转成数组
    , arr_2 = []
    , cacheArr = []
  for (const item of arr) {
    // arr_2.push(item.cloneNode(true)) // 实参要传 true, 否则只会克隆个 <p> 而没有内容, 因为内容也被视为节点信息
    const node = item.cloneNode(true)
    const word = node.innerHTML.split(' ')[0]

    /* 如果数组中包含该词, 那么直接 alert 该词, 
      不包含则继续 push, 遍历 */
    if (cacheArr.includes(word)){
      alert(node.innerHTML)
    } else {
      arr_2.push(node)
      cacheArr.push(word)
    }
  }
  arr_2.sort((a, b) => compare(a.innerHTML, b.innerHTML))

  dom_2.append(...arr_2)
}