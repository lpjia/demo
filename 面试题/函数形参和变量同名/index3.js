function fn(a, b) {
  console.log(a, b);
  var b = 'zhang'
  function a() { }
  console.log(a, b);
}
fn('hello', 'chen');




/* function fn(a, b) {
  // 预处理阶段
  var b
  var a = 'hello'
  var b = 'chen'
  function a() { }
  // 执行阶段
  console.log(a, b);
  b = 'zhang'
  console.log(a, b);
}
fn('hello', 'chen'); */




// // let就不允许重复声明变量
// function fn(a) {
//   // alert(a);
//   let a = 'hi'; // 报错 Uncaught SyntaxError: Identifier 'a' has already been declared
//   alert(a);
// }
// fn('hello');