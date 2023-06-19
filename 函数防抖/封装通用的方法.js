/* 
防抖应用的三个条件:
1.频繁调用某个函数;
2.造成效率问题;
3.需要的结果以最后一次调用为准
*/

/* 类比电梯关门, 每次进来之前把关门的动作取消掉 */

// 先解决通用性, 再解决this指向, 最后解决参数

function myDebounce(func, duration = 500) {
  let timer = null;
  return function (...args) { // 剩余参数, 组成数组 args, 类型是any[]
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
      // func(args)
      // func()
    }, duration);
  }
}

function fn(e) { // e在window.onresize中是resize事件对象, 参数被正确传递
  console.log('执行myDebounce')
  console.log('e:', e)
}

const d = myDebounce(fn, 1000)

window.onresize = d;


// 怎么理解 "再解决this指向, 最后解决参数"
// 最后面有解释
let isToggle = false;

// btn.addEventListener('click', function (e) {
//   console.log('e:', e) // e是点击事件对象
//   console.log('this:', this) // this是btn这个dom对象
//   this.style.color = isToggle ? 'deepskyblue' : 'red'
//   isToggle = !isToggle
// })

// btn.onclick = function (e) {
//   console.log('e:', e)
//   console.log('this:', this)
//   this.style.color = isToggle ? 'deepskyblue' : 'red'
//   isToggle = !isToggle
// }

function callback(e) {
  console.log('e:', e)
  console.log('this:', this)
  this.style.color = isToggle ? 'deepskyblue' : 'red'
  isToggle = !isToggle
}
// btn.addEventListener('click', callback)
// btn.onclick = callback


// btn.addEventListener('click', myDebounce(function (e) {
//   console.log('e:', e)
//   console.log('this:', this)
//   this.style.color = isToggle ? 'deepskyblue' : 'red'
//   isToggle = !isToggle
// }, 1000))

// btn.onclick = myDebounce(callback, 1000)

btn.addEventListener('click', myDebounce(callback, 1000))
/* 当没有用func.apply(this, args), callback函数内的作用域的this指向window, 是"直接调用"情况
使用了apply方法, 把func函数(也就是callback函数)的this显式绑定到①的作用域的this
myDebounce(callback, 1000)中的this应指向btn, 也就是myDebounce()返回的函数, ①的作用域
callback函数内的作用域的this就指向btn
这就解决了this指向
参数问题也就解释了 */
/*
function myDebounce(func, duration = 500) {
  let timer = null;
  return function (...args) { // ①
    clearTimeout(timer)
    timer = setTimeout(() => { // ② 箭头函数不改变this指向, this依然指向①的作用域
      // func.apply(this, args)
      // func(args)
      func()
    }, duration);
  }
}
*/