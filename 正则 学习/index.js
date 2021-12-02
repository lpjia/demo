let a = 'akkKJDGFAGALGJH'
let b = a.match(/G/g)
console.log('b: ', b) // ['G', 'G', 'G']




const c = 'https://cli.vuejs.org/zh/guide/installation.html'
const d = c.match(/(?<=\/)[^\/]*\.[^\/]*$/g)
console.log('d: ', d) // ["installation.html"]