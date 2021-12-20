const { URL } = require('url')
const path = require('path')


const url = new URL('http://user:pass@host.com:8080/path/to/file?query=string#hash')
console.log('url: ', url)


// 解析当前目录:
const workDir = path.resolve('.');
console.log('workDir: ', workDir) // C:\demo\node http

const filePath = path.join(workDir, 'public', 'node', 'index/one.html')
console.log('filePath: ', filePath) // C:\demo\node http\public\node\index\one.html