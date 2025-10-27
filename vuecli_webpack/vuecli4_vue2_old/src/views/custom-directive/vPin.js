// 注册局部指令
// 降低耦合
const fn = (el, binding) => {
  const { value, arg, modifiers } = binding
  // 修饰符不是固定定位则给绝对定位
  el.style.position = modifiers.fixed ? 'fixed' : 'absolute'
  el.style.right = '20px'
  el.style[arg] = value + 'px'

  console.log('value:', value)
  console.log('arg:', arg)
  console.log('modifiers:', modifiers)
  console.log('---- 分割线 ----\n\n\n')
}

export default {
  bind(el, binding) {
    fn(el, binding)
  }
}