import foo from './foo.js'
import bar from './bar.js'


import('./dynamic.js').then((m) => {
  console.log('main:', m.default)
  console.log('m:', m)
})

console.log('main:', foo, bar)