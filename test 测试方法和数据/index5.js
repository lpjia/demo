import {
  objKeyToOrmField
} from '../util/commonMethod.js'


const obj = {
  productName: '芹菜',
  unitPrice: '2',
  shopName: '超市',
}

// 把对象属性拆分成单独对象, 再push到数组
let result = objKeyToOrmField(obj)
console.log('不传二参:', result)

let result_2 = objKeyToOrmField(obj, {
  exclude: ['shopName']
})
console.log('去掉 key:', result_2)

let result_3 = objKeyToOrmField(obj, {
  assign: {
    one: '111',
    two: '222',
  },
  // exclude: ['shopName']
})
console.log('增加 key:', result_3)
console.log('---- 分割线 ----\n\n\n')