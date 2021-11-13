$(function () {



  // 使用 data-xxx 属性(全称)
  // getAttribute 获取属性
  let dom = document.querySelector('#id')
  let val = dom.getAttribute("data-blah")
  console.log('val: ', val)

  // appendChild
  let el = document.createElement('p')
  let txt = document.createTextNode('用原生 js 加的新节点, appendChild 方法')
  el.appendChild(txt)
  let dom2 = document.querySelector('.up_down')
  dom2.appendChild(el)

  // inserBefore
  let el2 = document.createElement('p')
  let txt2 = document.createTextNode('用原生 js 加的新节点, insertBefore 方法')
  el2.appendChild(txt2)
  dom2.insertBefore(el2, dom)





  // 使用 xxx 属性
  // dataset 获取属性
  let val2 = dom.dataset.blah
  console.log('val2: ', val2)

  // dataset 给属性赋值
  dom.dataset.blah = '已被 dataset 修改'
  let val3 = dom.dataset['blah']
  console.log('val3: ', val3)






  // setAttribute 给属性赋值
  // 标签属性不区分大小写, 一律按小写来
  dom.setAttribute('data-appId', 'id 是 1')
  // 取不到该属性
  let val4 = dom.dataset.appId
  console.log('val4: ', val4)

  // 这就取到了
  let val5 = dom.dataset.appid
  console.log('val5: ', val5)






  // 使用 dataset.xxXx 等对象属性形式时, 用 xxx-xxx 属性就会报错
  // 标签上渲染的是 data-app-name
  dom.dataset.appName = '不知该叫啥名字'
  // 取不到
  let val6 = dom.dataset['app-name']
  console.log('val6: ', val6)

  let val7 = dom.dataset['appName']
  console.log('val7: ', val7)

  // dom.dataset['app-type'] = '不知什么类型' // 报错
  dom.dataset['appType'] = '不知什么类型'
  let val8 = dom.dataset.appType
  console.log('val8: ', val8)

  // 下划线
  dom.dataset.app_age = '不知多大了'
  let val9 = dom.dataset.app_age
  console.log('val9: ', val9)

  // 驼峰是硬转 -x
  dom.dataset.App = 'App 啊'
  let val10 = dom.dataset.App
  console.log('val10: ', val10)

  // dataset 比较苛刻, 还是取不到
  let val11 = dom.dataset['-app']
  console.log('val11: ', val11)






  // 使用 jQ
  // 上面原生搞的属性, 在 html 上都能直接看到
  let val12 = $('#id').data('blah')
  console.log('val12: ', val12)

  $('#id').data('blah', '已被 $().data() 修改')
  // $().data() 改不了已渲染到 html 的 data-xxx 的值
  let val13 = dom.dataset.blah
  console.log('val13: ', val13)

  // 靠 $().attr() 来改
  $('#id').attr('data-blah', '已被 $().attr() 修改')
  let val14 = dom.dataset.blah
  console.log('val14: ', val14)

  let val15 = $('#id').attr('data-blah')
  console.log('val15: ', val15)






  // $().data() 可以
  $('#id').data('noshow', '不会渲染在 html 中')
  let val16 = $('#id').data('noshow')
  console.log('val16: ', val16)



})