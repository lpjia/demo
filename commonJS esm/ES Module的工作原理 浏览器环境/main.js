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


/* 原生esm, 动态导入 json文件
import一参是路径 二参需要加, { with: { type: 'json' } }
只有 default 默认导出, 也就是data.default */
import('./worker_type_list.json', { with: { type: 'json' } }).then(data => {
  console.log(data.default)
})
/* await 写法 */
const { default: worker_type_list } = await import('./worker_type_list.json', { with: { type: 'json' } })
console.log(worker_type_list)
/* 如果有构建工具, 则一般可能不需要写 with { type: 'json' } */



/* 静态导入
只有 default 默认导出
import worker_type_list from './worker_type_list.json' with { type: 'json' } */