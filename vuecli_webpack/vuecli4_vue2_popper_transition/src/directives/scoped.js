import Vue from 'vue'

Vue.directive('scoped', function (el, binding) {
  const scopedId = binding.value.$options._scopeId
  if (!scopedId) {
    return
  }

  console.log('el:', el) // el得到一个真实dom
  console.log('scopedId:', scopedId)
  console.log('el.__vue__:', el.__vue__) // el.__vue__得到一个vue组件对象
  // console.log('el.__vue__.$el:', el.__vue__.$el) // el.__vue__.$el得到一个真实dom, 等同于el

  // el.children[0].setAttribute(scopedId, '') // 一行代码搞定, 但是不通用, 指令是作为一个通用功能的

  const componentTag = el.__vue__.$vnode.tag
  console.log('componentTag:', componentTag)

  let targets = [] // 需要添加scopedId的元素

  if (componentTag.indexOf('ElPopover') !== -1) {
    // popover组件
    targets.push(el.children[0])
  } else {
    targets.push(el)
  }
  targets.forEach(item => { item.setAttribute(scopedId, '') })

})