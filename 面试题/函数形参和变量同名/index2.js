function a() { }
var a
console.log(typeof a) // 打印'function'
console.log(this) // 浏览器环境, 打印window
/* 说明var变量声明提前比function优先级高, function后面覆盖了变量a */