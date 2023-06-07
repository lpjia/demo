console.log(
  console.log.call.call.call.call.apply((a) => a, [1, 2])
);

/* a.b.c.d.e()

函数x.apply(参数1, [1, 2]), 其实就是执行函数x, 把this指向参数1
参数1.函数x(1, 2)
((a) => a).call(1, 2)
((a) => a)(2) 此行
2
 */

// // 此行相当于这个, 便于理解
// (function (a) {
//   return a
// })(2)