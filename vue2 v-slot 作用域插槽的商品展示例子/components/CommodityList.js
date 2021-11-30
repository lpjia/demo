export default {
  props: ['commodities'],
  mounted() {
  },
  render(h) {
    return h('el-row',
      {

      }
    )
  },
  /*
  // 用 render 替换 template
  template: `<el-row :gutter="20">
              <el-col :span="8" v-for="(item, index) in commodities" :key="index" style="margin-top:20px;">
                  <slot :row="item"></slot>
              </el-col>
            </el-row>` */
}