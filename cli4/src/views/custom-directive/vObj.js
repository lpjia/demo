// 注册局部指令
// 降低耦合
const fn = (el, binding) => {
  const { value } = binding

  console.log('el:', el)
  console.log('value:', value)
  console.log('value.color:', value.color)
  console.log('value.txt:', value.txt)
  console.log('---- 分割线 ----\n\n\n')
}

export default {
  bind(el, binding) {
    fn(el, binding)
  }
}