
import { treeToOne, oneToTree, deepClone } from '../util/commonMethod.js'

const res = await fetch('data.json')
const data = await res.json()
let yiwei = treeToOne(data)
console.log('yiwei:', yiwei)

// 加深拷贝是为了不影响上面一维数组
let tree = oneToTree(deepClone(yiwei), { gpId: '0' })
console.log('tree:', tree)