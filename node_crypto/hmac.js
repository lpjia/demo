const crypto = require('crypto');

/**
 * Hmac 也是一种哈希算法, 还需要一个密钥
 * 只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，
 * 因此，可以把Hmac理解为用随机数“增强”的哈希算法。
 */
const hmac = crypto.createHmac('sha256', 'secret-key')
hmac.update('hello world!')
console.log('hmac 哈希值: ', hmac.digest('hex'))
console.log('---- 分割线 ----\n')