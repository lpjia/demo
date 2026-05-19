import foo from './foo.js'
import bar from './bar.js'

/* 动态导入语法
import('./dynamic.js') */

import('./dynamic.js').then((...args) => {
  console.log('args:', args)
  const m = args[0]
  console.log('main.js:', m.default, m.mingMing)
})

console.log('main.js:', foo, bar)