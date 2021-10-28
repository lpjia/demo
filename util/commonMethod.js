// import { message } from '@/utils/resetMessage'


// 默认sessionStorage 存 取 删 删所有
export const setStorage = (key, val, storage = sessionStorage) => {
  if (!key) return;
  storage.setItem(key, JSON.stringify(val))
}
export const getStorage = (key, storage = sessionStorage) => {
  if (!key) return;
  return JSON.parse(storage.getItem(key))
}
export const removeStorage = (key, storage = sessionStorage) => {
  if (!key) return;
  storage.removeItem(key)
}
export const clearStorage = (storage = sessionStorage) => storage.clear()


// 判断不为空, 用来获取接口数据判断用, 一般不会返回 Symbol 类型
function judgeNotEmpty(param) {
  let judgeObj = p => {
    if (p === null) return false // 是 null
    else if (Array.isArray(p)) return p.length ? true : false // 是数组
    else return JSON.stringify(p) === '{}' ? false : true // 是对象
  }
  let type = typeof (param)
  switch (type) {
    case 'string': case 'number': case 'undefined': case 'boolean':
      return !!param
    case 'object':
      return judgeObj(param)
    default:
  }
}


// 对象数组转对象
export function arrToObj(arr, { k = 'value', v = 'name' }) {
  const objKeyValue = arr.reduce((acc, cur) => {
    acc[cur[k]] = cur[v]
    return acc
  }, {})
  return objKeyValue
}


// 对象转对象数组
export function objToArr(obj, { l = 'name', v = 'id', isNum = false }) {
  let aKey = Object.keys(obj)
    , aResult = []
  aKey.map(item => {
    let model = {
      [l]: obj[item],
      [v]: isNum ? Number(item) : item
    }
    aResult.push(model)
  })
  return aResult
}


/**
 * @description 把时间戳格式化
 * @param {number / date} number 
 * @param {string} format
 * @returns {string}
 */
export function formatTime(number, format) {
  let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];

  let date = new Date(number); // 时间戳为毫秒
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (let i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}


// 格式化ISO时间
export function timeFormat(timeString) {
  if (!judgeNotEmpty(timeString)) return ''
  if (typeof timeString !== 'string') throw new Error('时间数据类型错误!')
  return formatTime(timeString, 'Y-M-D h:m:s')
}


/**
 * @description 深拷贝
 * @param {array / object} source 
 * @returns {array / object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}


// // 成功
// export function msgSucc(msg) {
//   message({ message: msg, type: 'success', showClose: true, duration: 2000 })
// }
// // 失败
// export function msgFail(msg) {
//   message({ message: msg, type: 'error', showClose: true, duration: 2000 })
// }


/**
 * @description 生成唯一 id
 * @param {number} n 生成的个数
 * @returns {array}
 */
export function createUniqueId(n) {
  let random = function () { // 生成10-12位不等的字符串
    return Number(Math.random().toString().substr(2)).toString(36) // 转换成十六进制
  }
  let arr = []

  function createId() {
    let num = random()
    let _bool = false
    arr.forEach(v => {
      if (v === num) _bool = true
    })
    if (_bool) {
      createId()
    } else {
      arr.push(num)
    }
  }
  let i = 0
  while (i < n) {
    createId()
    i++
  }
  return arr
}



/**
 * @description 一维数组转 tree 结构
 * @param {array} list 一维数组
 * @param {object} @field pKey 父级 id 的字段名 @field cKey 子 id 的字段名 @field gpId 祖父 id 的值
 * @returns {array}
 */
export function oneToTree(list, { pKey = 'pId', cKey = 'id', gpId }) {
  let len = list.length

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


/**
 * @description tree 结构转一维数组
 * @param {array} node tree 节点
 * @returns {array}
 */
export function treeToOne(node) {
  let stack = node
  let data = []
  while (stack.length !== 0) {
    let pop = stack.pop()
    data.unshift({ ...pop })
    let children = pop.children
    if (children) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.unshift(children[i])
      }
    }
  }

  // tree 末端节点统一带上 children 字段并给 []
  data.map(item => {
    if (item.children && item.children.length) item.children = []
    if (!item.children) item.children = []
  })

  return data
}


