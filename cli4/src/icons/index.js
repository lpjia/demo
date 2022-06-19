import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 注册全局组件
Vue.component('svg-icon', SvgIcon)

// 自动引入 src/icons/svg 下的所有 .svg 文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
