export default {
  props: ['modityData'],
  // render(h) {
  //   return h('section', 'commodity 子组件')
  // },
  methods: {
    sendData(data) {
      console.log('commodity 子组件 data: ', data)
      this.$emit('click-commodity', data)
    }
  },
  template: `<el-card class="box-card card-column">
                <div slot="header" class="clearfix">
                  <span>{{ modityData.cardName }}</span>
                </div>
                <section @click="sendData(modityData.msg)">{{ modityData.msg }}</section>
              </el-card>`
}