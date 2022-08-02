
function compare(a, b) {
  return a.localeCompare(b);
}

window.onload = function () {
  let dom = document.getElementById('sec')
    , dom_2 = document.getElementById('sec_2')
    , child = dom.children // 返回 类数组 HTMLCollection
    , arr = [...child] // 想调数组的方法得先转成数组
    , arr_2 = []
  for (const item of arr) {
    arr_2.push(item.cloneNode(true)) // 实参要传 true, 否则只会克隆个 <p> 而没有内容, 因为内容也被视为节点信息
  }
  arr_2.sort((a, b) => compare(a.innerHTML, b.innerHTML))

  dom_2.append(...arr_2)
}