/**
 * @description 四舍五入, 修复 js 精度问题, 正负数都可以
 * @param {number / string} n 四舍五入的数, 必传
 * @param {number} d 不传则默认 0, 取整
 * @returns {string}
 */
export function $toFixed(n, d) {
  let s = n + ''
  if (!d) d = 0
  if (s.indexOf('.') === -1) s += '.'
  s += new Array(d + 1).join('0')
  if (new RegExp('^(-|\\+)?(\\d+(\\.\\d{0,' + (d + 1) + '})?)\\d*$').test(s)) {
    s = '0' + RegExp.$2
    let pm = RegExp.$1
    let a = RegExp.$3.length
    let b = true
    if (a === d + 2) {
      a = s.match(/\d/g)
      if (parseInt(a[a.length - 1]) > 4) {
        for (let i = a.length - 2; i >= 0; i--) {
          a[i] = parseInt(a[i]) + 1
          if (a[i] === 10) {
            a[i] = 0
            b = i !== 1
          } else break
        }
      }
      s = a.join('').replace(new RegExp('(\\d+)(\\d{' + d + '})\\d$'), '$1.$2')
    }
    if (b) s = s.substr(1)
    return (pm + s).replace(/\.$/, '')
  }
  return this + ''
}


/**
 * @description 简单数据类型去重
 * @param {array} arr 
 * @returns {array}
 */
export const unique = arr => [...new Set(arr)]


/**
 * @description 生产一定范围之内的随机数
 * @param {number} min 小值, 可传入小数
 * @param {number} max 大值, 同上
 * @returns {number}
 */
export function getRandomIntInclusive(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') throw new Error('请传入 number 类型参数')
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值 
}


/**
 * @description 生成一个全随机整数的数组, 数组项可重复
 * @param {number} length 数组的长度
 * @param {object} @field min 小值, 可传入小数 @field 大值, 同上 @field isUnique 是否去重
 * @returns {array}
 */
export function generateIntArr(length, { min, max, isUnique = false }) {
  let arr = []

  if (isUnique) {
    let minNum = Math.ceil(min)
      , maxNum = Math.floor(max)
    if (length > maxNum - minNum + 1) throw new Error('去重模式下, 数组长度过大, 请重新传参!')
    while (arr.length < length) {
      let ramdom = getRandomIntInclusive(min, max)
      !arr.includes(ramdom) && arr.push(ramdom)
    }
    return arr
  } else {
    for (let i = 0; i < length; i++) {
      arr.push(getRandomIntInclusive(min, max))
    }
    return arr
  }
}


/**
 * @description 比较目标数组里是否包含另一个数组里的所有元素, 元素都是基本数据类型
 * @param {array} goalArr 
 * @param {array} arr 
 * @returns {boolean}
 */
export function isContainAllArrItem(goalArr, arr) {
  let set = new Set(arr)
    , isContain = goalArr.every(val => set.has(val))
  return isContain
}


/**
 * @description 去掉字符串中的所有空格
 * @param {string} str #need
 * @returns {string}
 */
export function removeAllSpace(str) {
  if (typeof str !== 'string') throw new Error('请传入 string 类型参数')
  return str.replace(/\s*/g, "")
}


/**
 * @description 阶乘
 * @param {number} num
 * @returns {number}
 */
export function factorial(num) {
  if (typeof num !== 'number') throw new Error('请传入 number 类型参数')
  if (Number.isNaN(num) || num < 0) throw new Error('请传入正确数字')
  let result = 1;
  while (num) {
    result *= num;
    num--;
  }
  return result;
}