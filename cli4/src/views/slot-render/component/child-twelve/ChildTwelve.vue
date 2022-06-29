<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" v-for="column in columnList" :key="column.columnName">
        <el-card class="box-card card-column">
          <div slot="header" class="clearfix">
            <span>{{ column.columnName }}</span>
          </div>
          <!-- 这里只需要给Commodity组件传入数据，响应Commodity组件的click-commodity事件即可。
            事件不必携带参数，完全符合父到子的数据流向，而不会发生子组件又给父组件反向发数据的情况 -->
          <CommodityList :commodities="column.commodityList">
            <!-- 接下, 渲染完子组件内容, 用作用域插槽来填坑 -->
            <template #default="{ row }">
              <!-- dom 模板, 属性名用短横线 -->
              <!-- 没有用 template 标签, 纯渲染子组件内容 -->
              <Commodity :modity-data="row" @click-commodity="onCommodityClick"></Commodity>
            </template>
          </CommodityList>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false"
      v-loading.fullscreen.lock="isFullscreenLoading" :lock-scroll="false">
      <span>{{ dialogMsg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <hr>
    <!-- 先写个静态页 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card card-column">
          <div slot="header" class="clearfix">
            <span>first 大卡片</span>
          </div>
          <section>
            <el-row :gutter="20">
              <el-col :span="8" style="margin-top:20px;">
                <el-card class="box-card card-column">
                  <div slot="header" class="clearfix">
                    <span>second 小卡片</span>
                  </div>
                  <section>小卡片内容</section>
                </el-card>
              </el-col>
              <el-col :span="8" style="margin-top:20px;">
                <el-card class="box-card card-column">
                  <div slot="header" class="clearfix">
                    <span>second 小卡片</span>
                  </div>
                  <section>小卡片内容</section>
                </el-card>
              </el-col>
              <el-col :span="8" style="margin-top:20px;">
                <el-card class="box-card card-column">
                  <div slot="header" class="clearfix">
                    <span>second 小卡片</span>
                  </div>
                  <section>小卡片内容</section>
                </el-card>
              </el-col>
            </el-row>
          </section>
        </el-card>
      </el-col>
    </el-row>

    <el-divider></el-divider>
  </div>
</template>

<script>
import Commodity from './Commodity.vue'
import CommodityList from './CommodityList.vue'

export default {
  name: 'ChildTwelve',
  components: {
    CommodityList,
    Commodity,
  },
  data() {
    return {
      // 这种多级(层)数据结构, 一般直接遍历渲染的话得多级循环
      columnList: [
        {
          columnName: '品牌商',
          commodityList: [
            {
              cardName: 'honor',
              msg: '原来是华为的子品牌, 因为美国的不要脸制裁, 出于品牌自救, 华为选择出售, 剥离出该品牌'
            },
            {
              cardName: 'MI',
              msg: '招牌就是性价比, 算是把国产的智能机市场价格给打下来了'
            },
            {
              cardName: 'Apple',
              msg: '唯一能在智能电子设备行业中, 软硬件都处在顶尖水平的公司'
            },
          ]
        },
        {
          columnName: '有好货',
          commodityList: [
            {
              cardName: '华为系列手机',
              msg: '价格适中, 软硬件都在猛追苹果, 坚持自主研发, 国产之光'
            },
          ]
        },
      ],
      dialogMsg: '',
      dialogVisible: false,
      isFullscreenLoading: false
    };
  },
  methods: {
    onCommodityClick(row) {
      console.log('根组件 row: ', row)
      this.dialogMsg = row
      this.dialogVisible = true
    },
    dialogConfirm() {
      this.dialogVisible = false
      this.$message.success('success!')
    }
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .el-card__header {
    background-color: #d16262;
  }

  .clearfix {
    color: #fff;
  }

  section {
    height: 140px;
    cursor: pointer;
  }
}
</style>
