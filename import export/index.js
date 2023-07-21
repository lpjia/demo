// 命名导入/按需导入
import { obj } from './index2.js'
console.log('obj.one: ', obj.one)

import { obj2 } from './index2.js'
console.log('obj2.three: ', obj2.three)

import { fn } from './index2.js'
fn()

// 命名导入重命名
import { obj as obj3 } from './index2.js'
console.log('obj3.two: ', obj3.two)

// 默认导入
import aArr from './index2.js'
console.log('aArr: ', aArr)

import * as all from './index2.js'
console.log('all: ', all)
console.log('all.obj2: ', all.obj2)
console.log('all.default: ', all.default)
console.log('all.fn: ', all.fn)
console.log('all.fn(): ', all.fn())
console.log('all.obj: ', all.obj)