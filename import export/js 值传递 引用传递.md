
### js中的"值传递"和"引用传递"

值传递
引用传递(符号绑定)



改动b
给b重新赋值

var a = {}
var b = a
b.n = 0 // 不叫改动b
b = {} // 这才叫改动b

a、b其实是两个地址, 栈内存
真正的数据存在堆内存中