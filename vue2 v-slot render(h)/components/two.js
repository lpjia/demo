// 局部注册
const childTwo = {
  data() {
    return {
      reference: 'this is childTwo',
      id: 'xxoo'
    }
  },
  render(h, context) {
    console.log('this.$slots: ', this.$slots)
    console.log('this.$scopedSlots: ', this.$scopedSlots)
    // console.log('this.$scopedSlots.slot_1: ', this.$scopedSlots.slot_1)
    console.log('context: ', context)
    return h('section',
      // {}, // 没有绑定任何东西, 就可省略
      {
        // slot: 'slot_1',
        // slot: this.$scopedSlots.slot_1,
        attrs: {
          data: this.id,
          // slot: "slot_1"
        },
      },
      [
        '先写一些文字',
        h('div',
          {
            //   attrs: {
            //     dataFromChild: this.id
            //   },
            // },

            // {
            //   // slot: 'slot_2',
            //   attrs: {
            //     dataFromChild: this.id
            //   },

            scopedSlots: {
              slot_1: props => {
                console.log('props: ', props)
                return createElement('span', props.text)
              }
            },
          },

          this.reference

          // [
          //   h('slot',
          //     {
          //       attrs: {
          //         name: 'slot_2'
          //       },
          //     },
          //   )
          // ]
        ),
        h('p',
          '兄弟节点 p'
        )
      ]
    )
  }
}