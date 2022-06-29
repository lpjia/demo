import CommodityList from './components/CommodityList.js'
import Commodity from './components/Commodity.js'


const vm = new Vue({
  el: '#app',
  components: {
    'commodity-list': CommodityList,
    'commodity': Commodity,
  },
  data: {
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
  },
  computed: {
  },
  mounted() {
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
  }
})