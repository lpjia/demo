import {
  validIp, validPort
} from '../../util/validateRules.js'


/* ip 合法格式是 0-255 */
console.log("validIp('192.168.1.1'):",
  validIp('192.168.1.1')
)
console.log("validIp('0.0.0.0'):",
  validIp('0.0.0.0')
)
console.log("validIp('255.255.255.255'):",
  validIp('255.255.255.255')
)
console.log('---- 分割线 ----\n\n\n')


// 不能超范围
console.log("validIp('192.168.1.256'):",
  validIp('192.168.1.256')
)
// 格式要正确
console.log("validIp('192.168'):",
  validIp('192.168')
)
console.log('---- 分割线 ----\n\n\n')



/* port 合法格式是 0-65535 */
console.log("validPort(0):",
  validPort(0)
)
console.log("validPort(80):",
  validPort(80)
)
console.log("validPort('8080'):",
  validPort('8080')
)
console.log("validPort(65535):",
  validPort(65535)
)
console.log('---- 分割线 ----\n\n\n')



console.log("validPort('00000'):",
  validPort('00000')
)
// 负数不行
console.log("validPort(-1):",
  validPort(-1)
)
// 浮点数不行
console.log("validPort(20.34):",
  validPort(20.34)
)
// 不能超范围
console.log("validPort(65536):",
  validPort(65536)
)