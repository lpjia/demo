// 导入只能在模块脚本中, 模块脚本中可以写普通js
import { formatTime } from '../util/commonMethod.js'
console.log('这是模块脚本, 先引入, 模块脚本总是被延迟加载的')

console.log(formatTime(new Date(), 'Y-M-D h:m'))