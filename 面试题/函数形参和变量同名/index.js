var foo = { n: 1 };

(function (foo) {
  console.log(foo.n, 111);
  foo.n = 3;
  var foo = { n: 2 };
  console.log(foo.n, 222);
})(foo);

console.log(foo.n, 333);


/*
var foo = { n: 1 };

(function (foo) {
  // 预处理阶段
  var foo // var变量声明提前
  var foo = { n: 1 }; // 形参也是变量, 形参赋值
  // 执行阶段
  console.log(foo.n); // 打印1
  foo.n = 3;
  foo = { n: 2 };
  console.log(foo.n); // 打印2
})(foo);

console.log(foo.n); // 打印3
*/



/* 
栈内存
局部foo: addr2
全局foo: addr1


堆内存
addr1	{n: 3}
addr2	{n: 2}
*/