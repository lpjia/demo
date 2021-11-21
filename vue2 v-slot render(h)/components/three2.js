// 局部注册
const childThree = {
  data() {
    return {
      list: [
        { lv: 2 },
        { lv: 4 },
      ]
    }
  },
  components: {
    'hx-comp': hxComp
  },
  render(h) {
    // console.log('---- child-three ----')

    // <div><hx-comp :level="2" #default="data"><span>{{ data.text }}</span></hx-comp></div>
    return h('div',
      [
        // 加遍历
        this.list.map(item => {
          return h('hx-comp',
            {
              props: {
                level: item.lv
              },
              scopedSlots: {
                default: data => h('span', data.text)
              },
            }
          )
        }),

        h('hx-comp',
          {
            props: {
              level: 1
            },
            scopedSlots: {
              default: data => h('span', data.text)
            },
          }
        ),
      ]
    )
  }
}