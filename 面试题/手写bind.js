Function.prototype.myBind = function (context) {
  var fn = this
  return function () {
    fn.apply(context, arguments)
  }
}


function fn(a, b) {
  console.log(this, a, b)
}
// var newFn = fn.bind({})
// newFn(2, 3)
var newFn = fn.myBind({}) // bind方法只有一个形参
newFn(2, 3)