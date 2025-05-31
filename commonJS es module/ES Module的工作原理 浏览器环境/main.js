import foo from './foo.js'
import bar from './bar.js'

/* 动态导入语法
import('./dynamic.js') */

import('./dynamic.js').then((m) => {
  console.log('main:', m.default)
  console.log('m:', m)
})

console.log('main:', foo, bar)