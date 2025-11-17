/* helper被设计成模板渲染助手
除非渲染模板需要, 否则其他一些工具函数不建议放到helper
推荐按需加载 */

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

/* 模拟模板渲染需要的工具函数 */
const { toInt } = require('../utils')

module.exports = {
  relativeTime: (time) => dayjs(new Date(time * 1000)).fromNow(),
  domain: url => url && url.split('/')[2],
  toInt,
}