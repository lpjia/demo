const doms = {
  id: document.querySelector('#id'),
  ud: document.querySelector('.up_down'),
}

document.addEventListener('DOMContentLoaded', () => {
  // appendChild
  let el = document.createElement('p')
  let txt = document.createTextNode('用原生 js 加的新节点, appendChild 方法')
  el.appendChild(txt)
  doms.ud.appendChild(el)


  // inserBefore
  let el2 = document.createElement('p')
  let txt2 = document.createTextNode('用原生 js 加的新节点, insertBefore 方法')
  el2.appendChild(txt2)
  // 在ud的子节点id前插入el2节点
  doms.ud.insertBefore(el2, doms.id)


  // appendChild textC
  let el3 = document.createElement('p')
  el3.textContent = '用原生 js 加的新节点, appendChild 方法, 用了 textContent 赋值'
  doms.ud.appendChild(el3)



  // 在HTML上, 所有的大写都会被转为小写
  // 在js中, xx-xx被转为小驼峰

  /* 取值 */
  console.log(
    // getAttribute 获取属性
    doms.id.getAttribute("data-blah"), '\n',
    // dataset 获取属性
    doms.id.dataset.blah, '\n',
    // 大写会被转为小写
    doms.id.dataset.daxie, '\n',
    // .[xxx] 获取属性
    doms.id.dataset['blah'], '\n',
  )


  /* 赋值 */
  // setAttribute 给属性赋值, 一律转为小写
  doms.id.setAttribute('data-appId', 'id 是 1')
  // 这两符合js的语法, obj.xxx obj[xxx]
  doms.id.dataset.appName = 'dataset赋值'
  doms.id.dataset['appLifeCycle'] = 'dataset[xxx]赋值'
  // 不允许[]中, 开头和中间有-, 结尾可以有-
  // doms.id.dataset['app-env'] = 'dataset[xx-xx]赋值' // 报错, 'app-env' is not a valid property name.
  doms.id.dataset['app-'] = 'app破折号' // 不报错
  doms.id.dataset.app_age = '不知多大了'
  // 大驼峰会被转为-xxx
  doms.id.dataset.App = 'App 啊'

  console.log(
    doms.id.dataset.appid, '\n',
    doms.id.dataset.pozheHao, '\n',
    doms.id.dataset['pozheHao'], '\n',
    doms.id.dataset['appName'], '\n',
    doms.id.dataset['appLifeCycle'], '\n',
    doms.id.dataset['app-'], '\n',
    doms.id.dataset.app_age, '\n',
    doms.id.dataset.App, '\n',
  )

});



$(function () {
  console.log(
    // 优先在当前$('#id')对象上去找一个自定义属性jQuery3310197007275271595452的xxx属性, 找不到就找原生html标签上的data-xxx
    '刚开始$():', $('#id').data('blah')
  )

  // jQ加的data则不会在html上看到
  // $().data() 本质上是缓存, 在当前 jQ 对象上, 添加一个自定义的属性类似 jQuery331079058818933652232的一个对象
  // 缓存所有 $().data() 的赋值
  $('#id').data('blah-str', '$().data()新加的数据')

  // $().data() 改不了已渲染到 html 的 data-xxx 的值
  $('#id').data('blah', '已被 $().data() 修改')
  console.log(
    doms.id.dataset.blah, '\n',
    $('#id').data('blah')
  )

  // 靠 $().attr() 来改
  $('#id').attr('data-blah', '已被 $().attr() 修改')
  console.log(
    '$().attr()修改后data-blah的值:', '\n',
    doms.id.dataset.blah, '\n',
    $('#id').attr('data-blah'), '\n',
    // 看当前jQ对象
    $("#id")
  )

})