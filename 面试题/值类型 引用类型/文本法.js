var foo = {
  n: 1
}

var arr = [foo]

function method1(arr) {
  var bar = arr[0]
  arr.push(bar)
  bar.n++
  arr = [bar]
  arr.push(bar)
  arr[1].n++
}
function method2(foo) {
  foo.n++
}
function method3(n) {
  n++
}


method1(arr)
method2(foo)
method3(foo.n)


console.log(foo.n, arr.length)


/* 文本法
foo: addr1
arr: addr2

形参
局部

addr1 {
  n: 4
}

addr2 {
  0: addr1,
  1: addr1
}

*/