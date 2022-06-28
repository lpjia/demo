<script>
export default {
  name: 'CommodityList',
  props: ['commodities'],
  render(h) {
    return (
      <el-row gutter={20}>
        <el-col span={8}>
          {this.$scopedSlots.default({ row: item })}
        </el-col>
      </el-row>

      // <el-row :gutter="20">
      //     <el-col :span="8" v-for="(item, index) in commodities" :key="index" style="margin-top:20px;">
      //         <slot :row="item"></slot>
      //     </el-col>
      // </el-row>
    )
  }

  /*
  render(h) {
    return h('el-row',
      {
        props: {
          gutter: 20
        },
      },
      [
        this.commodities.map((item, idx) => {
          return h('el-col',
            {
              props: {
                span: 8,
                key: idx
              },
              style: {
                marginTop: '20px'
              },
            },
            [ // <slot :row="item"></slot>
              this.$scopedSlots.default({ row: item })
            ]
          )
        })
      ]
    )
  },
  */

  /*
  // 用 render 替换 template
  template: `<el-row :gutter="20">
              <el-col :span="8" v-for="(item, index) in commodities" :key="index" style="margin-top:20px;">
                  <slot :row="item"></slot>
              </el-col>
            </el-row>` */
}
</script>