const doms = {
  btn1: document.querySelector('.btn1'),
  btn2: document.querySelector('.btn2')
}

function handleClick_1(e) {
  console.log(e.target)

  /* 第一种, dom.click() */
  // doms.btn2.click()


  /* 第二种, dom.dispatchEvent(new Event('click')) */
  doms.btn2.dispatchEvent(new Event('click'))
}

function handleClick_2(e) {
  console.log(
    null,
    '触发了按钮2绑定的事件'
    , e.target
  )
}

doms.btn1.addEventListener('click', handleClick_1)
doms.btn2.addEventListener('click', handleClick_2)