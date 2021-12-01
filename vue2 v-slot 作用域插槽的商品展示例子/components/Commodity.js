export default {
  props: ['modityData'],
  methods: {
    sendData(data) {
      console.log('commodity 子组件 data: ', data)
      this.$emit('click-commodity', data)
    }
  },
  render(h) {
    return h('el-card',
      {
        attrs: {
          class: 'box-card card-column el-card is-always-shadow'
        },
      },
      [
        h('div',
          {
            attrs: {
              class: 'clearfix',
            },
            slot: 'header',
            // slot="header", 说明已经是 el-card 的插槽, 其他方案都报错
          },
          [
            h('span', this.modityData.cardName)
          ]
        ),
        h('section',
          {
            on: {
              click: this.sendData.bind(this, this.modityData.msg)
            }
          },
          this.modityData.msg
        )
      ]
    )
  },
  /*
  template: `<el-card class="box-card card-column">
                <div slot="header" class="clearfix">
                  <span>{{ modityData.cardName }}</span>
                </div>
                <section @click="sendData(modityData.msg)">{{ modityData.msg }}</section>
              </el-card>` */
}