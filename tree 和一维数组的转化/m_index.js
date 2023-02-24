// type="module" 顶层可直接使用await
import { treeToOne, oneToTree, deepClone } from '../util/commonMethod.js'

const res = await fetch('data.json')
const data = await res.json()
let yiwei = treeToOne(data)
console.log('yiwei:', yiwei)

// 加深拷贝是为了不影响上面一维数组
// let tree = oneToTree(deepClone(yiwei), { gpId: '0' })
// 增加了默认值
let tree = oneToTree(deepClone(yiwei))
console.log('tree:', tree)