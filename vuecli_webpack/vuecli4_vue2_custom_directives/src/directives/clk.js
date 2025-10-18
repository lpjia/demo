function fn(el, binding) {
  const { name, value, expression,
    arg, modifiers } = binding

  console.log('name:', name) // 指令名
  console.log('value:', value) // 绑定的值
  console.log('expression:', expression) // 表达式, 不能给
  console.log('arg:', arg) // 参数
  console.log('modifiers:', modifiers) // 修饰符

  // el.click() // 可触发事件
}

export default {
  inserted(el, binding) {
    fn(el, binding)
  }
}