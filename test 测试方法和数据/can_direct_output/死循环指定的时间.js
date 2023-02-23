// 死循环指定的时间
function delay(duration) {
  var start = Date.now()
  while (Date.now() - start < duration) { }
}

delay(2000)
console.log(1)