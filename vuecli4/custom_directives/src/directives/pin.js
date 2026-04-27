function fn(el, binding) {
  const { value, arg, modifiers } = binding
  el.style.position = modifiers.fixed ? 'fixed' : 'absolute'
  el.style.right = '20px'
  el.style[arg] = value + 'px'
}

export default {
  inserted(el, binding) {
    fn(el, binding)
  }
}