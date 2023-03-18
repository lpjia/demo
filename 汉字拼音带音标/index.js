window.onload = function () {
  const dom = document.querySelector('#tv_name')
  const list = dom.children
  for (const item of list) {
    console.log(
      pinyinUtil.getPinyin(item.innerHTML, ' ', true, true)
    )
  }
}