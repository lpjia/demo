// 命名导入/按需导入
import { obj } from './m_index.js'
console.log('obj.one: ', obj.one)


import { aObjj } from './m_index.js'
console.log('aObjj.three: ', aObjj.three)


import { fn } from './m_index.js'
fn()


// 命名导入重命名
import { obj as objj } from './m_index.js'
console.log('objj.two: ', objj.two)


// 默认导入
import aArr from './m_index.js'
console.log('aArr: ', aArr)


import * as all from './m_index.js'
console.log('all: ', all)
console.log('all.aObjj: ', all.aObjj)
console.log('all.default: ', all.default)
console.log('all.fn: ', all.fn)
console.log('all.fn(): ', all.fn())
console.log('all.obj: ', all.obj)