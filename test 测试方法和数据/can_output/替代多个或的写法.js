// 替代多个或 || 的写法
const type = 2

if (type === 1 || type === 2 || type === 3) {
  console.log('type === 1 || type === 2 || type === 3 的写法')
}

switch (type) {
  case 1: case 2: case 3:
    console.log('switch case 写法')
    break;
  default:
    break;
}

const condition = [1, 2, 3]
if (condition.includes(type)) {
  console.log('arr.includes 写法, 推荐')
}