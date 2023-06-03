// js实现函数重载
const addMethod = require('./addMethod');

const searcher = {}

addMethod(searcher, 'find', () => {
  console.log('查询所有用户')
})
addMethod(searcher, 'find', (name) => {
  console.log('按照姓名查询用户')
})
addMethod(searcher, 'find', (firstName, lastName) => {
  console.log('按照姓和名查询用户')
})

searcher.find()