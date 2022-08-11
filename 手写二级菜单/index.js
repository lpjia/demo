// const doms = document.querySelectorAll('#menu>ul>li')
//   , dsq = null

// function callbackIn(e) {
//   let sub_url = this.getElementsByTagName("ul")
//   if (sub_url.length) sub_url[0].style.display = "block";
//   // clearTimeout(dsq)
// }

// function callbackOut(e) {
//   let sub_url = this.getElementsByTagName("ul")
//   if (sub_url.length) sub_url[0].style.display = "none";
// }

// 给每一个 li 绑定事件
// for (const dom of doms) {
//   // dom.addEventListener('mouseover', callbackIn)
//   // dom.addEventListener('mouseout', callbackOut)
//   dom.addEventListener('mouseenter', callbackIn)
//   dom.addEventListener('mouseleave', callbackOut)
// }







function onOver(obj) {
  const sub_url = obj.getElementsByTagName("ul")
  sub_url[0].style.display = "block";
}
function onOut(obj) {
  const sub_url = obj.getElementsByTagName("ul")
  sub_url[0].style.display = "none";
}