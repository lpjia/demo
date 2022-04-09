let xiaoming = {
  name: '小明',
  age: 14,
  gender: true,
  height: 1.65,
  grade: null,
  'middle-school': '\"W3C\" Middle School',
  skills: ['JavaScript', 'Java', 'Python', 'Lisp']
}

/**
 * 第一个参是要处理的对象
 * 第二个参可以是筛选过滤, 也可以是方法
 * 第三个参, 数字和字符串空格的效果是一样的
 * 非空格的话, 会显示字符串内容
 */
let str = JSON.stringify(xiaoming, null, 2)
let str2 = JSON.stringify(xiaoming, null, '  ')
let str3 = JSON.stringify(xiaoming, ['name', 'skills'], 2)
let str4 = JSON.stringify(xiaoming, ['name', 'skills'], 'abc')

// 字符串值变为大写
function convert(key, value) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
}
let str5 = JSON.stringify(xiaoming, convert, 2)

document.querySelector('#zero').innerHTML = str

let dom = document.querySelector('#one')
dom.style = "white-space: pre-wrap;"
dom.innerHTML = str

let dom2 = document.querySelector('#two')
// 可改变样式
// dom2.style = "color: red;font-size: 30px;"
dom2.innerHTML = str2


document.querySelector('#three').innerHTML = str3

document.querySelector('#four').innerHTML = str4

document.querySelector('#five').innerHTML = str5



let xm = {
  name: '小明2',
  age: 142,
  gender: true,
  height: 1.65,
  grade: null,
  'middle-school': '\"W3C\" Middle School',
  skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
  // 这种应该很少用
  toJSON() {
    return {
      namee: this.name,
      agee: this.age
    }
  }
}

let str6 = JSON.stringify(xm, null, 2)

document.querySelector('#six').innerHTML = str6


/**
 * 反序列化是最多两个参
 * 和序列化用法基本一致
 */
let obj = JSON.parse('{"name":"小明","age":14}', function (key, value) {
  if (key === 'name') {
    return value + '同学';
  }
  return value;
});
console.log(obj)