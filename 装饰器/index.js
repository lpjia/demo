/**
 * 需求是统计代码一共调用了多少次 parseInt()
 */
let count = 0

let oldParseInt = parseInt // 保存原方法

window.parseInt = function () {
  count += 1

  // 这里用 apply 是需要正确接收 parseInt 的参数(因为可传多个参)
  return oldParseInt.apply(null, arguments) // 调用原方法
}

let a = parseInt('10', 8);
console.log('a:', a)
let a2 = parseInt('20', 16);
console.log('a2:', a2)
parseInt('30');
parseInt('40');
parseInt('50');
parseInt('60');
console.log('count = ' + count);