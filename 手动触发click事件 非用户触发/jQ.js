function handleClick_1(e) {
  console.log(e.target)

  /* 第三种, $().trigger('click') */
  $('.btn2').trigger('click')

  /* 还有个.triggerHandler('click')
  不冒泡
  不会触发浏览器的默认行为 */
}

function handleClick_2(e) {
  console.log(
    null,
    '触发了按钮2绑定的事件'
    , e.target
  )
}

$('.btn1').click(handleClick_1)
$('.btn2').click(handleClick_2)