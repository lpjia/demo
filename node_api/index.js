// 判断JavaScript执行环境
if (typeof (window) === 'undefined') {
  console.log('node.js');
} else {
  console.log('browser');
}



// nodejs全局对象
console.log('global: ', global)
// 为了和浏览器保持统一的全局变量, 增加了globalThis
console.log(globalThis === global)
// 当前文件所在的目录路径(是绝对路径)
console.log(__dirname)
// 当前文件的路径(是绝对路径), 包含后缀名
console.log(__filename)
// nodejs进程对象
console.log(process)






/* md-image-checker.js

const fs = require('fs');
const path = require('path');

class MdImageComparator {
  ...
}

function main() {
  ...
}

// 当直接运行此文件时(node md-image-checker.js), 它就是主模块, 下方if条件成立, 才执行main()
if (require.main === module) {
  main();
}
// 此文件作为模块导入时, 不执行main(), 上方if条件不成立
// const MdImageComparator = require('./md-image-checker');

module.exports = MdImageComparator;
*/