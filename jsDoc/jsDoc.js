// @ts-check
// 文件首行增加注释会引入ts的类型检查

// https://juejin.cn/post/6927652720706846728  使用 JSDoc 给 js 项目添加类型注释
// https://juejin.cn/post/7317824480912441344  JSDoc的进阶使用

// 双斜线不管用
/* 不管用 */


/** 这种管用 */
/**
 * 这种管用
 */


/**
 * Adds two numbers together and returns the result.
 * 参数
 * @description 这是描述
 * @param {number} value1 The first value
 * @param {number} value2 The second value
 */
function addNumbers(value1, value2) {
  return value1 + value2;
}


/**
 * 联合类型
 * 返回值
 * @param {string | number} params 
 * @returns {number}
 */
function getName(params) {
  return 1
}


/**
 * 弃用
 * @deprecated since version 1.0.0
 * @param {[number, string]} value1 元组
 * @param {'age' | 'name' | 'gender'} value2 字符串字面量类型
 * @returns {void}
 */
function addNumber2(value1, value2) {
  // return value1 + value2;
}


const person = {
  firstName: 'Michael',
  lastName: 'Scott',
  getAge() {
    return 20
  }
};


/**
 * 定义对象类型
 * 可选参数, 用[]包裹
 * @typedef {Object} Person
 * @property {string} firstName The person's first name
 * @property {string} [lastName] The person's last name
 */

/**
 * Greets a person
 * @param {Person} personObject Contains the person's information
 */
function greetPerson(personObject) {
  console.log(`Hello ${personObject.lastName}`);
}


/**
 * 常见的对象数组定义
 * @typedef {Array<Person>} PersonList
 * 也可以写一起, 但是描述信息就乱了
 * @typedef {Person[]} PersonList2
 */

/**
 * @typedef {Person[]} PersonList3
 */

/**
 * 定义对象类型的成员 方法
 * @typedef {Object} Person2
 * @property {(p1: number, p2: boolean) => string} getName
 */

/**
 * 使用ts提供的工具类型
 * 定义类型得用typedef
 * @typedef {'age' | 'name' | 'gender'} LianHeKey
 * @typedef {Record<LianHeKey, Person>} Gongju
 */


/** @type {number} 单独给变量声明类型, 一般可借助ts的类型推导再配合vscode好用 */
let baseVar1 = 2



/**
 * 主要看泛型写法
 * 对象合并，如果存在相同的属性，优先使用 target 的属性
 * @template { Record<string, any> } T 泛型写法
 * @template { Record<string, any> } U
 * @param { T } source 源对象
 * @param { U } target 目标对象
 * @returns { Omit<T, keyof (T | U)> & U } 返回合并后的新对象
 */
function merge(source, target) {
  return Object.assign(source, target)
}
const newObj = merge(
  { name: 'test', gender: '男' },
  { age: 18, gender: 1 }
)


/**
 * 可以使用ts的类型工具
 * @template {Record<keyof any, any>} O
 * @template {O | O[]} T
 * @param {T} source
 * @returns 拷贝后的值
 */
function deepClone(source) {
  return source
}
const newObj2 = deepClone({})




/**
 * 定义对象类型
 * @typedef {Object} S
 * @property {number} id id
 * @property {number | null} pId 父级id
 * @property {string} name
 * @property {any[]} [children]
 */

/**
 * 定义对象类型
 * @typedef {Object} Option
 * @property {string} [pKey] 父级id的字段名
 * @property {string} [cKey] 子id的字段名
 * @property {string} [gpId] 祖父id
 */

/**
 * @description 一维数组转 tree 结构
 * @param {S[]} list 一维数组
 * @param {Option} [option]
 * @returns 新tree
 */
function oneToTree(list, option = {}) {
  let len = list.length
  const {
    pKey = 'pId',
    cKey = 'id',
    gpId = 0
  } = option

  function loop(gpId) {
    let res = []
    for (let i = 0; i < len; i++) {
      let item = list[i]
      if (item[pKey] === gpId) {
        item.children = loop(item[cKey])
        res.push(item)
      }
    }
    return res
  }

  return loop(gpId)
}
const oneList = [
  { id: 0, pId: null, name: '祖先' },
  { id: 15, pId: 5, name: '子11' },
  { id: 18, pId: 5, name: '子12' },
  { id: 5, pId: 0, name: '子1' },
  { id: 8, pId: 0, name: '子2' },
]
const tree = oneToTree(oneList, {})

export default {}