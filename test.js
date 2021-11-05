
var ClassFn = (function () {
  function ClassFn(params) {
    this.name = params
  }
  Object.defineProperty(ClassFn.prototype, 'name', {
    get() {
      return 'jack'
    },
    set(val) {
      console.log('setter: ', val)
    },
    enumerable: false,
    configurable: true
  })
  return ClassFn
}())
var cla = new ClassFn('xm')




let arr = ['10', '11', '11', '13']
const reverseMapping = o => Object.keys(o).reduce((r, k) =>
  Object.assign(r, { [o[k]]: (r[o[k]] || []).concat(k) }), {})
reverseMapping(arr)











let obj = { name: "海绵宝宝", age: "16", gender: "男" };

var result = {};
for (let key in obj) { // key 属性名
  let value = obj[key]; // value 属性值
  [value, key] = [key, value]; // 交换属性名和属性值
  result[key] = value; // 设置结果
}
//调换后：
result = { 海绵宝宝: "name", 16: "age", 男: "gender" }



function swapObjKV(obj) {
  let resultObj = {}
  for (let key in obj) {
    let val = obj[key];
    [val, key] = [key, val]; // 交换属性名和属性值
    resultObj[key] = val;
  }
  return resultObj
}
let obj = { name: "海绵宝宝", age: "16", gender: "男" }
swapObjKV(obj)







// cmn-Hans-CN
let a = -123456789
// a.toLocaleString()
a.toLocaleString('cmn-Hans-CN')



a.toLocaleString('zh-Hans-CN-u-nu-hanidec', { style: 'currency', currency: 'CNY' })





function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值 
}
let count = 5,
  arr = []
while (arr.length < count) {
  let x = getRandomIntInclusive(1, 35)
  arr.indexOf(x) === -1 && arr.push(x)
}
arr.sort((a, b) => a - b)
for (let item of arr) {
  if ($('#div1').html() == '') {
    $('#div1').html(x)
  } else {
    $('#div1').html($('#div1').html() + '<br>' + x)
  }
}









function test() {
  let reg = '^[\u4e00-\u9fa5]{0,}$'
  reg.search()
}








function factorial(num) {
  if (typeof num !== 'number') throw new Error('请传入 number 类型参数')
  if (Number.isNaN(num) || num < 0) throw new Error('请传入正确数字')
  let result = 1;
  while (num) {
    result *= num;
    num--;
  }
  return result;
}
factorial(0)




var v_0 = 0;
var v_1 = 1;
var v_2 = 2;

for (var right = 0; right < 2; right++) {
  console.log(eval("v_" + right));
}


let abc = 123
function _get(_var) {
  let _script = 'var ret=' + _var;
  eval(_script);
  return ret;
}
_get('abc')



function judgeNotEmpty(param) {
  let judgeObj = p => {
    if (p === null) return !!p // 是 null
    else if (Array.isArray(p)) return !!(p.length) // 是数组
    else return !(JSON.stringify(p) === '{}') // 是对象
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




function removeDuplicates(arr) {
  if (!judgeNotEmpty(arr)) return 0
  let left = 0
  let leng = arr.length
  for (let right = 1; right < leng; right++) {
    /**
     * 如果左指针和右指针指向的值一样，说明有重复的，
     * 这个时候，左指针不动，右指针继续往右移。
     * 如果他俩指向的值不一样就把右指针指向的值往前挪
     */
    if (arr[left] !== arr[right]) arr[++left] = arr[right]
  }
  return ++left
}

let arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
let leng = removeDuplicates(arr)
console.log('leng: ', leng)
console.log(arr.slice(0, leng))









function getTimeObj(t_ = new Date(), pad_0) {
  let arr = /(\d{4,}).(\d+).(\d+) (\d+).(\d+).(\d+)/g.exec(t_.toLocaleString('chinese', { hour12: false }));
  let now_ = t_.getTime()
  if (pad_0) arr = arr.map(x => x.padStart(2, '0'))
  let [all, n, y, r, s, f, m] = arr
  return { all, n, y, r, s, f, m, now_ }
}
getTimeObj("2021/10/20 10:25:21")