// 降低耦合
const fn = (el, binding) => {
  const { name, value, expression,
    arg, modifiers } = binding

  console.log('name:', name)
  console.log('value:', value)
  console.log('expression:', expression)
  console.log('arg:', arg)
  console.log('modifiers:', modifiers)

  el.click()
}

export default {
  inserted(el, binding) {
    fn(el, binding)
  }
}



/*
export default {
  inserted(el, binding) {
    const { name, value, expression,
      arg, modifiers } = binding

    console.log('name:', name)
    console.log('value:', value)
    console.log('expression:', expression)
    console.log('arg:', arg)
    console.log('modifiers:', modifiers)

    el.click()
  }
}
*/