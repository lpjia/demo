// 遍历数组并分组

/* Object.groupBy()
一参是要被分组的可迭代对象(一般是对象数组), 二参是回调
二参中的回调会被自动传入2个参数：数组元素，元素索引
二参回调需要返回一个str或Symbol来作为新对象的键进行分组

返回一个新对象 */


const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];
Object.groupBy(inventory, (item) => item.type)
/* {
  "fruit": [
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "cherries", type: "fruit", quantity: 12 },
  ],
  "meat": [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 },
  ],
  "vegetables": [
    { name: "asparagus", type: "vegetables", quantity: 9 },
  ]
} */

const s1 = Symbol(111)
const s2 = Symbol(222)
const o = Object.groupBy(inventory, (item) => {
  return item.quantity > 15 ? s1 : s2
})
o[s1] // [{}, {}]
o[s2] // [{}, {}, {}]




const students = [
  { name: "Tom", grade: "A", subject: "Math" },
  { name: "Jerry", grade: "B", subject: "Math" },
  { name: "Spike", grade: "A", subject: "Science" },
  { name: "Heisenberg", grade: "A", subject: "Math" },
];
Object.groupBy(students, s => `${s.grade}-${s.subject}`);
/* {
  "A-Math": [
    { name: "Tom", grade: "A", subject: "Math" },
    { name: "Heisenberg", grade: "A", subject: "Math" },
  ],
  "A-Science": [
    { name: "Spike", grade: "A", subject: "Science" },
  ],
  "B-Math": [
    { name: "Jerry", grade: "B", subject: "Math" },
  ]
} */




/* Map.groupBy()
一参、二参同Object.groupBy()
二参回调需要返回一个任意类型数据来作为新Map对象的键进行分组

返回一个新Map对象 */


const obj1 = { k1: 'v1' }
const obj2 = { k2: 'v2' }
const m = Map.groupBy(inventory, (item) => {
  return item.quantity > 15 ? obj1 : obj2
})
m.get(obj1) // [{}, {}]
m.get(obj2) // [{}, {}, {}]



const m2 = Map.groupBy(inventory, (item) => {
  return item.quantity > 15 ? 'big' : 'small'
})
m2.get('big') // [{}, {}]
m2.get('small') // [{}, {}, {}]



const sym1 = Symbol(111)
const sym2 = Symbol(222)
const m3 = Map.groupBy(inventory, (item) => {
  return item.quantity > 15 ? sym1 : sym2
})
m3.get(sym1) // [{}, {}]
m3.get(sym2) // [{}, {}, {}]