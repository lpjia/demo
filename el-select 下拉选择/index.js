import { RAP2_TUNNEL_ONLINE_MONITORING } from '../global/globalConfig.js'
import { fetchGet, fetchPost } from '../util/fetchRequest.js'

new Vue({
  el: '#app',
  data: {
    // 搜索项
    formSearchTerm: {
      tunnel: '-1',
      device: '',
      channel: '',
    },

    allTunnelArr: [],
    allDtsDeviceArr: [],
    allDtsChannelArr: [],

    canSelectDevice: false,
    canSelectChannel: false,
  },
  computed: {
  },
  mounted() {
    this.getAllTunnel()
  },
  methods: {

    // 筛选 搜索
    searchForm() {
      // this.search()
      this.$message.success('点击搜索按钮')
    },
    // 清空查询项
    reset() {
      this.formSearchTerm = {
        tunnel: '-1',
        device: '',
        channel: '',
      }
      this.canSelectDevice = false
      this.canSelectChannel = false
    },
    // 获取所有隧道
    async getAllTunnel() {
      const url = RAP2_TUNNEL_ONLINE_MONITORING + '/api/tunnel-managent/GetTunnelIdAndNameListAsync'
      this.allTunnelArr = await fetchGet(url)
    },


    // 选择某隧道
    searchSelectTunnel(tunnelId) {
      // 后面所有下拉, 值给空
      this.formSearchTerm.device = ''
      this.formSearchTerm.channel = ''
      // 后面所有下拉禁用, 防止接口响应时间过长, 优化用户体验
      this.canSelectDevice = false
      this.canSelectChannel = false
      // 选中某项, 加载数据
      if (tunnelId !== '-1') this.getAllDtsDevice(tunnelId)
    },
    // 获取所有设备
    async getAllDtsDevice(tunnelId) {
      const url = RAP2_TUNNEL_ONLINE_MONITORING + '/api/dtsequipment-managent/GetListByTunnelIdAsync'
      const params = Qs.stringify({ tunnelId })
      this.allDtsDeviceArr = await fetchGet(url, params)
      // 设备下拉组件启用并置为"全部"
      this.formSearchTerm.device = '-1'
      this.canSelectDevice = true
    },


    // 选择某 dts 设备
    searchSelectDevice(deviceId) {
      // 后面所有下拉值给空
      this.formSearchTerm.channel = ''
      // 后面所有下拉禁用 防止接口响应时间过长, 优化用户体验
      this.canSelectChannel = false
      // 选中某项,加载数据
      if (deviceId !== '-1') this.getAllDtsChannel(deviceId)
    },
    // 获取所有通道
    async getAllDtsChannel(deviceId) {
      const url = RAP2_TUNNEL_ONLINE_MONITORING + '/api/dtschannel-managent/GetListByDTSEquipmentIdAsync'
      const params = Qs.stringify({ deviceId })
      this.allDtsChannelArr = await fetchGet(url, params)
      // 设备下拉组件启用并置为"全部"
      this.formSearchTerm.channel = '-1'
      this.canSelectChannel = true
    },
  }
})