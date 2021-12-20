const crypto = require('crypto');


const md5 = crypto.createHash('md5')
md5.update('hello world!')
console.log('md5 哈希值: ', md5.digest('hex'))
console.log('---- 分割线 ----\n')


const sha1 = crypto.createHash('sha1')
sha1.update('hello world!')
console.log('sha1 哈希值: ', sha1.digest('hex'))
console.log('---- 分割线 ----\n')


const sha256 = crypto.createHash('sha256')
sha256.update('hello world!')
console.log('sha256 哈希值: ', sha256.digest('hex'))
console.log('---- 分割线 ----\n')


const sha512 = crypto.createHash('sha512')
sha512.update('hello world!')
console.log('sha512 哈希值: ', sha512.digest('hex'))
console.log('---- 分割线 ----\n')