import { createElementVNode, defineComponent, h, ref } from "vue"

// 加defineComponent来正确推导, 否则父组件会报错
export default defineComponent({
  setup(props, { slots }) { // 解构出slots
    console.log(slots) // 父传过来的参数
    /* 找不到好用的命名了, 为了区分, 加个前缀x_ */
    const x_default = slots.default!() // 调用后返回vnode // 非空断言
    console.log(x_default) // 是个数组, 可能传过来多个

    const x_slot_1 = slots.slot_1!()
    console.log(x_slot_1) // 注释也能生成vnode, 渲染到相应位置

    const num = ref(30)
    const x_slot_2 = slots.slot_2!({ title: "哈哈", mynum: num })
    console.log(x_slot_2)

    return () => {
      // return createElementVNode('div', null, [
      //   'div内容',
      //   h('h1', null, 'h1内容')
      // ])
      return createElementVNode('div', null, [
        ...x_default,
        ...x_slot_1,
        ...x_slot_2
      ])
    }
  }
})