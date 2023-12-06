var foo = {
  n: 0,
  k: {
    n: 0
  }
}
var bar = foo.k
bar.n++
bar = {
  n: 10
}
bar = foo
bar.n++
bar = foo.n
bar++
console.log(foo.n, foo.k.n)


/* 文本法
foo: addr1
bar: 2

形参
局部

addr1 {
  n: 1,
  k: addr2
}

addr2 {
  n: 1
}

*/