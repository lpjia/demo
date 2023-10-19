// @ts-check
// 文件首行增加注释会引入ts的类型检查

// https://juejin.cn/post/6927652720706846728

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
 * 定义对象类型的成员是方法
 * @typedef {Object} Person2
 * @property {(p1:number, p2:boolean) => string} getName
 */

/**
 * 使用ts提供的工具类型
 * 定义类型得用typedef
 * @typedef {'age' | 'name' | 'gender'} LianHeKey
 * @typedef {Record<LianHeKey, Person>} Gongju
 */


/** @type {number} */
let baseVar1 = 2


export default {}