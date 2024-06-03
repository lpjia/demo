document.addEventListener('DOMContentLoaded', () => {
  const doms = {
    colMenu: document.querySelector('#menu'), // 竖型导航
    rowMenu: document.querySelector('.oneLevel'), // 横型导航
    // jsqMenu: document.querySelector('#nav'),
    nav: document.querySelector('#nav'),
  }

  doms.colMenu.addEventListener('click', (e) => {
    // console.log('e.target:', e.target)
    let node = e.target.parentNode.querySelector('ul')
    // console.log('node:', node)
    if (node) return;
    console.log(e.target.innerText) // 用来代替点击菜单跳转页面
  })

  doms.rowMenu.addEventListener('click', (e) => {
    let node = e.target.parentNode.querySelector('ul')
    if (node) return;
    let txt = e.target.innerText
    txt && console.log(txt) // 尝试换了个写法
  })

});


$(function () {
  $("#nav>li").has('ul').hover(
    function () {
      $(this).find('ul').slideDown(200);
    },
    function () {
      $(this).find('.companyIntroduceUrl').slideUp(200);
    }
  )

  /* 目标: 使用jQ来实现上拉下拉菜单效果, 加上动画
  结合hover方法和slideDown、slideUp方法
  
  还得有点击菜单跳转功能(目前以打印菜单名来模拟)
  分一级和二级, 有二级的一级菜单不用跳转 */

  const li = $("#nav>li") // 一级菜单

  /* 先找到不包含有后代元素ul的li, 给其后代元素a绑定click事件 */
  /* 可跳转的一级菜单 */
  li.filter(function () {
    return !$(this).has('ul').length
  })
    .on('click', 'a', jumpPage)
  /* 再找到包含有后代元素ul的li, 给其后代元素ul的后代元素a绑定click事件 */
  /* 可跳转的二级菜单 */
  li.has('ul').find('ul').on('click', 'a', jumpPage)

  function jumpPage() {
    console.log(
      $(this).text()
    )
  }
})