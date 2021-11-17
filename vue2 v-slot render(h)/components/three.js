// 局部注册
const hxComp = {
  data() {
    return {
      text: 'three.js'
    }
  },
  props: {
    level: {
      type: Number,
      required: true,
    }
  },
  // template: '#hx-template' // 用模版
  // 用 render 重写, 代码明显比模版简洁多了
  render(h) {
    // console.log('---- hx-comp ----')
    // 默认插槽
    // console.log('this.$slots.default: ', this.$slots.default)
    // <hx>xxxx</hx>
    return h('h' + this.level, // 标签名称
      this.$slots.default, // 子节点数组
      this.$scopedSlots.default({ text: this.text })
    )
  }
}



// // 局部注册
// const childThree = {
//   components: {
//     'hx-comp': hxComp
//   },
//   render(h) {
//     console.log('---- child-three ----')
//     // console.log('this.$slots: ', this.$slots)
//     // console.log('this.$slots.default: ', this.$slots.default)
//     // console.log('this.$scopedSlots: ', this.$scopedSlots)

//     // <div><hx-comp :level="3" #default="data"><span>{{ data.text }}</span></hx-comp></div>
//     return h('div',
//       [
//         h('hx-comp',
//           {
//             props: {
//               level: 3
//             },
//             scopedSlots: {
//               default: data => h('span', data.text)
//             },
//           },
//           // [
//           //   h('template',
//           //     {
//           //       // slot: 'default',
//           //       scopedSlots: {
//           //         default: data => h('span', data.text)
//           //       },
//           //     }
//           //   )
//           // ]
//         ),
//       ]
//     )
//   }
// }